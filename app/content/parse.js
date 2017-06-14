var fs = require('fs');
var path = require('path');
var yaml = require('js-yaml');
var yamlPath = path.join(__dirname, 'yaml');

function parseYAML(fullFilePath) {
  try {
    return yaml.safeLoad(fs.readFileSync(fullFilePath, 'utf8'));
  } catch (e) {
    console.log(e);
  }
}

function getFile(filePath) {
  return parseYAML(path.join(yamlPath, filePath));
}

function getFolder(_folderPath) {
  var folderPath = path.join(yamlPath, _folderPath);
  var folderName = path.basename(folderPath);
  var files = fs.readdirSync(folderPath);

  var data = [];
  // var data = {}; // We might need this to output an object rather than array at some point

  // Loop through the directory
  for (var i in files) {
    var itemPath = folderPath + '/' + files[i];
    var stats = fs.statSync(itemPath);
    var itemName = path.basename(itemPath);

    // Deal with file
    if (stats.isFile()) {
      var fileName = itemName.split('.')[0];
      var fileExt = itemName.split('.')[1];

      if( fileExt === 'yaml' ){
        // Push JSON output as array item
        data.push(parseYAML(itemPath));

        // Or as an object key instead
        // data[fileName] = parseYAML(itemPath);
      }
    }

    // Deal with folder
    else if (stats.isDirectory()) {
      // loop through the subfolder and attach result to this key
      data[itemName] = getJSON(itemPath);
    }
  }

  return data;
}

module.exports = {
  getFile,
  getFolder
};
