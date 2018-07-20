const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');

const sequelize = new Sequelize('tissuesdb', 'oreo', 'cookie', {
  host: 'localhost',
  dialect: 'postgres',
});

const Issue = sequelize.define('issue', {
  _id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  status: { type: Sequelize.ENUM('In progess', 'Completed'), defaultValue: 'In progress' },
  description: Sequelize.STRING,
  createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  start: Sequelize.DATE,
  end: Sequelize.DATE,
});

const Client = sequelize.define('client', {
  username: { type: Sequelize.STRING, allowNull: false },
  password: { type: Sequelize.STRING, allowNull: false },
  domain: { type: Sequelize.STRING },
});

const User = sequelize.define('user', {
  email: { type: Sequelize.STRING, allowNull: false },
});

Client.hasMany(Issue);
User.hasMany(Issue);

sequelize.sync({ logging: console.log });

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/issues', async (req, res) => {
  try {
    // const issue = Issue.build(req.body);
    // await issue.save();
    res.json(req.body);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
