const db = require('./config/db');

db('users').select('*')
  .then(users => {
    console.log('Users:', users);
  })
  .catch(err => {
    console.error('Error:', err);
  });
