const db = require('../models');

const fetchUser = (id, searchBy = 'id') => {
  let user;
  if (searchBy === 'id') {
    user = db.User.findByPk(id);
  } else {
    user = db.User.findOne({
      where: {
        email: id
      }
    });
  }
  return user;
}

module.exports = fetchUser;
