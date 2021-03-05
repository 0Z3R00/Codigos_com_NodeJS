const knex = require("../../database/connection");
const dataAtual = require("../../componentes/dataAtual");
const NaoEncontrado = require("../../error/NaoEncontrado");

module.exports = {
    async listar() {
        return await knex.select().from('alunos');
    },

    async inserir(aluno) {
        try {
            const result = await knex('alunos').insert({
                nome: aluno.nome,
                cpf: aluno.cpf,
                email: aluno.email,
                senha: aluno.senha,
                data_criacao: dataAtual()
            });

            return result;

        } catch (error) {
            throw console.error(error);
        }
    },
    async pegarPorId(id) {
        const result = await knex('alunos').where('id', id);
        if (!result) {
            throw new NaoEncontrado(id);
        } else {
            return result;
        }


    },
    async atualizar(id, dadosParaAtualizar) {
        try {
            await knex('alunos')
                .where('id', id)
                .update(dadosParaAtualizar);
            return { status: 'Atualizado com sucesso' };
        } catch (error) {
            return { status: 'Erro ao atualizar ' };
        }
    },

    async remover(id) {
        await knex('alunos').where('id', id).del();
    }
}

