const CONSTANTS = require('../../utils/constants');

class Controller {
  constructor(room) {
    this.room = room;
    this.type = undefined;
    this.buildPriority = CONSTANTS.PRIORITIES.COMMON;
    this.repairPriority = CONSTANTS.PRIORITIES.IMPORTANT;
  }
  orderConstruction() {}
  requestEnergy() {}
  requestWork() {
    this.room.constructionSites[this.type].forEach(
      site => this.room.requestWork(
        site, site.progressTotal - site.progress,
        this.buildPriority
      )
    );
  }
  requestRepair() {
    this.room.structures[this.type].forEach(
      structure => {
        const toRepair = structure.hitsMax - structure.hits;
        if (toRepair) {
          this.room.requestRepair(
            structure,
            toRepair,
            this.repairPriority
          );
        }
      }
    );
  }
  runSpecificActivity() {}
  hasSense() { return true; }
  run() {
    if(!this.hasSense()) { return; }
    this.orderConstruction();
    this.requestEnergy();
    this.requestWork();
    this.requestRepair();
    this.runSpecificActivity();
  }
}

module.exports = Controller;
