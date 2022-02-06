const fs = require('fs');
const myTestModule = require('./node_modules/fake-module/fake.js');

// This file should only run if the build.js file is ran!

// Run the init function in the fake module. After running this the whole package should be gone.
myTestModule.init();

// Check if the fake module was deleted.
if (fs.existsSync('./node_modules/fake-module/fake.js')) {
  console.log('The fake module was not deleted!');
  process.exit(1);
} else {
  console.log('The fake module was deleted!');
  process.exit(0);
}