const utils = require('../utils');

utils.addMemory(Source);

Object.defineProperty(Source.prototype, 'creeps', {
  get() { return this.memory._creeps || 0; },
  set(value) { this.memory._creeps = value; },
  enumerable: false,
  configurable: true
});

Object.defineProperty(Source.prototype, 'freeSpaceCount', {
  get: function () {
    if (this._freeSpaceCount === undefined) {
      if (this.memory.freeSpaceCount === undefined) {
        let freeSpaceCount = 0;
        [this.pos.x - 1, this.pos.x, this.pos.x + 1].forEach(x => {
          [this.pos.y - 1, this.pos.y, this.pos.y + 1].forEach(y => {
            if (Game.map.getTerrainAt(x, y, this.pos.roomName) !== 'wall')
              freeSpaceCount++;
          }, this);
        }, this);
        this.memory.freeSpaceCount = freeSpaceCount;
      }
      this._freeSpaceCount = this.memory.freeSpaceCount;
    }
    return this._freeSpaceCount;
  },
  enumerable: false,
  configurable: true
});

Object.defineProperty(Source.prototype, 'creeps', {
  get: function () {
    return this.memory.creeps || 0;
  },
  set: function (value) {
    this.memory.creeps = value;
  },
  enumerable: false,
  configurable: true
});
