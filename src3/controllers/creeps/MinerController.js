const BaseController = require('./BaseController');
const CREEP_STATES = require('../../utils/constants').CREEP_STATES;

class MinerController extends BaseController {
  goHarvest() {
    if(!this.creep.target) {
      this.creep.target = this.creep.chooseSource();
      if (!this.creep.target) { return; }
    }
    if(this.creep.pos.isNearTo(this.creep.target)) {
      this.creep.state = CREEP_STATES.HARVEST;
      return this.run();
    }
    this.moveTo(this.creep.target);
  }
  harvest() {
    if(this.creep.carry[RESOURCE_ENERGY] === this.creep.carryCapacity) {
      this.creep.target = null;
      this.creep.state = this.chooseTarget();
      return true;
    }
    this.creep.goHarvest(this.creep.target);
    return false;
  }
  run() {
    if (!this.creep.state) { this.creep.state = CREEP_STATES.GO_HARVEST; }
    switch (this.creep.state) {
      case CREEP_STATES.GO_HARVEST: return this.goHarvest();
      case CREEP_STATES.HARVEST: return this.harvest()
    }
  }
}

module.exports = MinerController;
