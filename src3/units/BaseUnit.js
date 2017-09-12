class BaseUnit {
  constructor(body, price, memory) {
    this.body = body;
    this.price = price;
    this.memory = memory;
  }
  static getUnit({ maxPrice, power }) { throw new Error('Base unit is abstract.'); }

  static getPrice(body) {
    return body.reduce((acc, part) => acc + BODYPART_COST[part], 0);
  }
}

module.exports = BaseUnit;