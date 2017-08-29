const ROOM_STATES = require('../constants').ROOM_STATES;
const BaseControllerFactory = require('../baseFactory');

const roomFactory = new BaseControllerFactory('Room');

roomFactory.registerDefaultRole(ROOM_STATES.INITIAL_DEVELOP);
roomFactory.register(ROOM_STATES.INITIAL_DEVELOP, require('./InitialDevelopController'));
roomFactory.register(ROOM_STATES.UPGRADE_TO_2, require('./FirstUpgradeController'));
roomFactory.register(ROOM_STATES.ALERT, require('./AlertController'));

module.exports = roomFactory;
