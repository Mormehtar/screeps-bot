const BaseCreep = require('./BaseCreep');

class Brute extends BaseCreep {
  constructor() {
    const modules = [
      {
        body: [MOVE, ATTACK],
        price: BODYPART_COST[MOVE] + BODYPART_COST[ATTACK]
      },
      {
        body: [TOUGH, MOVE],
        price: BODYPART_COST[MOVE] + BODYPART_COST[TOUGH]
      }
    ];
    const minPrice = Math.min(...modules.map(module => module.price));
    super(minPrice);
    this._modules = modules;
    this._maxSize = MAX_CREEP_SIZE - Math.min(...modules.map(module => module.body.length));
  }
  _buildBody(maxPrice) {
    const cache = {
      body: [],
      price: 0
    };
    let left = maxPrice;
    let i = 0;
    while (left >= this.getMinPrice() && cache.body.length < this._maxSize) {
      const module = this._modules[i];
      if (module.price > left) { continue; }
      cache.body.push(...module.body);
      left -= module.price;
      i = (i + 1) % this.modules.length;
    }
    cache.body = _.sortBy(cache.body, bodyPart => Brute.BodyPartsPriorities[bodyPart]);
    cache.price = maxPrice - left;
    return cache;
  }
}

Brute.BodyPartsPriorities = {};
Brute.BodyPartsPriorities[TOUGH] = 1;
Brute.BodyPartsPriorities[MOVE] = 2;
Brute.BodyPartsPriorities[ATTACK] = 3;

module.exports = new Brute();
