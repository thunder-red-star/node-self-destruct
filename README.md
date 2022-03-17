# node-self-destruct

Removes your node module from the filesystem if you want it to. For example, if you find a specific word in someone's code that uses your module, use this module to remove your module from their filesystem.
Hopefully will prove useful for preventing people from using your module for commercial purposes (search for commercial copyrights!).

## Installation

```npm i node-self-destruct```

## Usage example 

```js
const SelfDestruct = require('../self-destruct/destruct.js');

// do something that causes a self destruct.
module.exports = class Fake {
    static init () {
        console.log("Self destructing...");
        SelfDestruct.destroy("You are not allowed to use this module!", {
            changePackageFile: true
        });
    }
}
```

## Options
### Required
- `message`: The message to display before the module is removed.
### Optional
- `changePackageFile`: If true, the package.json file will be changed to remove the module. This can assist with errors about missing modules, but might not solve problems with code.

## TODO
- [x] Add tests
- [x] Add simple README
- [x] Create self-destruction code
- [x] Publish to npm
- [ ] More documentation
- [ ] Some sort of plugin system, get user geolocation, etc (Russia/Ukraine issue)
