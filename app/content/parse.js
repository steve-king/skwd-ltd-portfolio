var fs = require('fs');
var path = require('path');
var yaml = require('js-yaml');
var yamlPath = path.join(__dirname, 'yaml');

/**
 * @param fullFilePath {string} - full file path of the YAML file
 * @return {object} - YAML data parsed as JS object
 */
function parseYAML(fullFilePath) {
  try {
    return yaml.safeLoad(fs.readFileSync(fullFilePath, 'utf8'));
  } catch (e) {
    console.log(e);
  }
}

/**
 * @param relativePath {string} - file path relative to the yamlPath directory
 * @return {object} - parseYAML output
 */
function getFile(relativePath) {
  return parseYAML(path.join(yamlPath, relativePath));
}

/**
 * Loop through folder recursively and parse all YAML files into a JS object
 * @param {string} _folderPath - folder path relative to the yamlPath directory
 * @param {bool} asArray - Whether to add folder contents as an array instead of object keys (works only 1 level deep)
 * @return {object | array} - combined parseYAML output for each file/folder
 */
function getFolder(_folderPath, asArray = false) {
  var folderPath = path.join(yamlPath, _folderPath);
  var folderName = path.basename(folderPath);
  var files = fs.readdirSync(folderPath);

  // array or object format?
  var data = asArray ? [] : {};

  // Loop through the directory
  for (var i in files) {
    var itemPath = folderPath + '/' + files[i];
    var stats = fs.statSync(itemPath);
    var itemName = path.basename(itemPath);

    // Deal with file
    if (stats.isFile()) {
      var fileName = itemName.split('.')[0];
      var fileExt = itemName.split('.')[1];

      // Deal with .yaml file
      if( fileExt === 'yaml' ){

        const fileData = parseYAML(itemPath);
        if (asArray) {
          // Push JSON output as array item
          data.push(fileData);
        }
        else {
          // Or as an object key
          if (fileName === 'index') {
            // Don't create a new key for index, merge into current object instead
            data = Object.assign({}, data, fileData);
          }
          else {
            data[fileName] = parseYAML(itemPath);
          }

        }
      }
    }

    // Deal with folder
    else if (stats.isDirectory() ) {
      if (asArray) {
        // Push JSON output as array item
        const folderData = getFolder(path.join(folderName, itemName));
        folderData.name = itemName;
        data.push(folderData);
      }
      else {
        // Or as an object key
        data[itemName] = getFolder(path.join(folderName, itemName));
      }
    }
  }
  return data;
}

module.exports = {
  getFile,
  getFolder
};
