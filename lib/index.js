
var Plugin = require('olympus-plugin');

var force = new Plugin({
  name: 'sockets',
  basePath: __dirname,
});

module.exports = force.export;
