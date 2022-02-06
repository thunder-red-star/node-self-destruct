const fs = require('fs');

// make node_module if it isn't there already
if (!fs.existsSync('node_modules')) {
  fs.mkdirSync('node_modules');
}

// make a self-destruct directory in node_modules
if (!fs.existsSync('node_modules/self-destruct')) {
  fs.mkdirSync('node_modules/self-destruct');
}

// make a fake-module directory in node_modules
if (!fs.existsSync('node_modules/fake-module')) {
  fs.mkdirSync('node_modules/fake-module');
}

// copy all the files in the src directory into the self-destruct directory in the node modules directory
fs.readdir('../src', (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  files.forEach(file => {
    fs.copyFile(`../src/${file}`, `./node_modules/self-destruct/${file}`, err => {
      if (err) {
        console.error(err);
        return;
      }
    });
  });
});

// copy the fake module in assets into the fake-module directory in the node modules directory

fs.copyFile('./assets/fake.js', './node_modules/fake-module/fake.js', err => {
  if (err) {
    console.error(err);
    return;
  }
});

// copy the fake package.json file in assets into this directory.
fs.copyFile('./assets/package.json', './package.json', err => {
  if (err) {
    console.error(err);
    return;
  }
});