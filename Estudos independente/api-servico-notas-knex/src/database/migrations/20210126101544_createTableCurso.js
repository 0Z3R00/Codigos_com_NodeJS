
exports.up = function(knex) {
    return knex.schema.createTable('cursos', function(table){
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.integer('horas').notNullable();
        table.float('preco').notNullable();
        table.string('data_criacao').notNullable();
        table.string('data_atualizacao');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('cursos');
};
