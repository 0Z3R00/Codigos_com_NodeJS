class Tabelas {
    init(conexao) {
        this.conexao = conexao;

        this.criarAtendimentos();
    }

    criarAtendimentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT,  cliente VARCHAR(50) NOT NULL, pet VARCHAR(20), servico VARCHAR(20) NOT NULL, data DATETIME NOT NULL, dataCriacao DATETIME NOT NULL,status VARCHAR(20) NOT NULL, observacoes TEXT, PRIMARY KEY(id))';


        this.conexao.query(sql, (error) => {
            if (error) {
                console.log(error);
            }else{
                console.log("Tabela de atendimento criada com sucesso !!!")
            }
        })
    }
}


module.exports = new Tabelas;