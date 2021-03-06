/**
 * Intializer function
 */
var jack = require('jack-stack')
  , http = require('http')
  , io = require('socket.io')
  , glob = require('glob')
  , loadName = 'socket-io';


module.exports = function() {
  var config = this.config;

  if (!Array.isArray(config.dirnames)) config.dirnames = [ config.dirnames ];

  var server = http.createServer(jack.app)
    , socket = io.listen(server, { logger: config.logger });

  if (config.useAfter) {
    jack.useAfter(config.useAfter, loadName, handler);
  } else if (config.useBefore) {
    jack.useBefore(config.useBefore, loadName, handler);
  } else {
    jack.useBefore('stack-end', loadName, handler);
  }


  function handler() {
    var dirnames = config.dirnames;

    if (!dirnames.length) return;

    if (config.authorization) {
      socket.set('authorization', config.authorization);
    }

    jack.sockets = {
      server: server,
      socket: socket,
    };

    dirnames.map(function(dir) {
      var socks = glob.sync(dir + '/**');

      socks.map(function(file) {
        if (!file.match(/\.js$/)) return;
        require(file)(socket);
      });
    });
  }

};
