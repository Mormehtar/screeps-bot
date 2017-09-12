const CREEP_ROLES = require('../utils/constants').CREEP_ROLES;

module.exports = function(role) {
  switch (role) {
    case CREEP_ROLES.MINER: return require('./Miner');
    case CREEP_ROLES.BUILDER: return require('./Builder');
    case CREEP_ROLES.REPAIRER: return require('./Repairer');
    case CREEP_ROLES.CARRIER: return require('./Carrier');
    default: throw new Error(`Role ${role} is not supported!`);
  }
};
