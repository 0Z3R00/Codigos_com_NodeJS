const moment = require('moment');
const conexao = require('../infraestrutura/conexao');

class AtendimentoModel {
    adicionar(atendimento, response) {

        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteEhValido = atendimento.cliente.length >= 5;

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Nome do cliente deve ter pelo menos cinco caracteres'
            }
        ];

        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;


        if (existemErros) {
            response.status(400).json(erros);
        } else {

            const atendimentoDatado = { ...atendimento, dataCriacao, data };
            const sql = 'INSERT INTO Atendimentos SET ?';

            conexao.query(sql, atendimentoDatado, (erro, resultado) => {
                if (erro) {
                    response.status(400).json({ status: "não foi possivel atender sua requisição reveja os dados enviados" });
                } else {
                    response.status(201).json(atendimento)
                }
            });
        }

    }

    lista(response) {
        const sql = 'SELECT * FROM Atendimentos';

        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                response.status(400).json(erro);
            } else {
                response.status(200).json(resultados);
            };

        });
    }

    buscaPorId(id, response) {
        const sql = `SELECT * FROM Atendimentos WHERE id =${id}`;

        conexao.query(sql, (erro, resultados) => {
            const atendimento = resultados[0]
            if (erro) {
                response.status(400).json(erro);
            } else {
                response.status(200).json(atendimento);
            };

        });
    }


    altera(id, valores, response) {
        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        }
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?';



        conexao.query(sql, [valores, id], (erro, resultado) => {

            if (erro) {
                response.status(400).json(erro);
            } else {
                response.status(200).json({...valores, id});
            };
        });


    }

    deleta(id, response) {
        
        const sql = 'DELETE FROM Atendimentos WHERE id=?';

        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                response.status(400).json(erro);
            } else {
                response.status(200).json({id});
            };
        });

    }

}


module.exports = new AtendimentoModel;