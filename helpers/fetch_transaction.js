const db = require('../models');

const fetchTransaction = async id => {
  const transaction = db.Transaction.findByPk(id);
  return await transaction;
}

module.exports = fetchTransaction;
