function loop() {
  Object.keys(Game.rooms).forEach(roomName => Game.rooms[roomName].controller.run());
}

module.exports = loop;