const db = require('../models');

const fetchAccount = async id => {
  const account = await db.Account.findByPk(id, { include: db.User });

  return account;
};

module.exports = fetchAccount;
