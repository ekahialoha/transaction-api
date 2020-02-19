// ===================================
// Application Dependencies/Includes
// ===================================
const express = require('express');
const router = express.Router();
const db = require('../models');

// ========================
// Setup routes for /api
// ========================
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

router.get('/registries', (req, res) => {
  db.Registry.findAll().then(registries => res.json(registries));
});

router.post('/registries', (req, res) => {
  db.Registry.create({
    name: req.body.registry.name,
    user_id: req.body.registry.user_id,
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

module.exports = router;
