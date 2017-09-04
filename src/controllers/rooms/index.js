const CommonRoom = require('./CommonRoom');

const ROOM_STATES = require('../../utils/constants').ROOM_STATES;

module.exports = function factory(room) {
  switch (room.memory.state) {
    case ROOM_STATES.INITIAL: return CommonRoom(room);
    default: throw new Error(`State ${room.state} is not supported by room controllers.`);
  }
};
