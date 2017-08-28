const BaseController = require('./BaseController');
const constants = require('../constants');

const WorkerBodyPArtsPriorities = {};
WorkerBodyPArtsPriorities[CARRY] = 1;
WorkerBodyPArtsPriorities[WORK] = 2;
WorkerBodyPArtsPriorities[MOVE] = 3;

class InitialDevelopController extends BaseController {
  getWorkerBody() {
    if (!this._workerBody) {
      const body = [];
      const base = [CARRY, WORK, MOVE];
      let leftEnergy = this.room.energyCapacityAvailable;
      let i = 0;
      while (leftEnergy >= BODYPART_COST[base[i]]) {
        const bodyPart = base[i];
        body.push(bodyPart);
        leftEnergy -= BODYPART_COST[bodyPart];
        i = (i + 1) % base.length;
      }
      this._workerBody = _.sortBy(body, bodyPart => WorkerBodyPArtsPriorities[bodyPart]);
      this._workerBody.price = this.room.energyCapacityAvailable - leftEnergy;
    }
    return this._workerBody;
  }
  getWorkerRole() {
    const workerBody = this.getWorkerBody();
    return {
      body: workerBody,
      name: constants.CREEP_ROLES.WORKER,
      price: workerBody.price
    };
  }
  getNextRole(population, freeEnergy, building) {
    const workerRole = this.getWorkerRole();
    if (workerRole.price > freeEnergy) { return null; }
    const workers = (population[workerRole.name] || 0) + (building[workerRole.name] || 0);
    const totalFree = this.room.getSources().reduce((acc, source) => acc + source.freeSpaceCount, 0);
    if (workers >= InitialDevelopController.BUILD_COEFFICIENT * totalFree) {
      this.room.memory.role = constants.ROOM_STATES.UPGRADE_TO_2;
      return null;
    }
    return workerRole;
  }
}

InitialDevelopController.BUILD_COEFFICIENT = 1;

module.exports = InitialDevelopController;