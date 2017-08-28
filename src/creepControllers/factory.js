const CREEP_ROLES = require('../constants').CREEP_ROLES;
const BaseControllerFactory = require('../baseFactory');

const factory = new BaseControllerFactory('Creep');

factory.register(CREEP_ROLES.WORKER, require('./WorkerController'));
factory.register(CREEP_ROLES.UPGRADER, require('./UpgraderController'));

module.exports = factory;
