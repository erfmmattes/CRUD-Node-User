module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'usercliente'
    },
    migrations: {
      directory: './migrations'
    }
  }
};
