
var Plugin = require('olympus-plugin');

var force = new Plugin({
  // name: '', // name your plugin. Don't put `olympus` in the title, as that's assumed
  basePath: __dirname,
});

module.exports = force.export;
