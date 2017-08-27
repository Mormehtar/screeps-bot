const BaseController = require('./BaseController');
const constants = require('../constants');

class WorkerController extends BaseController {
  run() {
    if (this.creep.spawning) { return null; }
    if (this.creep.carry[RESOURCE_ENERGY] === 0) { this.creep.state = WorkerController.States.GoForEnergy; }
    while(this[WorkerController.getMethodForState(this.creep.state)]);
  }

  chooseTarget() {
    if (this.creep.room.energyAvailable < this.creep.room.energyCapacityAvailable) {
      return WorkerController.States.GoForSpawn;
    }
    return WorkerController.States.GoForController;
  }
};

WorkerController.States = {
  GoForEnergy: 'GoForEnergy',
  Harvest: 'Harvest',
  GoForSpawn: 'GoForSpawn',
  GoForController: 'GoForController',
  UpgradeController: 'UpgradeController'
};

WorkerController.prototype[WorkerController.getMethodForState(WorkerController.States.GoForController)] = function () {
  this.creep.upgradeController(this.creep.room.controller);
};

WorkerController.prototype[WorkerController.getMethodForState(WorkerController.States.GoForController)] = function () {
  if (this.creep.pos.inRangeTo(this.creep.room.controller, constants.CONTROLLER_UPGRADE_DISTANCE)) {
    this.creep.state = WorkerController.States.UpgradeController;
    return true;
  }
  this.creep.moveTo(this.creep.room.controller);
};

WorkerController.prototype[WorkerController.getMethodForState(WorkerController.States.GoForSpawn)] = function () {
  if (!this.creep.target) {
    this.creep.target = this.creep.room.findClosestByPath(FIND_MY_SPAWNS);
  }
  if (this.creep.pos.isNear(this.creep.target)) {
    if (this.creep.room.energyCapacityAvailable === this.creep.room.energyAvailable) {
      this.creep.target = null;
      this.creep.state = this.chooseTarget();
      return true;
    }
    this.creep.transfer(
      this.creep.target,
      Math.min(
        this.creep.carry[RESOURCE_ENERGY],
        this.creep.room.energyCapacityAvailable - this.creep.room.energyAvailable
      )
    );
  }
};

WorkerController.prototype[WorkerController.getMethodForState(WorkerController.States.GoForEnergy)] = function () {
  if(!this.creep.target) {
    this.creep.target = this.creep.chooseSource();
    if (!this.creep.target) {
      return false;
    }
    this.creep.target.creeps += 1;
  }
  if(this.creep.pos.isNear(this.creep.target)) {
    this.creep.state = WorkerController.States.Harvest;
    return true;
  }
  this.creep.moveTo(this.creep.target);
};

WorkerController.prototype[WorkerController.getMethodForState(WorkerController.States.Harvest)] = function () {
  if(this.creep.carry[RESOURCE_ENERGY] === this.creep.carryCapacity) {
    this.creep.target.creeps -= 1;
    this.creep.target = null;
    this.creep.state = this.chooseTarget();
    return true;
  }
  this.creep.harvest(this.creep.target);
};

module.exports = WorkerController;