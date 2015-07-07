# jack-socket-io
This Jack-Stack Plugin that auto-loads your socket-io connections.


## Config

```js
jack.add(require('jack-socket-io').configure({
  dirnames: [ 'path1', 'path2', ]
}));
```

By default, the `sockets:load` event gets handled after jack-stack `router`.
If you would like to move this elsewhere,  you may set a `config.useBefore`
or `config.useAfter` the string eventname that you want to neighbor.

```js
jack.add(require('jack-socket-io').configure({
  dirnames: [],
  useBefore: 'router',
}))
```

This plugin by default uses [debug](https://www.npmjs.com/package/debug)
for logging. If you would like to use your own logger, simply replace the
`config.logger` with one that you prefer. The format socket.io is expecting
is:

```js
require('olympus-sockets')({
  dirnames: [],
  logger: {
    sockets: {
      debug: someLoggingFunction,
      info: someLoggingFunction,
      error: someLoggingFunction,
      warn: someLoggingFunction,
    }
  }
});
```

## Assumptions
This plugin assumes that in the directories you're providing, you have
files that each export a single function that accepts an instance of
socket.io:

```js
module.exports = function(io) {
  var room = io.of('something');
  room.on('connection', ...
  ...
}
```


## Jack-Events
To play nice with this plugin, you should expect the following events:

- `config:sockets`: Sets up the socket configuration
- `sockets:load`: Manages the loading of all of the sockets files
