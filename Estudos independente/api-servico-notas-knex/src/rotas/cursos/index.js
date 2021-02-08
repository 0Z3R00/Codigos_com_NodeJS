const roteador = require('express').Router()
const dataAtual = require('../../componentes/dataAtual');
const NaoEncontrado = require('../../error/NaoEncontrado');
const Curso = require('./Curso');
const DAOCurso = require('./DAOCurso')



roteador.get('/', async (requisicao, resposta) => {
    const resultados = await DAOCurso.listar();
    filtrar(resultados);
    resposta.status(200).send(resultados);
});

roteador.get('/:idcurso', async (requisicao, resposta, proximo) => {
    try {

        const id = requisicao.params.idcurso;
        const curso = new Curso({ id: id });
        await curso.carregar();
        filtrar(curso);

        resposta.status(200).send(curso);

    } catch (error) {
        proximo(error);
    }


});

roteador.post('/', async (requisicao, resposta, proximo) => {
    try {
        const dados = requisicao.body;
        const curso = new Curso(dados);
        await curso.criar();
        resposta.status(201).send(curso);

    } catch (error) {
        proximo(error);
    }
});

roteador.put('/:idCurso', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idCurso;
        const dados = requisicao.body;
        const atualizacao = dataAtual();
        const dadosData = Object.assign({}, dados, { data_atualizacao: atualizacao });
        const dadosCurso = Object.assign({}, dadosData, { id: id });
        const curso = new Curso(dadosCurso);
        await curso.atualizar();

        resposta.status(204).end();
    } catch (error) {
        proximo(error);
    }
});

roteador.delete('/:idcurso', async (requisicao, resposta, proximo) => {
    try {

        const id = requisicao.params.idcurso;
        const curso = new Curso({ id: id });
        await curso.carregar();
        if (curso.id > 0) {
            curso.remover();
            resposta.status(204).send({
                status: `Perfil do Curso  removido com sucesso!!!`,
            });
        }else{
            throw new NaoEncontrado(curso.id);
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
        'horas',
        'preco',
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