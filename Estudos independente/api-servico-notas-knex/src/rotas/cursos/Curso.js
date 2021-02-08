
const dataAtual = require('../../componentes/dataAtual');
const CampoInvalido = require('../../error/CampoInvalido');
const NaoEncontrado = require('../../error/NaoEncontrado');
const DAOCurso = require('./DAOCurso');

class Curso {
    constructor({ id, nome, horas, preco, data_criacao, data_atualizacao }) {
        this.id = id;
        this.nome = nome;
        this.horas = horas;
        this.preco = preco;
        this.data_criacao = data_criacao;
        this.data_atualizacao = data_atualizacao;
    }

    async listar() {
        const result = await DAOCurso.listar();
    }

    async criar() {
        this.validar();
        const resultado = await DAOCurso.inserir({
            nome: this.nome,
            horas: this.horas,
            preco: this.preco,
        });
        this.id = resultado.id;
        this.data_criacao = resultado.data_criacao;
    }

    async carregar() {
        const result = await DAOCurso.pegarPorId(this.id);
        if (result.length > 0) {
            this.nome = result[0].nome;
            this.horas = result[0].horas;
            this.preco = result[0].preco;
            this.data_criacao = result[0].data_criacao;
            this.data_atualizacao = result[0].data_atualizacao;
        }else{
            throw new NaoEncontrado(this.id);
        }
    }

    async atualizar() {
        await DAOCurso.pegarPorId(this.id);
        const campos = ['nome', 'horas', 'preco','data_atualizacao'];
        const dadosParaAtualizar = {};

        campos.forEach((campo) => {
            const valor = this[campo]

            if (typeof valor === 'string' && valor.length > 0) {
                dadosParaAtualizar[campo] = valor

            } 
        })

        if (Object.keys(dadosParaAtualizar).length === 0) {
            throw new DadosNaoFornecidos()
        }
        await DAOCurso.atualizar(this.id, dadosParaAtualizar);


    }

    async remover() {
        return await DAOCurso.remover(this.id);
    }


    validar() {
        const campos = ['nome', 'horas', 'preco'];

        campos.forEach(campo => {
            const valor = this[campo];

            if (typeof valor !== 'string' || valor.length === 0) {
                throw new CampoInvalido(campo);

            }else if (this.nome.length <= 4) {
                throw new CampoInvalido('nome');

            } 
        })
    }

}

module.exports = Curso;