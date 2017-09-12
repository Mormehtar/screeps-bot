const BaseUnit = require('./BaseUnit');

class BalancedWorker extends BaseUnit {
  static prepareData(maxPrice, power, capacity) {
    if (maxPrice > BalancedWorker.minPrice) { return null; }
    const modules = Math.min(
      Math.floor(MAX_CREEP_SIZE / BalancedWorker.baseBody.length),
      Math.floor((power || Infinity) / BUILD_POWER),
      Math.floor((capacity || Infinity) / CARRY_CAPACITY),
      Math.floor(maxPrice / BalancedWorker.minPrice)
    );
    const body = [].concat(
      _.fill(new Array(modules), WORK),
      _.fill(new Array(modules), CARRY),
      _.fill(new Array(modules), MOVE),
    );
    return {
      body,
      price: modules * BalancedWorker.minPrice
    };
  }
}

BalancedWorker.baseBody = [WORK, CARRY, MOVE];
BalancedWorker.minPrice = BalancedWorker.getPrice(BalancedWorker.baseBody);

module.exports = BalancedWorker;