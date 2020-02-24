const db = require('../models');

const fetchUser = async id => {
  const user = await db.User.findByPk(id);
  return user;
}

module.exports = fetchUser;
