
var path = require('path')
  , debug = require('debug')('jack:sockets');

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
