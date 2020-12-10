const db = require('../models');

const fetchAccount = async (id) => {
  const account = await db.Account.findByPk(id);

  return account;
};

module.exports = fetchAccount;
