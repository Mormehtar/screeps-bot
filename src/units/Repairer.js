const BalancedWorker = require('./BalancedWorker');
const CREEP_ROLES = require('../utils/constants').CREEP_ROLES;

class Repairer extends BalancedWorker {
  static getUnit({ maxPrice, power, capacity }) {
    const data = Repairer.prepareData(maxPrice, power, capacity);
    return data ? new Repairer(data.body, data.price, { role: CREEP_ROLES.REPAIRER }) : null;
  }
}

module.exports = Repairer;
