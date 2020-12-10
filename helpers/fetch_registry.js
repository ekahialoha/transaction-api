const db = require('../models');

const fetchRegistry = async (id) => {
  const registry = await db.Registry.findByPk(id, { include: db.Account });
  return registry;
};

module.exports = fetchRegistry;
