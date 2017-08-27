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

Game.getSpawnsByRoom = function (roomName) {
  if (!this._spawnsByRoom) {
    this._spawnsByRoom = {};
    Object.keys(this.spawns).forEach(spawn => {
      if (!this._spawnsByRoom[spawn.room.name]) {
        this._spawnsByRoom[spawn.room.name] = [];
      }
      this._spawnsByRoom[spawn.room.name].push(spawn);
    });
  }
  return this._spawnsByRoom[roomName];
};
