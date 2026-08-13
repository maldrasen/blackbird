
global.fs = require('fs');

require('../application/helpers/file-helper.js');

const ROOT = require('path').normalize(`${__dirname}`).replace(/\\/g,"/").replace(/\/bin/,'');
const blacklist = [
  'application/browser.js',
  'application/browser-shim.js',
  'application/loader.js',
  'application/environment.js',
  'application/server.js',
]

console.log("=== Compiling manifest.json ===");

const applicationFiles = [
  'application/constants.js',
  'application/enums.js',
];
const dataFiles = ['data/game-flags.js'];
const viewFiles = [];
const testFiles = [];

addFiles(applicationFiles,'application');
addFiles(dataFiles,'data');
addFiles(viewFiles,'views');
addFiles(testFiles,'test');

const sourceCount = applicationFiles.length + dataFiles.length + viewFiles.length;
console.log(`Writing lists of ${sourceCount} source files and ${testFiles.length} test files.`)

// Finally write these file lists as a JSON file. The loader imports all three source lists, while headless boots load
// only the application and data lists.
FileHelper.writeJSON(`${ROOT}/manifest.json`, { applicationFiles, dataFiles, viewFiles, testFiles });

// We convert the absolute file paths the FileHelper returns to relative paths when adding them to the manifest. Also,
// we only include javascript files that haven't been included yet. Each list is initialized with the files that
// should be loaded first.
function addFiles(list, rootName) {
  FileHelper.recursiveFileList(`${ROOT}/${rootName}`).forEach(absolutePath => {
    if (absolutePath.endsWith('.js') === false) { return; }

    const index = absolutePath.indexOf(rootName) + rootName.length + 1;
    const relativePath = rootName +'/'+ absolutePath.substring(index);

    if (!list.includes(relativePath) && !blacklist.includes(relativePath)) {
      list.push(relativePath);
    }
  });
}
