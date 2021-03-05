const moment = require('moment');
const conexao = require('../infraestrutura/database/conexao');
const atendimentosRepository = require('../repositorios/atendimentosRepository');
const repositorio = require('../repositorios/atendimentosRepository');

class AtendimentoModel {
    constructor() {
        this.validacoes = [
            {
                nome: 'data',
                valido: this.dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: this.clienteEhValido,
                mensagem: 'Nome do cliente deve ter pelo menos cinco caracteres'
            }
        ];


        this.dataEhValida = (data, dataCriacao) => {
            moment(data).isSameOrAfter(dataCriacao);
        }

        this.clienteEhValido = (tamanho) => {
            tamanho.length >= 5;
        };

        this.valida = (parametros) => {
            this.validacoes.filter(campo => {
                const { nome } = campo;
                const parametro = parametros[nome];

                return !campo.valido(parametro);
            })
        }
    }


    adicionar(atendimento) {

        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

        const parametros = {
            data: { data, dataCriacao },
            cliente: { tamanho: atendimento.cliente.length }
        }

        const erros = this.valida(parametros);
        const existemErros = erros.length;


        if (existemErros) {
            return new Promise((resolve, reject) => {
                reject(erros);
            });

        } else {

            const atendimentoDatado = { ...atendimento, dataCriacao, data };

            return repositorio.adiciona(atendimentoDatado)
                .then(resultados => {
                    const id = resultados.insertId;
                    return { ...atendimento, id }
                });
        }

    }

    lista() {
        return atendimentosRepository.lista();
    }

    buscaPorId(id) {
        return atendimentosRepository.buscaId(id);
    }


    altera(id, valores) {
        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        }
        const parametro = [valores, id]
     
        return atendimentosRepository.atualiza(parametro);
    }



    deleta(id) {
        return atendimentosRepository.excluiRegistro(id);
    }

}


module.exports = new AtendimentoModel;