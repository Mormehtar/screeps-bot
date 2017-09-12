const BaseUnit = require('./BaseUnit');
const CREEP_ROLES = require('../utils/constants').CREEP_ROLES;

class Carrier extends BaseUnit {
  static getUnit({ maxPrice, power }) {
    const modules = Math.min(
      Math.floor(maxPrice / Carrier.minPrice),
      Math.floor((power || Infinity) / CARRY_CAPACITY),
      Math.floor(MAX_CREEP_SIZE / Carrier.baseBody.length)
    );
    return new Carrier(
      [].concat(
        ..._.fill(new Array(modules), CARRY),
        ..._.fill(new Array(modules), MOVE),
      ),
      modules * Carrier.minPrice,
      { role: CREEP_ROLES.CARRIER }
    );
  }
}

Carrier.baseBody = [CARRY, MOVE];
Carrier.minPrice = Carrier.getPrice(Carrier.baseBody);

module.exports = Carrier;