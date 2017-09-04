const BaseController = require('./BaseController');
const CONSTANTS = require('../../utils/constants');

class SpawnsController extends BaseController {
  constructor(room) {
    super(room);
    this.spawns = room.spawns;
    this.type = STRUCTURE_SPAWN;
  }
  requestEnergy() {
    this.spawns.forEach(spawn => {
      const toFill = spawn.energyCapacity - spawn.energy;
      if(spawn.energy < spawn.energyCapacity) {
        let priority = CONSTANTS.PRIORITIES.UNIMPORTANT;
        const creepsToBuild = this.room.controller.getCreepsToBuild();
        if (creepsToBuild.length) {
          const creepsPrice = creepsToBuild.reduce((acc, creepData) => acc + creepData.price, 0);
          if (creepsPrice > spawn.energy) {
            priority = CONSTANTS.PRIORITIES.IMPORTANT;
          }
        }
        this.room.requestEnergy(
          spawn,
          toFill,
          priority
        );
      }
    });
  }
  runSpecificActivity() {
    function filterSpawns (spawns, minPrice) {
      return spawns.filter(spawn => spawn.energy >= minPrice);
    }

    const creepsToBuild = this.room.controller.getCreepsToBuild();
    let extensionsEnergy = this.room.structures[STRUCTURE_EXTENSION].reduce(
      (acc, extension) => acc + extension.energy, 0
    );
    const minPrice = creepsToBuild.reduce(
      (res, creepToBuild) => Math.min(res, creepToBuild.price), Infinity
    );
    const freeSpawns = _.sortBy(
      filterSpawns(this.spawns.filter(spawn => !spawn.spawning), minPrice - extensionsEnergy),
      ['energy']
    );
    for(let i=0; i<creepsToBuild.length && freeSpawns.length; ++i) {
      const creepToBuild = creepsToBuild[i];
      let j = 0;
      while (j < freeSpawns.length) {
        if (freeSpawns[j].energy + extensionsEnergy >= creepsToBuild.price) {
          break;
        }
        ++j;
      }
      if (j >= freeSpawns.length) { continue; }
      const spawn = freeSpawns.splice(j, 1)[0];
      const result = spawn.createCreep(creepToBuild.body, null, creepToBuild.memory);
      if (result !== OK) {
        console.log(`Building creep got error code ${result}`);
        spawn.splice(j, 0, spawn);
        continue;
      }
      if (spawn.energy < creepToBuild.price) {
        extensionsEnergy -= creepToBuild.price - spawn.energy;
        filterSpawns(freeSpawns, minPrice - extensionsEnergy);
      }
    }
  }
}

module.exports = SpawnsController;
