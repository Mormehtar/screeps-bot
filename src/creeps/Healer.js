const BaseCreep = require('./BaseCreep');

class Healer extends BaseCreep {
  constructor() {
    super(BODYPART_COST[HEAL] + BODYPART_COST[MOVE]);
  }
  _buildBody(maxPrice) {
    const crates = Math.floor(maxPrice / this.getMinPrice());
    return {
      price: crates * this.getMinPrice(),
      body: [].concat(..._.fill(new Array(crates), MOVE), ..._.fill(new Array(crates), HEAL))
    };
  }
}

module.exports = new Healer();
