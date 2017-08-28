const WorkerController = require('./WorkerController');

class UpgraderController extends WorkerController {
  chooseTarget() {
    return WorkerController.States.GoForController;
  }
}

module.exports = UpgraderController;