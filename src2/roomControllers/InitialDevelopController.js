const DevelopConreoller = require('./DevelopController');
const constants = require('../constants');

class InitialDevelopController extends DevelopConreoller {
  getNextRole(population, freeEnergy, building) {
    const workerRole = this.getWorkerRole();
    const workers = (population[workerRole.name] || 0) + (building[workerRole.name] || 0);
    const totalFree = this.room.getSources().reduce((acc, source) => acc + source.freeSpaceCount, 0);
    if (workers >= InitialDevelopController.BUILD_COEFFICIENT * totalFree) {
      this.room.memory.role = constants.ROOM_STATES.UPGRADE_TO_2;
      return null;
    }
    if (workerRole.price > freeEnergy) { return null; }
    return workerRole;
  }
}

InitialDevelopController.BUILD_COEFFICIENT = 0.5;

module.exports = InitialDevelopController;
