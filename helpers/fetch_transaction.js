const db = require('../models');

const fetchTransaction = async id => {
  const transaction = db.Transaction.findByPk(id, { include: db.Registry });
  return await transaction;
};

module.exports = fetchTransaction;
