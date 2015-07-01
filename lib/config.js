/**
 * Set your defaults here.
 *
 * Also put in any `node-config` pulls.
 * If you do use node-config, npm install it yourself
 */

// var configLib = require('config');
// var config = {};
// if (configLib.has('somekey')) config = configLib.get('somekey');

var path = require('path')
  , debug = require('debug')('olympus:sockets');

module.exports = {
  dirnames: [ path.join(process.cwd(), 'sockets') ],
  logger: {
    sockets: {
      debug: debug,
      info: debug,
      error: debug,
      warn: debug
    },
  },
};
