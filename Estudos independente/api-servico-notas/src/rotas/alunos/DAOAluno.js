const Modelo = require('./ModelAluno')

module.exports = {
    listar () {
        return Modelo.findAll({ raw: true })
    },
    inserir (aluno) {
        return Modelo.create(aluno)
    },
    async pegarPorId (id) {
        const encontrado = await Modelo.findOne({
            where: {
                id: id
            }
        })

        if (!encontrado) {
            console.log("achei nao")
        }

        return encontrado
    },
    atualizar (id, dadosParaAtualizar) {
        return Modelo.update(
            dadosParaAtualizar,
            {
                where: { id: id }
            }
        )
    },
    remover (id) {
        return Modelo.destroy({
            where: { id: id }
        })
    },
    async validarUsuario (senha, email) {
        const encontrado = await Modelo.findOne({
            where: {
                senha: senha,
                email : email
            }
        })

        if (!encontrado) {
            throw console.error("Achei não ");
        }

        return encontrado
    },
}