module.exports.addMemory = function (constructor, key = null, prop = 'memory') {
  const _key = key || constructor.name;
  Object.defineProperty(constructor.prototype, prop, {
    get: function() {
      if(_.isUndefined(Memory[_key])) {
        Memory[_key] = {};
      }
      if(!_.isObject(Memory[_key])) {
        return undefined;
      }
      return Memory[_key][this.id] =
        Memory[_key][this.id] || {};
    },
    set: function(value) {
      if(_.isUndefined(Memory[_key])) {
        Memory[_key] = {};
      }
      if(!_.isObject(Memory[_key])) {
        throw new Error(`Could not set ${constructor.name} memory`);
      }
      Memory[_key][this.id] = value;
    },
    enumerable: false
  });
};
