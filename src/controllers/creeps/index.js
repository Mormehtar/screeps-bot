const CREEP_ROLES = require('../../utils/constants').CREEP_ROLES;

module.exports = function factory(creep) {
  switch (creep.role) {
    case CREEP_ROLES.MINER: return require('./MinerController');
    default: throw new Error(`Role ${creep.role} is not supported by creep controllers.`);
  }
};