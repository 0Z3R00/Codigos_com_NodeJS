const roteador = require('express').Router()
const DAOAluno = require('./DAOAluno')
const Aluno = require('./Aluno');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const { verifyJWT } = require('../../funcoes/verifyJWT');

roteador.get('/', async (requisicao, resposta) => {
    const resultados = await DAOAluno.listar();
    resposta.status(200).send(resultados);
})

roteador.post('/', async (requisicao, resposta, proximo) => {
    try {
        const dadosRecebidos = requisicao.body
        const aluno = new Aluno(dadosRecebidos);
        await aluno.criar();
        resposta.status(201).send(aluno);

    } catch (erro) {
        proximo(erro);
    }
})

roteador.post('/:idAluno/login', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idAluno;
        const { email, senha } = requisicao.body;
        const aluno = new Aluno({ id: id });
        await aluno.carregar();
        console.log(aluno.senha, aluno.email);
        if (aluno.email === email) {
            if (aluno.senha === senha) {
                //auth ok                    
                var privateKey = fs.readFileSync('./private.key', 'utf8');
                var token = jwt.sign({ id }, privateKey, {
                    expiresIn: 5000,
                    algorithm: "RS256"
                });
                resposta.status(200).send({ aluno, status: "login aceito", auth: true, token: token });

            } else {
                resposta.status(401).send({ status: "Credenciais não validas" });
            }
        } else {
            resposta.status(401).send({ status: "login incorreto" });
        }
    } catch (erro) {
        proximo(erro);
    }
});



roteador.get('/:idAluno', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idAluno;
        const aluno = new Aluno({ id: id });
        await aluno.carregar();
        resposta.status(200).send(aluno);
    } catch (erro) {
        proximo(erro);
    }
})

roteador.put('/:idAluno', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idAluno
        const dadosRecebidos = requisicao.body
        const dados = Object.assign({}, dadosRecebidos, { id: id })
        const aluno = new Aluno(dados)
        await aluno.atualizar()
        resposta.status(204).end();
    } catch (erro) {
        proximo(erro);
    }
})

roteador.delete('/:idAluno', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idAluno
        const aluno = new Aluno({ id: id })
        await aluno.carregar()
        await aluno.remover()
        resposta.status(204)
        resposta.end()
    } catch (erro) {
        proximo(erro);
    }
})


module.exports = roteador