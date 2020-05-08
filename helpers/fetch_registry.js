const db = require('../models');

const fetchRegistry = async id => {
  const registry = await db.Registry.findByPk(id, { include: db.User });
  return registry;
};

module.exports = fetchRegistry;
