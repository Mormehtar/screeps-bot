const BuildingsControllers = require('../buildings');

class BaseController {
  constructor(room) {
    this.room = room;
    this.buildingsControllers = BuildingsControllers.map(Controller => new Controller(room));
  }
  getCreepsToBuild() { return []; }
  getWholePopulation() {
    if (!this._population) {
      this._population = {};
      this.room.creeps.forEach(creep => {
        if (!this._population[creep.role]) {
          this._population[creep.role] = [];
        }
        this._population[creep.role].push(creep);
      });
    }
    return this._population;
  }
  getPopulation(role) {
    return this.getWholePopulation()[role] || [];
  }
  getPopulationCount(role) {
    return this.getPopulation(role).length;
  }
  getPopulationCounts() {
    const pop = this.getWholePopulation();
    return Object.keys(pop).reduce((obj, key) => {
      obj[key] = pop[key].length;
      return obj;
    }, {});
  }
  run() {
    this.buildingsControllers
      .forEach(Controller => (new Controller(this.room)).run());
    this.room.creeps.forEach(creep => creep.controller.run());
  }
}

module.exports = BaseController;
