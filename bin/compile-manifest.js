
global.fs = require('fs');

require('../application/helpers/file-helper.js');

const ROOT = require('path').normalize(`${__dirname}`).replace(/\\/g,"/").replace(/\/bin/,'');
const blacklist = ['loader.js']

console.log("=== Compiling manifest.json ===");

const fileList = [
  'application/constants.js',
  'application/enums.js',
];

addFiles(fileList,'application');
addFiles(fileList,'data');

const testFileList = [];
addFiles(testFileList,'test');

console.log(`Writing lists of ${fileList.length} source files and ${testFileList.length} test files.`)
console.log(fileList);
console.log(testFileList);

// Finally write this file list as a JSON file.
FileHelper.writeJSON(`${ROOT}/manifest.json`, { fileList, testFileList });

// We convert the absolute file paths the FileHelper returns to relative paths when adding them to the manifest. Also,
// we only include files that haven't been included yet. The fileList is initialized with the files that should be
// loaded first.
function addFiles(list, rootName) {
  FileHelper.recursiveFileList(`${ROOT}/${rootName}`).forEach(absolutePath => {
    const index = absolutePath.indexOf(rootName) + rootName.length + 1;
    const relativePath = rootName +'/'+ absolutePath.substring(index);

    if (!list.includes(relativePath) && !blacklist.includes(relativePath)) {
      list.push(relativePath);
    }
  });
}
