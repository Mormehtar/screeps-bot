const BaseController = require('./BaseController');
const CREEP_ROLES = require('../../utils/constants').CREEP_ROLES;

class StartingRoom extends BaseController {
  getCreepsToBuild() {
    const target = this.getPopulationTarget();
    const population = this.getPopulationCounts();
    return target.filter(role => {
      if (population[role]) {
        --population[role];
        return false;
      }
      return true;
    });
  }

  getPopulationTarget() {
    const sourceCount = this.room.getSources();
    const module = [
      ..._.fill(new Array(3), CREEP_ROLES.MINER),
      CREEP_ROLES.BUILDER
    ];
    const target = [].concat(..._.fill(new Array(sourceCount), module));
    if (this.room.damagedStructuresCount) {
      target.unshift(CREEP_ROLES.REPAIRER);
    } else {
      target.push(CREEP_ROLES.REPAIRER);
    }

    return target;
  }
}

module.exports = StartingRoom;
