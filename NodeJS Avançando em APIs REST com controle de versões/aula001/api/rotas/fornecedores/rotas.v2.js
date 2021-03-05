const roteador = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor');
const Fornecedor = require('./Fornecedor');
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor;



roteador.options('/', async (requisicao, resposta) => {
    resposta.set('Access-Control-Allow-Methods', 'GET');
    resposta.set('Access-Control-Allow-Headers', 'content-type');
    resposta.status(204);
    resposta.end();
});

roteador.get('/', async (requisicao, resposta) => {
    const resultados = await TabelaFornecedor.listar();

    resposta.status(200)
    const serializador = new SerializadorFornecedor(
        resposta.getHeader('Content-Type'),['categoria']
    )
    resposta.send(
        serializador.serializar(resultados)
    )
})


module.exports = roteador;