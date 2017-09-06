const ROOM_STATES = require('../utils/constants').ROOM_STATES;
const controllerFactory = require('../controllers/rooms');

Room.prototype.getSources = function () {
  if (!this._sources) {
    const sourceIds = this.memory.sourceIds;
    if (sourceIds) {
      this._sources = sourceIds.map(id => Game.getObjectById(id));
    } else {
      this._sources = this.find(FIND_SOURCES);
      this.memory.sourceIds = this._sources.map(source => source.id);
    }
  }
  return this._sources;
};

Object.defineProperty(Room.prototype, 'creeps', {
  get: function () {
    if (!Game._creepsByRoom) {
      Game._creepsByRoom = {};
      Object.keys(Game.creeps).forEach(creepName => {
        const creep = Game.creeps[creepName];
        if (!Game._creepsByRoom[creep.room.name]) {
          Game._creepsByRoom[creep.room.name] = [];
        }
        Game._creepsByRoom[creep.room.name].push(creep);
      });
    }
    return Game._creepsByRoom[this.name];
  },
  enumerable: false,
  configurable: true
});

Object.defineProperty(Room.prototype, 'spawns', {
  get: function () {
    if (!Game._spawnsByRoom) {
      Game._spawnsByRoom = {};
      Object.keys(Game.spawns).forEach(spawnName => {
        const spawn = Game.spawns[spawnName];
        if (!Game._spawnsByRoom[spawn.room.name]) {
          Game._spawnsByRoom[spawn.room.name] = [];
        }
        Game._spawnsByRoom[spawn.room.name].push(spawn);
      });
    }
    return Game._spawnsByRoom[this.name];
  },
  enumerable: false,
  configurable: true
});

Object.defineProperty(Room.prototype, 'state', {
  get: function () {
    return this.memory.state || ROOM_STATES.STARTING
  },
  set: function (value) {
    this.memory.state = value;
  },
  enumerable: false,
  configurable: true
});

Object.defineProperty(Room.prototype, 'structures', {
  get: function () {
    if(!Game._structuresByRoom) {
      Game._structuresByRoom = {};
      Object.keys(Game.structures).forEach(structureId => {
        const structure = Game.structures[structureId];
        const roomName = structure.room.name;
        const type = structure.type;
        let roomStructures = Game._structuresByRoom[roomName];
        if(!roomStructures) {
          roomStructures = Game._structuresByRoom[roomName] = {};
        }
        if(!roomStructures[type]) {
          roomStructures[type] = [];
        }
        roomStructures[type].push(structure);
      });
    }
    return Game._structuresByRoom[this.name];
  },
  enumerable: false,
  configurable: true
});

Object.defineProperty(Room.prototype, 'damagedStructuresCount', {
  get: function () {
    if (this._damagedStructures === undefined) {
      this._damagedStructures = Object.keys(this.structures)
        .reduce(
          (acc, key) => acc + this.structures[key]
            .reduce((acc, structure) => (structure.hitsMax > structure.hits ? acc + 1 : acc), 0),
          0
        );
    }
    return this._damagedStructures;
  },
  enumerable: false,
  configurable: true
});

Object.defineProperty(Room.prototype, 'constructionSites', {
  get: function () {
    if(!Game._constructionSites) {
      Game._constructionSites = {};
      Object.keys(Game.structures).forEach(structureId => {
        const constructionSite = Game.constructionSites[structureId];
        const roomName = constructionSite.room.name;
        const type = constructionSite.structureType;
        let roomStructures = Game._constructionSites[roomName];
        if(!roomStructures) {
          roomStructures = Game._constructionSites[roomName] = {};
        }
        if(!roomStructures[type]) {
          roomStructures[type] = [];
        }
        roomStructures[type].push(constructionSite);
      });
    }
    return Game._constructionSites[this.name];
  },
  enumerable: false,
  configurable: true
});

Room.prototype.registerStorageAsStorage = function(obj, amount, priority) {
  this._storageRequests = this._storageRequests || {};
  this._storageRequests[priority] = this._storageRequests[priority] || [];
  this._storageRequests[priority].push({ obj, amount });
};

Room.prototype.registerStorageAsSource = function(obj, amount, priority) {
  this._storageSources = this._storageSources || {};
  this._storageSources[priority] = this._storageSources[priority] || [];
  this._storageSources[priority].push({ obj, amount });
};

Room.prototype.requestEnergy = function (obj, amount, priority) {
  this._energyRequests = this._energyRequests || {};
  this._energyRequests[priority] = this._energyRequests[priority] || [];
  this._energyRequests[priority].push({ obj, amount });
};

Room.prototype.requestWork = function (obj, amount, priority) {
  this._workRequests = this._workRequests || {};
  this._workRequests[priority] = this._workRequests[priority] || [];
  this._workRequests[priority].push({ obj, amount });
};

Room.prototype.requestRepair = function (obj, amount, priority) {
  this._repairRequests = this._repairRequests || {};
  this._repairRequests[priority] = this._repairRequests[priority] || [];
  this._repairRequests[priority].push({ obj, amount });
};

// TODO Mind about circle links here.
Object.defineProperty(Room.prototype, 'controllerObject', {
  get() {
    if (!this._controllerObject) {
      this._controllerObject = controllerFactory(this);
    }
    return this._controllerObject;
  },
  enumerable: false,
  configurable: true
});
