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
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
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



module.exports = router;
