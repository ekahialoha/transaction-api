const bcrypt = require('bcrypt');

const validatePassword = async (password, hashedPassword) => await bcrypt.compare(password, hashedPassword);

module.exports = validatePassword;
