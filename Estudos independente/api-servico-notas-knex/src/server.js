const express = require('express');
const bodyParser = require('body-parser');
const roteadorAluno = require('./rotas/alunos');
const roteadorCurso = require('./rotas/cursos');
const CampoInvalido = require('./error/CampoInvalido');
const NaoEncontrado = require('./error/NaoEncontrado');

const app = express();
app.use(bodyParser.json());
const port = 3005;

app.use('/api/alunos', roteadorAluno);
app.use('/api/cursos', roteadorCurso);
app.use((erro, requisicao, resposta, proximo) => {
    let status = 500

    if (erro instanceof CampoInvalido || erro instanceof NaoEncontrado ) {
        status = 400
    }


    resposta.status(status);
    resposta.send({
            status_requisição: erro.message,
            }
        )
})

app.listen(port, () => {
    console.log(`A API está sendo executada na url http://localhost:${port}/`);
});