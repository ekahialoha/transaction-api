// ===================================
// Application Dependencies/Includes
// ===================================
const express = require('express');
const router = express.Router();
const db = require('../models');
const controllers = require('../controllers')

// =============================
// Setup routes for /api/users
// =============================
console.log(controllers);
router.get('/users', controllers.Users.findAllUsers);

router.post('/users', controllers.Users.createUser);

router.get('/users/:id', controllers.Users.findOneUser);

router.delete('/users/:id', controllers.Users.deleteUser);

router.put('/users/:id', controllers.Users.updateUser);

// =========================================
// Setup reoutes for /api/authentications
// =========================================
router.post('/authentications', (req, res) => {
  db.User.findOne({
    where: {
      email: req.body.authentication.email
    }
  }).then(async user => {
    res.json(await user.validatePassword(req.body.authentication.password));
  }).catch(error => res.json(error))
});


// ==================================
// Setup routes for /api/registries
// ==================================
router.get('/registries', (req, res) => {
  db.Registry.findAll().then(registries => res.json(registries)).catch(error => res.json(error));
});

router.post('/registries', (req, res) => {
  db.Registry.create({
    name: req.body.registry.name,
    userId: req.body.registry.userId,
    type: req.body.registry.type
  }).then(registry => res.json(registry)).catch(error => res.json(error));
});

router.get('/registries/:id', (req, res) => {
  db.Registry.findOne({
    where: {
      id: req.params.id
    }
  }).then(registry => res.json(registry)).catch(error => res.json(error));
});

router.delete('/registries/:id', (req, res) => {
  db.Registry.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => res.json({ deleted:true })).catch(error => res.json(error));
});

router.put('/registries/:id', (req, res) => {
  db.Registry.update(req.body.registry, {
    where: {
      id: req.params.id
    }
  }).then(() => res.json({ update: true })).catch(error => res.json(error));
});

// =====================================
// Setup routes for /api/transactions
// =====================================
router.get('/transactions', (req, res) => {
  db.Transaction.findAll()
    .then(transactions => res.json(transactions))
    .catch(error => res.json(error));
});

router.post('/transactions', (req, res) => {
  db.Transaction.create({
    description: req.body.transaction.description,
    userId: req.body.transaction.userId,
    registryId: req.body.transaction.registryId,
    type: req.body.transaction.type,
    value: req.body.transaction.value
  }).then(transaction => res.json(transaction)).catch(error => res.json(error));
});

router.get('/transactions/:id', (req, res) => {
  db.Transaction.findOne({
    where: {
      id: req.params.id
    }
  }).then(transaction => res.json(transaction)).catch(error => res.json(error));
});

router.delete('/transactions/:id', (req, res) => {
  db.Transaction.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => res.json({ deleted: true })).catch(error => res.json(error));
});

router.put('/transactions/:id', (req, res) => {
  db.Transaction.update(req.body.transaction, {
    where: {
      id: req.params.id
    }
  }).then(() => res.json({ updated: true })).catch(error => res.json(error));
});

module.exports = router;
