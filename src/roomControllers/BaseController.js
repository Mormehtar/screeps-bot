const constants = require('../constants');
const Worker = require('../creeps/Worker');

class BaseRoomController {
  constructor(room) {
    this.room = room;
  }
  controlCreeps() {
    (this.room.creeps || []).forEach(creep => creep.getCreepController().run());
  }
  calculatePopulation() {
    if (!this.population) {
      this.population = (this.room.creeps || []).reduce((obj, creep) => {
        obj[creep.memory.role] = (obj[creep.memory.role] || 0) + 1;
        return obj;
      }, {});
    }
    return this.population;
  }
  getWorkerRole() {
    return Worker.getRole(this.room.energyCapacityAvailable, constants.CREEP_ROLES.WORKER);
  }
  getNextRole() { throw new Error('Unimplemented'); }
  buildCreeps() {
    const population = this.calculatePopulation();
    if (this.room.energyAvailable >= BaseRoomController.minimalCreepPrice) {
      const unusedSpawns = this.room.spawns.filter(spawn => !spawn.spawning);
      let freeEnergy = this.room.energyAvailable;
      const building = {};
      while(unusedSpawns.length && freeEnergy >= BaseRoomController.minimalCreepPrice) {
        const role = this.getNextRole(population, freeEnergy, building);
        if (role) {
          const spawn = unusedSpawns.pop();
          spawn.createCreep(role.body, null, Object.assign({ role: role.role }, role.data || {}));
          freeEnergy -= role.price;
          building[role.name] = (building[role.name] || 0) + 1;
        } else {
          break;
        }
      }
    }
  }
  checkAlert() {
    return !!this.room.hostileCreeps.length;
  }
  run() {
    this.controlCreeps();
    this.buildCreeps();
  }
}

BaseRoomController.minimalCreepPrice = BODYPART_COST.move + Math.min(
  BODYPART_COST.work, BODYPART_COST.carry, BODYPART_COST.attack, BODYPART_COST.heal, BODYPART_COST.ranged_attack
);

module.exports = BaseRoomController;