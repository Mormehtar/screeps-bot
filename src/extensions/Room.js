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
    return Game._creepsByRoom(this.name);
  },
  enumerable: false
});

Object.defineProperty(Creep.prototype, 'state', {
  get: function() {
    return this.memory.state || 'InitialDevelop';
  },
  set: function(state) {
    console.log(`${this.name} goes for ${state}.`);
    this.memory.state = state;
  },
  enumerable: false
});
