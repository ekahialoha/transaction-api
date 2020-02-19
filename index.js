// ==========================
// Application Dependencies
// ==========================
const dotEnv = require('dotenv').config();
const express = require('express');
const sequelize = require('sequelize');

// ====================
// Simple application
// ====================
const app = express();
const port = process.env.PORT || 3000;

// =====================
// Database Connection
// =====================
const db = new sequelize(process.env.DATABASE_URI);
db.authenticate()
  .then(() => console.log('Postgres/Sequelize connection successfull.'))
  .catch(() => console.log('Unable to establish Postgres/Sequelize connection.'));


app.get('/', (req, res) => res.send('Hello :)'));
app.listen(port, () => console.log(`APPLICATION STATUS: Listening on port ${port}`))
