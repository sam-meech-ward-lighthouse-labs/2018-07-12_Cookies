const express = require('express');
const bcrypt = require('bcrypt');

const saltRounds = 12;

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_SECRET || 'secret-string'],
}));

const database = require('./database');

app.set('view engine', 'ejs');

app.get('/', (req, res) => { 
  const userID = req.session.userId;
  const user = database[userID];
  res.render('index', {user});
});

app.post('/register', (req, res) => {
  const username = req.body.username;

  bcrypt.hash(req.body.password, saltRounds, (error, hashed) => {
    database.save(username, hashed);
  });
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  let currentUser;
  for (const id in database) {
    const user = database[id];
    if (user.username === username) {
      currentUser = user;
      break;
    }
  }

  if (!currentUser) {
    // username didn't exists
    res.send("🤷‍♀️");
    return;
  }

  bcrypt.compare(password, currentUser.password, (error, same) => {
    if (error) {
      res.send("🤷‍♂️");
      return;
    }
    if (!same) {
      res.send("🤷‍♂️");
      return;
    }
    // let's send a cookie back to the user
    req.session.userId = currentUser.id;

    res.redirect('/');
  });
  
});

app.listen(3000, () => console.log("😎"));