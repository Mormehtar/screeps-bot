const BaseController = require('./BaseController');
const creepControllerFactory = require('../creepControllers/factory');
const WorkerController = require('../creepControllers/WorkerController');

class InitialDevelopController extends BaseController {
  getSourcePower() {
    if (!this._sourcePower) {
      this._sourcePower = this.room.getSources()
        .map(source => source.energyCapacity / ENERGY_REGEN_TIME)
        .reduce((acc, source) => acc + source, 0);
    }
    return this._sourcePower;
  }
  getWorkerRole() {
    if (!this._workerBody) {
      const baseBlock = [MOVE, WORK, CARRY];
      let price = baseBlock.reduce((acc, part) => acc + BODYPART_COST[part], 0);
      let maxPrice = this.room.energyCapacityAvailable;
      const crate = Math.floor(maxPrice / price);
      this._workerBody = [].concat(
        _.fill(new Array(crate), CARRY), _.fill(new Array(crate), WORK), _.fill(new Array(crate), MOVE)
      );
      this._workerPrice = price * crate;
      this._upgradePower = crate;
    }
    return {
      body: this._workerBody,
      name: InitialDevelopController.ROLES.WORKER,
      price: this._workerPrice,
      upgradePower: this._upgradePower
    };
  }
  getNextRole(population, freeEnergy, building) {
    const workerRole = this.getWorkerRole();
    if (workerRole.price > freeEnergy) { return null; }
    const workers = (population[workerRole.name] || 0) + (building[workerRole.name] || 0);
    if (workerRole.upgradePower * workers > this.getSourcePower() * InitialDevelopController.UPGRADE_COEFFICIENT) {
      return null;
    }
    return workerRole;
  }
}

InitialDevelopController.ROLES = {
  WORKER: 'Worker'
};

creepControllerFactory.register(InitialDevelopController.ROLES.WORKER, WorkerController);

InitialDevelopController.UPGRADE_COEFFICIENT = 1.5;

module.exports = InitialDevelopController;