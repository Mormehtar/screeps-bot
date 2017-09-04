const BaseCreep = require('./BaseCreep');

class Worker extends BaseCreep {
  constructor() {
    super(BODYPART_COST[CARRY] + BODYPART_COST[WORK] + BODYPART_COST[MOVE]);
  }
  _buildBody(maxPrice) {
    const cache = {
      body: [],
      price: 0
    };
    const base = [CARRY, WORK, MOVE];
    let leftEnergy = maxPrice;
    let i = 0;
    while (leftEnergy >= BODYPART_COST[base[i]]) {
      const bodyPart = base[i];
      cache.body.push(bodyPart);
      leftEnergy -= BODYPART_COST[bodyPart];
      i = (i + 1) % base.length;
    }
    cache.body = _.sortBy(cache.body, bodyPart => Worker.BodyPartsPriorities[bodyPart]);
    cache.price = maxPrice - leftEnergy;
    cache.workPower = cache.body.filter(part => part === WORK);
    return cache;
  }
  getWorkPower(maxPrice) {
    return this._getParam('workPower', maxPrice) || 0;
  }
}

Worker.BodyPartsPriorities = {};
Worker.BodyPartsPriorities[CARRY] = 1;
Worker.BodyPartsPriorities[WORK] = 2;
Worker.BodyPartsPriorities[MOVE] = 3;

module.exports = new Worker();
