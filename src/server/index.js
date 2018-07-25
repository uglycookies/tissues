const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const bcryptNodejs = require('bcrypt-nodejs');

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
// app.post('/api/signup', async (req, res) => {
//   try {
//     const { username, password, domain } = req.body;
//     if (!username || !password || !domain) return Error('Must submit all fields');
//     const foundClient = await Client.findOne({ where: { username } });
//     console.log("LEARN TO FKING LISTEN TO ME AND ONLY MAKE ONE ACT", foundClient);
//     if (foundClient) throw new Error('User already exists');
//     bcryptNodejs.hash(req.body.password, null, null, function(err, hash) {
//       const newClient = new Client({ username: username, password: hash, domain: domain });
//       console.log('THIS IS MY MOTHER FKING CLIENT, DEAL WITH IT', newClient);
//       res.json(newClient);
//     })
//     // const newClient = await Client.create({ username, password, domain });
//     // console.log('THIS IS MY NEW CLIENT NOW MAKE IT DAMNIT', newClient);
//     // res.json(newClient);
//   } catch (error) {
//     console.log(error);
//     res.json({ error });
//   }
// });

app.post('/api/signup', 
  function(req, res){
    var username = req.body.username;
    var domain = req.body.domain;

    bcryptNodejs.hash(req.body.password, null, null, function(err, hash) {
      var client = new Client({ username: username, password: hash, domain: domain })
      client.save().then(function(newClient) {
        console.log("Successfully added " + username + " to the database biatch!");
        res.json(client);
        // req.session.regenerate(function(){
        //   res.redirect()
        // })
      })
    })
  });

// app.post('/api/login', async (req, res) => {
//   try {
//     // console.log('running index.js')
//     const { username, password } = req.body;
      //const username = req.body.username
//     const foundClient = await Client.findOne({ where: { username, password } });
//     if (!foundClient) {
//       res.send("Invalid username or password");
//     } //throw new Error('Incorrect username or password');
//     res.json(foundClient);
//   } catch (error) {
//     console.log(error);
//     res.send({});
//   }
// });

app.post('/api/login', 
  function(req, res){
    var username = req.body.username;
    var password = req.body.password;

    // bcryptNodejs.hash(password, null, null, function(err, hash) {
    //   var client = new Client({ username: username, password: hash })
      
    //   var foundClient = Client.findOne({ where: { username, password }});
    //   if (!foundClient) {
    //     throw Error("Invalid username or password");
    //   }
    //   res.json(foundClient);
    //   });
    // do a hash and then just see if they're the same instead of using this shit
    let newOne = new Client({ username: username })
    let testing = function(found){
      if(Client.findOne({ where: { username, password }})) {
        console.log("This username does exist in the database");
        bcryptNodejs.compare(password, found.get('password'), function(err, res) {
          if(res){
            console.log("HELL YEAH, THIS WORKS");
            const foundClient = Client.findOne({ where: { username, password } });
            if (!foundClient) {
              console.log("THIS IS A REALLY WEIRD ERROR MAN");
            }
            res.send(foundClient);
          } else {
            console.log("LEARN TO ENTER THE CORRECT PASSWORD!!");
            res.redirect('/api/signup');
          }
        })
      } else {
        console.log("YOU DEFINITELY HAVE A BAD USERNAME");
        res.redirect('/api/signup');
      };
      if(err) {
        return error;
      }
    }
    testing();
  });

app.get('/api/issues', async (req, res) => {
  try {
    // render dashboard.html page instead of just showing the issues in JSON format
    const issues = await Issue.findAll({});
    res.json(issues);
  } catch (error) {
    console.log(error);
    res.json({});
  }
});

app.post('/api/issues', async (req, res) => {
  try {
    // const { description, type } = req.body;
    const description = req.body.description;
    const type = req.body.issue_type;
    const email = req.body.user_email;
    console.log('THIS IS MY TYPE AND YOU HAD BETTER SHOW IT!', type);
    const domain = req.headers.ref;
    const client = await Client.find({ where: { domain } });

    // client does not exist
    if (!client) () => {
      console.log('THIS IS THE DOMAIN', domain);
      throw new Error('Unauthorized domain');
    }

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
