// ===================================
// Application Dependencies/Includes
// ===================================
const express = require('express');
const router = express.Router();
const db = require('../models');

// =============================
// Setup routes for /api/users
// =============================
router.get('/users', (req, res) => {
  db.User.findAll().then(users => res.json(users));
});

router.post('/users', (req, res) => {
  db.User.create({
    name: req.body.user.name,
    email: req.body.user.email,
    password: req.body.user.password
  }).then(user => res.json(user));
});

router.get('/users/:id', (req, res) => {
  db.User.findAll({
    where: {
      id: req.params.id
    }
  }).then(user => res.json(user));
});

router.delete('/users/:id', (req, res) => {
  db.User.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => res.json({ deleted: true }));
});

router.put('/users/:id', (req, res) => {
  db.User.update(req.body.user, {
    where: {
      id: req.params.id
    }
  }).then(() => res.json({ updated: true }));
});

// ==================================
// Setup routes for /api/registries
// ==================================
router.get('/registries', (req, res) => {
  db.Registry.findAll().then(registries => res.json(registries));
});

router.post('/registries', (req, res) => {
  db.Registry.create({
    name: req.body.registry.name,
    userId: req.body.registry.userId,
    type: req.body.registry.type
  }).then(registry => res.json(registry));
});

router.get('/registries/:id', (req, res) => {
  db.Registry.findAll({
    where: {
      id: req.params.id
    }
  }).then(registry => res.json(registry));
});

router.delete('/registries/:id', (req, res) => {
  db.Registry.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => res.json({ deleted:true }));
});

router.put('/registries/:id', (req, res) => {
  db.Registry.update(req.body.registry, {
    where: {
      id: req.params.id
    }
  }).then(() => res.json({ update: true }));
});

// =====================================
// Setup routes for /api/transactions
// =====================================
router.get('/transactions', (req, res) => {
  db.Transaction.findAll().then(transactions => res.json(transactions));
});

router.post('/transactions', (req, res) => {
  db.Transaction.create({
    description: req.body.transaction.description,
    userId: req.body.transaction.userId,
    registryId: req.body.transaction.registryId,
    type: req.body.transaction.type,
    value: req.body.transaction.value
  }).then(transaction => res.json(transaction));
});

router.get('/transactions/:id', (req, res) => {
  db.Transaction.findAll({
    where: {
      id: req.params.id
    }
  }).then(transaction => res.json(transaction));
});

router.delete('/transactions/:id', (req, res) => {
  db.Transaction.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => res.json({ deleted: true }));
});

router.put('/transactions/:id', (req, res) => {
  db.Transaction.update(req.body.transaction, {
    where: {
      id: req.params.id
    }
  }).then(() => res.json({ updated: true }));
});

module.exports = router;
