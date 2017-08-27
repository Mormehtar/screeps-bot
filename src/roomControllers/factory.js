const InitialDevelopController = require('./InitialDevelopController');

module.exports = function(room) {
  switch (room.state) {
    case 'InitialDevelop': return new InitialDevelopController(room);
    default: throw new Error(`State ${room.state} is not supported`);
  }
};
