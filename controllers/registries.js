const db = require('../models');

const fetchRegistry = require('../helpers/fetch_registry');
const resJson = require('../helpers/res_json');
const validateAuthorization = require('../helpers/validate_authorization');

module.exports = {
  Registries: {
    findAll: (req, res) => {
        db.Registry.findAll()
          .then(registries => resJson(res, registries))
          .catch(error => resJson(res, null, 500, error));
    },

    create: (req, res) => {
      const registry = req.body.registry;

      db.Registry.create({
        name: registry.name,
        userId: res.user.id,
        type: registry.type
      })
        .then(result => resJson(res, result))
        .catch(error => resJson(res, null, 500, error));
    },

    findOne: (req, res) => {
      const registry = fetchRegistry(req.params.id);

      registry.then(result => {
        if (result === null) {
          return resJson(res, result, 404, 'Not Found')
        }

        if (!validateAuthorization(req.user, result.userId)) {
          return resJson(res, null, 401, 'Bad Credentials');
        }
        resJson(res, result);
      });
    },

    delete: (req, res) => {
      const registry = fetchRegistry(req.params.id);

      registry.then(result => {
        if (result === null) {
          return resJson(res, result, 404, 'Not Found');
        }

        if (!validateAuthorization(req.user, result.userId)) {
          return resJson(res, null, 401, 'Bad Credentials');
        }

        result.destroy()
          .then(() => {
            resJson(res, {
              deleted: true
            });
          })
          .catch(error => resJson(res, null, 500, error));
      });
    },

    update: (req, res) => {
      const registry = fetchRegistry(req.params.id);

      registry.then(result => {
        if (result === null) {
          return resJson(res, result, 404, 'Not Found');
        }

        if (!validateAuthorization(req.user, result.userId)) {
          return resJson(res, null, 401, 'Bad Credentials');
        }

        result.update(req.body.registry)
          .then(updated => {
            resJson(res, {
                update: true,
                data: updated
            });
          })
          .catch(error => resJson(error));
      });
    }
  }
};
