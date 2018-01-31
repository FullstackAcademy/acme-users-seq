const Sequelize = require('sequelize');

const _conn = new Sequelize(process.env.DATABASE_URL);

const User = _conn.define('user', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});


const userNames = [
  'moe',
  'larry',
  'curly'
];

const sync = ()=> {
  return _conn.sync({ force: true });
};

const seedUsers = ()=> {
  return Promise.all(userNames.map( name => User.create({ name })));
};

const seed = ()=> {
  return seedUsers();
};

module.exports = {
  models: {
    User
  },
  sync,
  seed
};
