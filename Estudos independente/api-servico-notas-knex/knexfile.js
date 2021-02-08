
  module.exports = {
    development: {
      client: 'mysql',
      connection: {
        host : 'localhost',
        user : 'root',
        password : 'root',
        database : 'cursosalunos',
        port: 3306
      },
      migrations:{
        directory: './src/database/migrations'
      }
    }
  };
  