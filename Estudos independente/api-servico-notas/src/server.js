const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const roteadorAluno = require('./rotas/alunos');
const roteadorPerfil = require('./rotas/Perfil');

const CampoInvalido = require('./erros/CampoInvalido');

const app = express();

app.use(bodyParser.json());
app.use('/api/alunos', roteadorAluno);
app.use('/api/perfil', roteadorPerfil);
app.use((erro, req, res, proximo) =>{

    let status = 500;

    if (erro instanceof CampoInvalido) {
        status = 400
    }

    res.status(status)
    res.send({
            mensagem: erro.message,
            id: erro.idErro
        })
});

app.listen(config.get('api.porta'), () => console.log(`A API está funcionando! na url http://localhost:${config.get('api.porta')}/`))