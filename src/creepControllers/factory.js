class CreepControllerFactory {
  constructor() {
    this._roles = {};
  }

  register(role, controller) {
    this._roles[role] = controller;
  }

  getInstance(creep) {
    const Controller = this._roles[creep.memory.role];
    if (!Controller) { throw new Error(`Controller for role ${creep.memory.role} is not registered`); }
    return new Controller(creep);
  }
}

module.exports = new CreepControllerFactory();