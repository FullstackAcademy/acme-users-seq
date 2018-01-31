const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
nunjucks.configure({ noCache: true });

const db = require('./db');
const { User } = db.models;

const app = express();
app.use(require('method-override')('_method'));
app.use(require('body-parser').urlencoded());

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));

app.use((req, res, next)=> {
  res.locals.path = req.url;
  next();
});

app.get('/', (req, res, next)=> {
  User.findAll({})
    .then( users => {
      res.render('index', { users, title: 'Home' });
    })
    .catch(next);
});

app.use('/users', require('./routes/users'));

app.use((err, req, res, next)=> {
  res.render('error', { error: err, title: 'Error' });
});

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on port ${port}`));


db.sync()
  .then(()=> db.seed());
