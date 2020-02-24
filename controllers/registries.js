const db = require('../models');

const fetchRegistry = async (id) => {
  let registry = await db.Registry.findByPk(id);

  if (registry === null) {
    return { error: 'not found'};
  } else {
    return registry;
  }
}

module.exports = {
  Registries: {
    findAll: (req, res) => {
        db.Registry.findAll()
          .then(registries => res.json(registries))
          .catch(error => res.json(error));
    },

    create: (req, res) => {
      db.Registry.create({
        name: req.body.registry.name,
        userId: req.body.registry.userId,
        type: req.body.registry.type
      }).then(registry => res.json(registry)).catch(error => res.json(error));
    },

    findOne: (req, res) => {
      const registry = fetchRegistry(req.params.id);

      registry.then(result => {
        res.json(result)
      });
    },

    delete: (req, res) => {
      const registry = fetchRegistry(req.params.id);

      registry.then(result => {
        if (result.error !== undefined) return res.json(result);

        result.destroy()
          .then(() => res.json({ deleted:true }))
          .catch(error => res.json(error));
      });
    },

    update: (req, res) => {
      const registry = fetchRegistry(req.params.id);

      registry.then(result => {
        if (result.error !== undefined) return res.json(result);

        result.update(req.body.registry)
          .then(() => res.json({ update: true }))
          .catch(error => res.json(error));
      });

    }
  }
};
