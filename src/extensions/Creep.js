const controllerFactory = require('../creepControllers/factory');

Creep.prototype._constructor = Creep.prototype._constructor || Creep.prototype.constructor;

Creep.prototype.constructor = function (args) {
  Creep.prototype._constructor.apply(this, args);
  Creep.prototype.hooks.forEach(hook => hook.apply(this));
};

Object.defineProperty(Creep.prototype, 'isFull', {
  get: function() {
      if (!this._isFull) {
          this._isFull = _.sum(this.carry) === this.carryCapacity;
      }
      return this._isFull;
  },
  enumerable: false,
  configurable: true
});

Object.defineProperty(Creep.prototype, 'state', {
  get: function() {
      return this.memory.state;
  },
  set: function(state) {
    console.log(`${this.name} goes for ${state}.`);
    this.memory.state = state;
  },
  enumerable: false,
  configurable: true
});

Object.defineProperty(Creep.prototype, 'target', {
  get: function () {
    if (!this._target) {
      if (!this.memory.targetId) {
        return null;
      }
      this._target = Game.getObjectById(this.memory.targetId);
    }
    return this._target;
  },
  set: function (target) {
    if(!target) {
      this._target = null;
      this.memory.targetId = undefined;
    } else {
      this._target = target;
      this.memory.targetId = target.id;
    }
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

Creep.prototype.getCreepController = function() {
  return controllerFactory.getInstance(this);
};

Creep.prototype.checkAttacked = function () {
  this._lastHits = this.memory.lastHits || this.hitsMax;
  this.memory.lastHits = this.hits;
};

Object.defineProperty(Creep.prototype, 'attacked', {
  get: function() {
    return this._lastHits > this.hits;
  },
  enumerable: false,
  configurable: true
});

Creep.prototype.hooks = [
  Creep.prototype.checkAttacked
];
