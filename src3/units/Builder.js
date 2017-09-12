const BalancedWorker = require('./BalancedWorker');
const CREEP_ROLES = require('../utils/constants').CREEP_ROLES;

class Builder extends BalancedWorker {
  static getUnit({ maxPrice, power, capacity }) {
    const data = Builder.prepareData(maxPrice, power, capacity);
    return data ? new Builder(data.body, data.price, { role: CREEP_ROLES.BUILDER }) : null;
  }
}

module.exports = Builder;
