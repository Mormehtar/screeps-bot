Game.getCreepsByRoom = function (roomName) {
  if (!this._creepsByRoom) {
    this._creepsByRoom = {};
    Object.keys(this.creeps).forEach(creep => {
      if (!this._creepsByRoom[creep.room.name]) {
        this._creepsByRoom[creep.room.name] = [];
      }
      this._creepsByRoom[creep.room.name].push(creep);
    });
  }
  return this._creepsByRoom[roomName];
};