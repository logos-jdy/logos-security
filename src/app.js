const express = require('express');
const mysql = require('mysql');
const _ = require('lodash');
const app = express();

// Deliberately vulnerable example: reflected XSS (CWE-79).
app.get('/welcome', (req, res) => {
  res.send('<h1>Welcome, ' + req.query.name + '</h1>');
});

// Deliberately vulnerable example: SQL injection (CWE-89).
// The connection is local and illustrative only; no real database is required.
const database = mysql.createConnection({ host: '127.0.0.1', database: 'security_lab' });
app.get('/users', (req, res) => {
  const query = "SELECT id, name FROM users WHERE name = '" + req.query.name + "'";
  database.query(query, (error, results) => {
    if (error) return res.status(500).send('Database error');
    res.json(results);
  });
});

app.get('/sample', (req, res) => {
  res.json(_.chunk(['alpha', 'beta', 'gamma'], 2));
});

// Static scanning only: deliberately no app.listen() or startup script.
module.exports = app;
