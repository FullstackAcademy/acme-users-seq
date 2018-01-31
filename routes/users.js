const app = require('express').Router();
const models = require('../db').models;
const { User } = models;

module.exports = app;

app.get('/', (req, res, next)=> {
  User.findAll({})
    .then( users => {
      res.render('users', { users, title: 'Users' });
    })
    .catch(next);
});

app.delete('/:id', (req, res, next)=> {
  User.findById(req.params.id)
    .then( user=> user.destroy())
    .then( ()=> res.redirect('/users'))
    .catch(next);
});

app.post('/', (req, res, next)=> {
  User.create(req.body)
    .then( ()=> res.redirect('/users'))
    .catch(next);
});
