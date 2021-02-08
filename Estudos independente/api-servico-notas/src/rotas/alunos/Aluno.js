const CampoInvalido = require('../../erros/CampoInvalido');
const TDAOAluno = require('./DAOAluno');

class Aluno {
    constructor ({ id, nome, curso, cpf, email, senha, dataCriacao, dataAtualizacao, versao }) {
        this.id = id;
        this.nome = nome;
        this.curso = curso;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
        this.dataCriacao = dataCriacao;
        this.dataAtualizacao = dataAtualizacao;
        this.versao = versao;
    }

    async criar () {
       this.validar ();
        const resultado = await TDAOAluno.inserir({
            nome: this.nome,
            curso: this.curso,
            cpf: this.cpf,
            senha: this.senha,
            email: this.email
        })

        this.id = resultado.id
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }

    async carregar () {
        const encontrado = await TDAOAluno.pegarPorId(this.id);
        this.nome = encontrado.nome;
        this.curso = encontrado.curso;
        this.cpf = encontrado.cpf;
        this.email = encontrado.email;
        this.senha = encontrado.senha;
        this.dataCriacao = encontrado.dataCriacao;
        this.dataAtualizacao = encontrado.dataAtualizacao;
        this.versao = encontrado.versao;
    }

    async atualizar () {
        await TDAOAluno.pegarPorId(this.id);
        const campos = ['nome', 'curso', 'cpf', 'email', 'senha'];
        const dadosParaAtualizar = {};

        campos.forEach((campo) => {
            const valor = this[campo]

            if (typeof valor === 'string' && valor.length > 0) {
                dadosParaAtualizar[campo] = valor
            }
        })

        

        await TDAOAluno.atualizar(this.id, dadosParaAtualizar)
    }

    remover () {
        return TDAOAluno.remover(this.id)
    }

    validar () {
        const campos = ['nome', 'curso', 'cpf', 'email', 'senha']
        if(this['cpf'].length == 11){
            campos.forEach(campo => {
                const valor = this[campo]
                if (typeof valor !== 'string' || valor.length === 0) {
                    throw new CampoInvalido(campo)
                }
            })
        }else{
            throw console.error("dados errados por favor corriga isso");
        }


    }
}

module.exports = Aluno;