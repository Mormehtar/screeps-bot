class BaseUnit {
  constructor(body, price, memory) {
    this.body = body;
    this.price = price;
    this.memory = memory;
  }
  static getUnit({ maxPrice, power }) { throw new Error('Base unit is abstract.'); }
}

module.exports = BaseUnit;