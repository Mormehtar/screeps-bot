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
