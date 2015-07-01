
/**
 * Intializer function
 *
 * @param  {Object} olympus  Olympus instance
 * @param  {Object} stack    Jack-stack instance on Olympus (same as olympus.jack)
 */
var http = require('http')
  , io = require('socket.io')
  , glob = require('glob')
  , config = require('./config')
  , loadName = 'sockets:load';


module.exports = function(olympus, stack) {
  if (!Array.isArray(config.dirnames)) config.dirnames = [ config.dirnames ];

  var server = http.createServer(olympus.app)
    , socket = io.listen(server, { logger: config.logger });

  stack.useAfter('config', 'config:sockets', function(data) {
    var jackConfig = data.config;

    if (!jackConfig.sockets) jackConfig.sockets = {};

    jackConfig.sockets.server = server;
    jackConfig.sockets.socket = socket;
  });

  if (config.useAfter) {
    stack.useAfter(config.useAfter, loadName, handler);
  } else if (config.useBefore) {
    stack.useBefore(config.useBefore, loadName, handler);
  } else {
    stack.useAfter('routing', loadName, handler);
  }


  function handler(data) {
    var jackConfig = data.config
      , jackDirs = jackConfig.dirnames.sockets;

    if (!Array.isArray(jackDirs)) jackDirs = [ jackDirs ];

    var dirnames = config.dirnames.concat(jackDirs);

    if (!dirnames.length) return;

    dirnames.map(function(dir) {
      var socks = glob.sync(dir + '/**');

      socks.map(function(file) {
        if (!file.match(/\.js$/)) return;
        require(file)(socket);
      });
    });
  }


};
