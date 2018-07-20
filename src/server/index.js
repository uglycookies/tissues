const express = require('express');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('tissues-db', 'oreo', 'cookie', {
  host: 'localhost',
  dialect: 'postgres',
});

const app = express();
const port = process.env.PORT || 8080;

app.get('/api/test', (req, res) => {
  res.json({ message: 'GET is working!' });
});

app.post('/api/test', (req, res) => {
  res.json({ message: 'POST is working!' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
