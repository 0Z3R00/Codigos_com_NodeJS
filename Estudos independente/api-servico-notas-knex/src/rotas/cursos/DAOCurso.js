const knex = require("../../database/connection");
const dataAtual = require("../../componentes/dataAtual");
const NaoEncontrado = require("../../error/NaoEncontrado");

module.exports = {
    async listar() {
        return await knex.select().from('cursos');
    },

    async inserir(curso) {
        try {
            const result = await knex('cursos').insert({
                nome: curso.nome,
                horas: curso.horas,
                preco: curso.preco,
                data_criacao: dataAtual()
            });

            return result;

        } catch (error) {
            throw console.error(error);
        }
    },
    async pegarPorId(id) {
        const result = await knex('cursos').where('id', id);
        if (!result) {
            throw new NaoEncontrado(id);
        } else {
            return result;
        }


    },
    async atualizar(id, dadosParaAtualizar) {
        try {
            await knex('cursos')
                .where('id', id)
                .update(dadosParaAtualizar);
            return { status: 'Atualizado com sucesso' };
        } catch (error) {
            return { status: 'Erro ao atualizar ' };
        }
    },

    async remover(id) {
        await knex('cursos').where('id', id).del();
    }
}

