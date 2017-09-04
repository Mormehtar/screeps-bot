const BuildingsControllers = require('../buildings');

class BaseController {
  constructor(room) {
    this.room = room;
    this.buildingsControllers = BuildingsControllers.map(Controller => new Controller(room));
  }
  getCreepsToBuild() { return []; }
  run() {
    this.buildingsControllers.forEach(controller => controller.run());
    this.room.creeps.forEach(creep => creep.controller.run());
  }
}

module.exports = BaseController;
