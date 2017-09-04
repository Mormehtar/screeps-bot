const BaseController = require('./BaseController');
const constants = require('../constants');

class DevelopController extends BaseController {
  triggerAlert() {
    this.room.memory.lastRole = this.room.memory.role;
    this.room.memory.role = constants.ROOM_STATES.ALERT;
  }
  // run() {
  //   if (this.checkAlert()) {
  //     this.triggerAlert();
  //     return this.room.getRoomController().run();
  //   }
  //   return super.run();
  // }
}

module.exports = DevelopController;
