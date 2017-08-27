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

Object.prototype.getController = function() {
  return controllerFactory(this);
};

Object.defineProperty(Room.prototype, 'creeps', {
  get: function () {
    return Game.getCreepsByRoom(this.name);
  },
  enumerable: false,
  configurable: true
});
Object.defineProperty(Room.prototype, 'spawns', {
  get: function () {
    return Game.getSpawnsByRoom(this.name);
  },
  enumerable: false,
  configurable: true
});

Object.defineProperty(Room.prototype, 'state', {
  get: function() {
    return this.memory.state || 'InitialDevelop';
  },
  set: function(state) {
    console.log(`${this.name} goes for ${state}.`);
    this.memory.state = state;
  },
  enumerable: false,
  configurable: true
});
