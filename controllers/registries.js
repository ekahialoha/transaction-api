const db = require('../models');

const fetchRegistry = require('../helpers/fetch_registry');
const resJson = require('../helpers/res_json');
const validateAuthorization = require('../helpers/validate_authorization');

module.exports = {
  Registries: {
    findAll: (req, res) => {
      const options = { where: { Account: {} } };
      if (req.user.isAdmin && req.query.useAdmin !== undefined && req.query.useAdmin === 'true') {
        if (req.query.userId !== undefined) {
          options.where.Account.userId = req.query.userId;
        }
      } else {
        options.where.Account.userId = req.user.id;
      }

      db.Registry.findAll(options)
        .then(registries => resJson(res, registries))
        .catch(error => resJson(res, error, 500));
    },

    create: (req, res) => {
      const registry = req.body.registry;

      db.Registry.create({
        name: registry.name,
        accountId: registry.accountId,
        type: registry.type
      })
        .then(result => resJson(res, result))
        .catch(error => resJson(res, error, 500));
    },

    findOne: (req, res) => {
      const registry = fetchRegistry(req.params.id);

      registry.then(result => {
        if (result === null) {
          return resJson(res, 'Not Found', 404)
        }

        if (!validateAuthorization(req.user, result.userId)) {
          return resJson(res, 'Bad Credentials', 401);
        }
        resJson(res, result);
      });
    },

    delete: (req, res) => {
      const registry = fetchRegistry(req.params.id);

      registry.then(result => {
        if (result === null) {
          return resJson(res, 'Not Found', 404);
        }

        if (!validateAuthorization(req.user, result.userId)) {
          return resJson(res, 'Bad Credentials', 401);
        }

        result.destroy()
          .then(() => {
            resJson(res, {
              deleted: true
            });
          })
          .catch(error => resJson(res, error, 500));
      });
    },

    update: (req, res) => {
      const registry = fetchRegistry(req.params.id);

      registry.then(result => {
        if (result === null) {
          return resJson(res, 'Not Found', 404);
        }

        if (!validateAuthorization(req.user, result.userId)) {
          return resJson(res, 'Bad Credentials', 401);
        }

        result.update(req.body.registry)
          .then(updated => {
            resJson(res, {
                update: true,
                data: updated
            });
          })
          .catch(error => resJson(res, 'Unprocessable Entity', 422));
      });
    }
  }
};
