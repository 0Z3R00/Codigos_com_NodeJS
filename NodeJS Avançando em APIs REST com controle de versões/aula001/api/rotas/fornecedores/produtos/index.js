const roteador = require('express').Router({ mergeParams: true });
const Tabela = require('./TabelaProduto');
const Produto = require('./Produto');
const Serializador = require('../../../Serializador').SerializadorProduto;



roteador.options('/', async (requisicao, resposta) => {
    resposta.set('Access-Control-Allow-Methods', 'GET, POST ');
    resposta.set('Access-Control-Allow-Headers', 'content-type');
    resposta.status(204);
    resposta.end();
});

roteador.get('/', async (requisicao, resposta) => {
    //const id = requisicao.params.idFornecedor;
    //const produtos = await Tabela.listar(id);
    const serializador = new Serializador(resposta.getHeader('Content-Type'));
    const produto = await Tabela.listar(requisicao.fornecedor.id);
    resposta.send(
        serializador.serializar(produto)
    );
});


roteador.post('/', async (requisicao, resposta, proximo) => {
    try {
        const idFornecedor = requisicao.fornecedor.id;
        const corpo = requisicao.body;
        const dados = Object.assign({}, corpo, { fornecedor: idFornecedor });
        const produto = new Produto(dados);
        await produto.criar();
        const serializador = new Serializador(
            resposta.getHeader('Content-Type')
        );
        resposta.set('ETag', produto.versao);
        const timestamp = (new Date(produto.dataAtualizacao)).getTime();
        resposta.set('Last-Modified', timestamp);
        resposta.set('Location', `/api/fornecedores/${produto.fornecedor}/produtos/${produto.id}`);
        resposta.status(201).send(
            serializador.serializar(produto)
        );
    } catch (error) {
        proximo(error);
    }

});


roteador.options('/:id', async (requisicao, resposta) => {
    resposta.set('Access-Control-Allow-Methods', 'GET, DELETE, HEAD, PUT ');
    resposta.set('Access-Control-Allow-Headers', 'content-type');
    resposta.status(204);
    resposta.end();
});

roteador.delete('/:id', async (requisicao, resposta) => {
    const dados = {
        id: requisicao.params.id,
        fornecedor: requisicao.fornecedor.id
    };

    const produto = new Produto(dados);
    await produto.apagar();

    resposta.status(204).end();
});


roteador.get('/:id', async (requisicao, resposta, proximo) => {
    try {
        const dados = {
            id: requisicao.params.id,
            fornecedor: requisicao.fornecedor.id
        };

        const produto = new Produto(dados);
        await produto.carregar();
        const serializador = new Serializador(
            resposta.getHeader('Content-Type'),
            ['preco', 'estoque', 'fornecedor', 'dataCriacao', 'dataAtualizacao', 'versao']
        );
        resposta.set('ETag', produto.versao);
        const timestamp = (new Date(produto.dataAtualizacao)).getTime();
        resposta.set('Last-Modified', timestamp);
        resposta.send(
            serializador.serializar(produto)
        );
    } catch (error) {
        proximo(error);
    }
});

roteador.head('/:id', async (requisicao,resposta, proximo)=>{
    try {
        const dados = {
            id: requisicao.params.id,
            fornecedor: requisicao.fornecedor.id
        };
        const produto = new Produto(dados);
        await produto.carregar();
        resposta.set('ETag', produto.versao);
        const timestamp = (new Date(produto.dataAtualizacao)).getTime();
        resposta.set('Last-Modified', timestamp);
        resposta.status(200);
        resposta.end();
    } catch (error) {
        proximo(error);
    }
});

roteador.put('/:id', async (requisicao, resposta, proximo) => {
    try {
        const dados = Object.assign(
            {},
            requisicao.body,
            {
                id: requisicao.params.id,
                fornecedor: requisicao.fornecedor.id
            }
        );

        const produto = new Produto(dados);
        await produto.atualizar();
        await produto.carregar();
        resposta.set('ETag', produto.versao);
        const timestamp = (new Date(produto.dataAtualizacao)).getTime();
        resposta.set('Last-Modified', timestamp);
        resposta.status(204).end();

    } catch (error) {
        proximo(error);
    }
});


roteador.options('/:id/diminuir-estoque', async (requisicao, resposta) => {
    resposta.set('Access-Control-Allow-Methods', 'POST');
    resposta.set('Access-Control-Allow-Headers', 'content-type');
    resposta.status(204);
    resposta.end();
});


roteador.post('/:id/diminuir-estoque', async (requisicao, resposta, proximo) => {
    try {
        const produto = new Produto({
            id: requisicao.params.id,
            fornecedor: requisicao.fornecedor.id
        });

        await produto.carregar();
        produto.estoque = produto.estoque - requisicao.body.quantidade;
        await produto.diminuirEstoque();
        await produto.carregar();
        resposta.set('ETag', produto.versao);
        const timestamp = (new Date(produto.dataAtualizacao)).getTime();
        resposta.set('Last-Modified', timestamp);
        resposta.status(204).end();
    } catch (error) {
        proximo(error);
    }

});





module.exports = roteador;