// A fake module calling Self Destruct.
const fs = require('fs');
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


