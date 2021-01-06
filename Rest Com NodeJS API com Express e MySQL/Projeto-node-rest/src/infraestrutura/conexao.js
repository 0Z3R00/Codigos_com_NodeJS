const mysql = require ('mysql');

const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'm0ur4z3r0',
    database: 'agendaPetshop',
    insecureAuth : true
})

module.exports = conexao;