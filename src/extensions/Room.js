const controllerFactory = require('../roomControllers/factory');

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


Room.prototype.getRoomController = function() {
  return controllerFactory.getInstance(this);
};
