const BaseCreep = require('./BaseCreep');

class Archer extends BaseCreep {
  constructor() {
    super(BODYPART_COST[RANGED_ATTACK] + BODYPART_COST[MOVE]);
  }
  _buildBody(maxPrice) {
    const crates = Math.floor(maxPrice / this.getMinPrice());
    return {
      price: crates * this.getMinPrice(),
      body: [].concat(..._.fill(new Array(crates), MOVE), ..._.fill(new Array(crates), RANGED_ATTACK))
    };
  }
}

module.exports = new Archer();
