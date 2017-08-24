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
