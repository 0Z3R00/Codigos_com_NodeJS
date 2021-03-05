const AtendimentosModel = require("../models/AtendimentosModel");


module.exports = app => {
    app.get('/atendimento', (request, response)=>{
        AtendimentosModel.lista(response);
    });

    app.get('/atendimento/:id', (request, response)=>{
            const id = parseInt(request.params.id);

        AtendimentosModel.buscaPorId(id, response);
    });

    app.post('/atendimento', (request, response)=>{
        const atendimento = request.body;
        AtendimentosModel.adicionar(atendimento, response);
       
    });

    app.patch('/atendimento/:id', (request, response)=>{

        const id = parseInt(request.params.id);
        const valores = request.body;

        AtendimentosModel.altera(id, valores, response);
    });

    app.delete('/atendimento/:id', (request, response)=>{
        const id = parseInt(request.params.id);
        
        AtendimentosModel.deleta(id, response);
    });
}
