const roteador = require('express').Router()
const { verifyJWT } = require('../../funcoes/verifyJWT');
const Aluno = require('../alunos/Aluno');

roteador.post('/login', verifyJWT, async (requisicao, resposta) => {
    const {id } = requisicao.body;
    
    const aluno = new Aluno({ id: id });
    await aluno.carregar();
    resposta.status(200).send({ 
        status: "Parebens seu token esta devidamente autenticado", 
        id: aluno.id, 
        nome: aluno.nome,
        email: aluno.email 
    });
});

roteador.get('/logout',  async (requisicao, resposta) => {
    resposta.status(200).send({auth: false, token: null });
});


module.exports = roteador;