class NaoEncontrado extends Error {
    constructor (dado) {
        super(`${dado} não foi localizado!`)
        this.name = 'NaoEncontrado'
        this.idErro = 0
    }
}

module.exports = NaoEncontrado