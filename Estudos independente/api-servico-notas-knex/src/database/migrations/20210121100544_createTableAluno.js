
exports.up = function(knex) {
    return knex.schema.createTable('alunos', function(table){
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('cpf').notNullable();
        table.string('email').notNullable();
        table.string('senha').notNullable();
        table.string('data_criacao').notNullable();
        table.string('data_atualizacao');
    });
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('alunos');
};
