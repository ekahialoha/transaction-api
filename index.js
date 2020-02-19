// ==========================
// Application Dependencies
// ==========================
require('dotenv').config();
const express = require('express');

// ====================
// Simple application
// ====================
const app = express();
const port = 3000;


app.get('/', (req, res) => res.send('Hello :)'));
app.listen(port, () => console.log(`APPLICATION STATUS: Listening on port ${port}`))
