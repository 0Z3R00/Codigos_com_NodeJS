const AtendimentosModel = require("../models/AtendimentosModel");


module.exports = app => {
    app.get('/atendimento', (request, response) => {
        AtendimentosModel.lista().then(resultados => {
            //se não tiver o status(200) por padrao ele ja manda como 200
            response.status(200).json(resultados);
        }).catch(erros => {
            response.status(400).json(erros);
        });
    });

    app.get('/atendimento/:id', (request, response) => {
        const id = parseInt(request.params.id);

        AtendimentosModel.buscaPorId(id).then(atendimento => {
            response.status(200).json(atendimento);
        }).catch(erros => {
            response.status(400).json(erros);
        });
    });

    app.post('/atendimento', (request, response) => {
        const atendimento = request.body;
        AtendimentosModel.adicionar(atendimento).then(atendimentoCadastrado => {
            response.status(201).json(atendimentoCadastrado);
        }).catch(erros => {
            response.status(400).json(erros);
        });
    });

    app.patch('/atendimento/:id', (request, response) => {

        const id = parseInt(request.params.id);
        const valores = request.body;

        AtendimentosModel.altera(id, valores).then(atualizaAtendimento => {
            response.status(200).json(atualizaAtendimento);
        }).catch(erros => {
            response.status(200).json(erros);
        });
    });

    app.delete('/atendimento/:id', (request, response) => {
        const id = parseInt(request.params.id);

        AtendimentosModel.deleta(id).then(exclucao => {
            response.status(200).json({ status: `o registro com o id: ${id}, foi excluido da base.` })
        }).catch(erros => {
            response.status(400).json(erros);
        });
    });
}
