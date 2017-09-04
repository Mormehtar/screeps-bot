const InitialDevelopController = require('./InitialDevelopController');
const constants = require('../constants');
const CREEP_ROLES = constants.CREEP_ROLES;
const Worker = require('../creeps/Worker');

class FirstUpgradeController extends InitialDevelopController {
  getUpgraderRole() {
    return Worker.getRole(this.room.energyCapacityAvailable, CREEP_ROLES.UPGRADER);
  }
  getNextRole(population, freeEnergy, building) {
    const workers = (population[CREEP_ROLES.WORKER] || 0) + (building[CREEP_ROLES.WORKER] || 0);
    const upgraders = (population[CREEP_ROLES.UPGRADER] || 0) + (building[CREEP_ROLES.UPGRADER] || 0);
    if (workers !== upgraders) {
      return  workers > upgraders ? this.getWorkerRole() : this.getUpgraderRole();
    }
    const totalFree = this.room.getSources().reduce((acc, source) => acc + source.freeSpaceCount, 0);
    if (workers >= InitialDevelopController.BUILD_COEFFICIENT * totalFree) {
      return null;
    }
    return this.getWorkerRole();
  }
}

module.exports = FirstUpgradeController;