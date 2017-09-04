class BaseCreep {
  constructor(minPrice) {
    this.cache = {};
    this._minPrice = minPrice;
  }
  _getParam(param, maxPrice) {
    if (maxPrice < this._minPrice) { return null; }
    if (!this.cache[maxPrice]) {
      this.cache[maxPrice] = this._buildBody(maxPrice);
    }
    return this.cache[maxPrice][param];
  }
  getBody(maxPrice) {
    return this._getParam('body', maxPrice);
  }
  getPrice(maxPrice) {
    return this._getParam('price', maxPrice) || 0;
  }
  _buildBody(maxPrice) { throw new Error('Not implemented yet!'); }
  getMinPrice() { return this._minPrice; }
  getRole(maxPrice, role) {
    if (maxPrice < this.getMinPrice()) { return null; }
    return {
      body: this.getBody(maxPrice),
      role: role,
      price: this.getPrice(maxPrice)
    };
  }
}

module.exports = BaseCreep;
