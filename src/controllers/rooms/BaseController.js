class BaseController {
  constructor(room) {
    this.room = room;
  }
  getCreepsToBuild() { return []; }
}

module.exports = BaseController;
