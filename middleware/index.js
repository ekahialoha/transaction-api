const path = require('path');
const fs = require('fs');

const middlewarePath = path.join(__dirname, '/');
const currentFile = path.basename(__filename);

let middleware = {};

const allFiles = fs.readdirSync(middlewarePath);

const onlyMiddleware = allFiles.filter((file) => (file.includes('.') && file.slice(-3) === '.js' && file !== currentFile));

onlyMiddleware.forEach((file) => middleware = Object.assign(middleware, require(`./${file}`)));

module.exports = middleware;
