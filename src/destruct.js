const path = require('path');
const fs = require('fs');

// code from callsites package, because esm is being dumb
function callsites () {
  const _prepareStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = (_, stack) => stack;
  const stack = new Error().stack.slice(1);
  Error.prepareStackTrace = _prepareStackTrace;
  return stack;
}

// code from https://github.com/sindresorhus/parent-module/, because esm is being dumb
function parentModule (filePath) {
  const stacks = callsites();
  if (!filePath) {
    return stacks[2].getFileName();
  }
  let hasSeenValue = false;
  stacks.shift();
  for (const stack of stacks) {
    const parentFilePath = stack.getFileName();
    if (typeof parentFilePath !== 'string') {
      continue;
    }
    if (parentFilePath === filePath) {
      hasSeenValue = true;
      continue;
    }
    if (parentFilePath === 'module.js') {
      continue;
    }
    if (hasSeenValue && parentFilePath !== filePath) {
      return parentFilePath;
    }
  }
}

selfDestruct = class {
  static destroy (message, options = {}) {
    let currentDirectoryName = parentModule().split(path.sep)[parentModule().split(path.sep).length - 2];
    console.error(message);
    let thisDirectory = path.dirname(__dirname);
    // delete the package's entry in node_modules
    fs.rmSync(path.join(thisDirectory, currentDirectoryName), {recursive: true});
    if (options.changePackageFile) {
      // if this option is true, remove the package from the package.json file list of dependencies in that person's project.
      if (fs.existsSync("./package.json")) {
        const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));
        const packageName = currentDirectoryName;
        if (packageJson.dependencies[packageName]) {
          delete packageJson.dependencies[packageName];
          // write the new package.json file
          fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, 2));
        }
      }
    }
    process.exit(1);
  }
}

module.exports = selfDestruct;