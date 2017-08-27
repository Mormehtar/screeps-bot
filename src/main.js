require('./extensions/Creep');
require('./extensions/Room');
require('./extensions/Game');
require('./extensions/Source');

module.exports.loop = function () {
  Object.keys(Game.rooms).forEach(roomName => Game.rooms[roomName].getController().run());
};