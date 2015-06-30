# olympus-{name your plugin}
This Olympus Plugin needs a description


Put in some examples on how to use it
```js
var isEB = !!(~['production', 'staging', 'testing'].indexOf(process.env.NODE_ENV));

if (isEB) {
  olympus.use(require('olympus-your-plugin')(config));

  //or
  olympus.loadPlugins([
    require('olympus-your-plugin')(config)
  ]);
}
```
