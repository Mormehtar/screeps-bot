const BaseController = require('../BaseController');
const CONSTANTS = require('../../../utils/constants');

class SpawnsController extends BaseController {
  constructor(room) {
    super(room);
    this.spawns = room.spawns;
  }
  orderConstruction() {
    return;
  }
  requestEnergy() {
    this.spawns.forEach(spawn => {
      const toFill = spawn.energyCapacity - spawn.energy;
      if(spawn.energy < spawn.energyCapacity) {
        let priority = CONSTANTS.PRIORITIES.COMMON;
        const creepsToBuild = this.room.controller.getCreepsToBuild();
        if (creepsToBuild.length) {
          const creepsPrice = creepsToBuild.reduce((acc, creepData) => acc + creepData.price, 0);
          if (creepsPrice > spawn.energy) {
            priority = CONSTANTS.PRIORITIES.IMPORTANT;
          }
        }
        this.room.requestEnergy(spawn, toFill, priority);
      }
    });
  }
  requestWork() {
    this.room.constructionSites[STRUCTURE_SPAWN](
      site => this.room.requestWork(site, site.progressTotal - site.progress, CONSTANTS.PRIORITIES.COMMON)
    );
  }
  run() {
    this.orderConstruction();
    this.requestEnergy();
  }

}

module.exports = SpawnsController;
