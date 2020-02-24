const path = require('path');
const fs = require('fs');

const controllerPath = path.join(__dirname, '/');
const currentFile = path.basename(__filename);

let controllers = {};

const allFiles = fs.readdirSync(controllerPath);

const onlyControllers = allFiles.filter(file => {
  return (file.includes('.') && file.slice(-3) === '.js' && file !== currentFile)
});

onlyControllers.forEach(file => controllers = Object.assign(controllers, require("./" + file)));

module.exports = controllers;
