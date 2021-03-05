const ModeloTabela = require('../rotas/alunos/ModelAluno');

ModeloTabela
    .sync()
    .then(() => console.log('Tabela criada com sucesso'))
    .catch(console.log)