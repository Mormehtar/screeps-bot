const controllerFactory = require('../controllers/creeps');

// TODO Mind about circle links here.
Object.defineProperty(Creep.prototype, 'controller', {
  get() {
    if (!this._controller) {
      this._controller = controllerFactory(this);
    }
    return this._controller;
  },
  enumerable: false,
  configurable: true
});

Object.defineProperty(Creep.prototype, 'role', {
  get: function () {
    return this.memory.role
  },
  set: function (value) {
    this.memory.role = value;
  },
  enumerable: false,
  configurable: true
});