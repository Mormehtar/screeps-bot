const StartingRoom = require('./StartingRoom');

const ROOM_STATES = require('../../utils/constants').ROOM_STATES;

module.exports = function factory(room) {
  switch (room.memory.state) {
    case ROOM_STATES.STARTING: return StartingRoom(room);
    default: throw new Error(`State ${room.state} is not supported by room controllers.`);
  }
};
