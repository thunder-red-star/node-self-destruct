const path = require('path');
const fs = require('fs');

selfDestruct = class {
  static destroy (message, options = {}) {
    let currentDirectoryName = __dirname.split(path.sep).pop();
    console.error(message);
    let thisDirectory = path.dirname(__dirname);
    // delete the package's entry in node_modules
    fs.rmSync(path.join(thisDirectory,  currentDirectoryName), {recursive: true});
    if (options.changePackageFile) {
      // if this option is true, remove the package from the package.json file list of dependencies in that person's project.
      if (fs.existsSync("../../package.json")) {
        const packageJson = require("../../package.json");
        const packageName = currentDirectoryName;
        if (packageJson.dependencies[packageName]) {
          delete packageJson.dependencies[packageName];
          // write the new package.json file
          fs.writeFileSync("../../package.json", JSON.stringify(packageJson, null, 2));
        }
      }
    }
    // process.exit(1);
  }
}

module.exports = selfDestruct;