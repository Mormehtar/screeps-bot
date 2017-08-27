const controllerFactory = require('../creepControllers/factory');

Object.defineProperty(Creep.prototype, 'isFull', {
    get: function() {
        if (!this._isFull) {
            this._isFull = _.sum(this.carry) === this.carryCapacity;
        }
        return this._isFull;
    },
    enumerable: false
});

Object.defineProperty(Creep.prototype, 'state', {
    get: function() {
        return this.memory.state;
    },
    set: function(state) {
        console.log(`${this.name} goes for ${state}.`);
        this.memory.state = state;
    },
    enumerable: false
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
  enumerable: false
});

Creep.prototype.getController = function() {
  return controllerFactory.getInstance(this);
};

Creep.prototype.chooseSource = function () {
  return _.sortBy(this.room.getSources().filter(source => source.freeSpaceCount - source.creeps > 0), [
    source => - source.energy / source.ticksToRegeneration
  ])[0];
};
