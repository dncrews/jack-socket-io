
/**
 * Intializer function
 *
 * @param  {Object} olympus  Olympus instance
 * @param  {Object} stack    Jack-stack instance on Olympus (same as olympus.jack)
 */
module.exports = function(olympus, stack) {
  stack.useAfter('config', 'config:{nameYourPlugin}', function(data) {

    // Configure Olympus, the stack, or the app here
    var app = data.app;

    app.use(function(req, res) {
      return res.send(418);
    });
  });
};
