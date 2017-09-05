const BaseUnit = require('./BaseUnit');
const CREEP_ROLES = require('../utils/constants').CREEP_ROLES;

class Miner extends BaseUnit {
  static getUnit({ maxPrice, power, transport }) {
    if (maxPrice < Miner.minPrice) { return null; }
    return transport ?
      Miner.buildMinerTransport(maxPrice, power) :
      Miner.buildSpecializedMiner(maxPrice, power);
  }

  static buildMinerTransport(maxPrice, power) {
    const modules = Math.min(
      Math.floor(maxPrice / Miner.minPrice),
      (power || Infinity) / HARVEST_POWER,
      Math.floor(MAX_CREEP_SIZE / Miner.baseBody.length)
    );
    const body = [].concat(
      ..._.fill(new Array(modules + 1), CARRY),
      ..._.fill(new Array(modules + 1), WORK),
      ..._.fill(new Array(modules + 1), MOVE)
    );
    return new Miner(body, modules * Miner.minPrice, { role: CREEP_ROLES.MINER });
  }

  static buildSpecializedMiner(maxPrice, power) {
    const leftEnergy = maxPrice - Miner.minPrice;
    const parts = Math.min(
      Math.floor(leftEnergy / BODYPART_COST[WORK]),
      ((power || Infinity) - 1) / HARVEST_POWER,
      MAX_CREEP_SIZE - Miner.baseBody.length
    );
    const body = [].concat(..._.fill(new Array(parts + 1), WORK), CARRY, MOVE);
    const price = Miner.minPrice + parts * BODYPART_COST[WORK];
    return new Miner(body, price, { role: CREEP_ROLES.MINER });
  }
}

Miner.baseBody = [CARRY, WORK, MOVE];
Miner.minPrice = Miner.baseBody.reduce((acc, part) => acc + BODYPART_COST[part], 0);

module.exports = Miner;