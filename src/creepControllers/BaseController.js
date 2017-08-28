class BaseController {
  constructor(creep) {
    this.creep = creep;
  }
  run() { throw new Error('Not implemented yet'); }
  static getMethodForState(state) {
    return `${BaseController._prefix}${state}`;
  }
  moveTo(target) {
    if (this.creep.fatigue === 0) {
      this.creep.moveTo(target);
    }
  }
}

BaseController._prefix = '_run';

module.exports = BaseController;
