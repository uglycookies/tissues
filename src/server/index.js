const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');

const sequelize = new Sequelize('tissuesdb', 'oreo', 'cookie', {
  host: 'localhost',
  dialect: 'postgres',
});

const Issue = sequelize.define('issue', {
  _id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  status: { type: Sequelize.ENUM('In progress', 'Completed'), defaultValue: 'In progress' },
  type: {
    type: Sequelize.ENUM('Visual', 'Functional', 'Technical', 'Content', 'Performance'),
  },
  description: Sequelize.STRING,
  start: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  end: { type: Sequelize.DATE },
});

const Client = sequelize.define('client', {
  _id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: Sequelize.STRING, allowNull: false },
  password: { type: Sequelize.STRING, allowNull: false },
  domain: { type: Sequelize.STRING },
});

const User = sequelize.define('user', {
  _id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: Sequelize.STRING, allowNull: false },
});

Client.hasMany(Issue);
User.hasMany(Issue);

sequelize.sync();

const app = express();
const port = process.env.PORT || 8080;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Routes
 */
app.post('/api/signup', async (req, res) => {
  try {
    const { username, password, domain } = req.body;
    if (!username || !password || !domain) throw new Error('Must submit all fields');
    const foundClient = await Client.findOne({ where: { username } });
    if (foundClient) throw new Error('User already exists');
    const newClient = await Client.create({ username, password, domain });
    res.json(newClient);
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const foundClient = await Client.findOne({ where: { username, password } });
    if (!foundClient) throw new Error('Incorrect username or password');
    res.json(foundClient);
  } catch (error) {
    console.log(error);
    res.json({});
  }
});

app.get('/api/issues', async (req, res) => {
  try {
    const issues = await Issue.findAll({});
    res.json(issues);
  } catch (error) {
    console.log(error);
    res.json({});
  }
});

app.post('/api/issues', async (req, res) => {
  try {
    const { email, description, type } = req.body;
    const domain = req.get('origin');
    const client = await Client.find({ where: { domain } });

    // client does not exist
    if (!client) throw new Error('Unauthorized domain');

    const user = await User.findOrCreate({ where: { email } });
    const issue = Issue.build({
      description,
      type,
      userId: user[0]._id,
    });
    const savedIssue = await issue.save();
    res.json(savedIssue);
  } catch (error) {
    console.log(error);
    res.json({});
  }
});

app.get('/api/issues/:issuesId', async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.issuesId);
    res.json(issue);
  } catch (error) {
    console.log(error);
    res.json({});
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
