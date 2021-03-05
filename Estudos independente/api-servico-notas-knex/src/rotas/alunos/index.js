const roteador = require('express').Router()
const NaoEncontrado = require('../../error/NaoEncontrado');
const Aluno = require('./Aluno');
const DAOAluno = require('./DAOAluno');
const dataAtual = require('../../componentes/dataAtual');



roteador.get('/', async (requisicao, resposta) => {
    const resultados = await DAOAluno.listar();
    filtrar(resultados);
    resposta.status(200).send(resultados);
});

roteador.get('/:idAluno', async (requisicao, resposta, proximo) => {
    try {

        const id = requisicao.params.idAluno;
        const aluno = new Aluno({ id: id });
        await aluno.carregar();
        filtrar(aluno);

        resposta.status(200).send(aluno);

    } catch (error) {
        proximo(error);
    }


});

roteador.post('/', async (requisicao, resposta, proximo) => {
    try {
        const dados = requisicao.body;
        const aluno = new Aluno(dados);
        await aluno.criar();
        resposta.status(201).send(aluno);

    } catch (error) {
        proximo(error);
    }
});

roteador.put('/:idAluno', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idAluno;
        const dados = requisicao.body;
        const atualizacao = dataAtual();
        const dadosData = Object.assign({}, dados, { data_atualizacao: atualizacao });
        const dadosAluno = Object.assign({}, dadosData, { id: id });
        const aluno = new Aluno(dadosAluno);
        await aluno.atualizar();

        resposta.status(204).end();
    } catch (error) {
        proximo(error);
    }
});

roteador.delete('/:idAluno', async (requisicao, resposta, proximo) => {
    try {

        const id = requisicao.params.idAluno;
        const aluno = new Aluno({ id: id });
        await aluno.carregar();
        if (aluno.id > 0) {
            aluno.remover();
            resposta.status(204).send({
                status: `Perfil do aluno  removido com sucesso!!!`,
            });
        }else{
            throw new NaoEncontrado(aluno.id);
        }

    } catch (error) {
        proximo(error);
    }
});




function filtrar(dados) {
    if (Array.isArray(dados)) {
        dados = dados.map(item => {
            return filtrarObjeto(item)
        })
    } else {
        dados = filtrarObjeto(dados)
    }

    return dados
}

function filtrarObjeto(dados) {
    const novoObjeto = {}
    const camposPublicos = [
        'nome',
        'cpf',
        'email',
        'senha',
        'data_criacao',
        'data_atualizacao'
    ]
    camposPublicos.forEach((campo) => {
        if (dados.hasOwnProperty(campo)) {
            novoObjeto[campo] = dados[campo]
        }
    })

    return novoObjeto
}

module.exports = roteador