const controllerFactory = require('../controllers/creeps');

// TODO Mind about circle links here.
Object.defineProperty(Creep.prototype, 'controller', {
  get() {
    if (!this._controller) {
      this._controller = controllerFactory(this);
    }
    return this._controller;
  },
  enumerable: false,
  configurable: true
});

Object.defineProperty(Creep.prototype, 'role', {
  get: function () {
    return this.memory.role
  },
  set: function (value) {
    this.memory.role = value;
  },
  enumerable: false,
  configurable: true
});

Object.defineProperty(Creep.prototype, 'state', {
  get: function () {
    return this.memory.state
  },
  set: function (value) {
    this.memory.state = value;
  },
  enumerable: false,
  configurable: true
});

Creep.prototype.chooseSource = function () {
  return _.sortBy(
    this.room.getSources().filter(source => source.freeSpaceCount - source.creeps > 0),
    source => {
      return - source.energy / (source.ticksToRegeneration || ENERGY_REGEN_TIME)
    }
  )[0];
};
