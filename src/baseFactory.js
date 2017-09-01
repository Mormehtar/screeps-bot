class BaseControllerFactory {
  constructor(name) {
    this._roles = {};
    this._name = name;
    this._default = undefined;
  }

  register(role, controller) {
    this._roles[role] = controller;
  }

  registerDefaultRole(role) {
    this._default = role;
  }

  getInstance(entity) {
    const Controller = this._roles[entity.memory.role || this._default];
    if (!Controller) { throw new Error(`${this._name} controller for role ${entity.memory.role} is not registered`); }
    return new Controller(entity);
  }
}

module.exports = BaseControllerFactory;
