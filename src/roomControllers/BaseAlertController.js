const BaseController = require('./BaseController');
const Brute = require('../creeps/Brute');
const Archer = require('../creeps/Archer');
const Healer = require('../creeps/Healer');

const CREEP_ROLES = require('../constants').CREEP_ROLES;

class BaseAlertController extends BaseController {
  getBruteRole() {
    return Brute.getRole(this.room.energyCapacityAvailable, CREEP_ROLES.BRUTE);
  }
  getArcherRole() {
    return Archer.getRole(this.room.energyCapacityAvailable, CREEP_ROLES.ARCHER);
  }
  getHealerRole() {
    return Healer.getRole(this.room.energyCapacityAvailable, CREEP_ROLES.HEALER);
  }
  turnOffAlert() {
    this.room.memory.role = this.room.memory.lastRole;
    this.room.memory.lastRole = undefined;
  }
  run() {
    if(!this.checkAlert()) {
      this.turnOffAlert();
      return this.room.getRoomController().run();
    }
    return super.run();
  }
}

module.exports = BaseAlertController;