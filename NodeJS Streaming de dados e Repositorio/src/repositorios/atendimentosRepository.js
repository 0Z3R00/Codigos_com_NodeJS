const query = require('../infraestrutura/database/queries');

class AtendimentoRepository{
    adiciona(atendimento){
        const sql = 'INSERT INTO Atendimentos SET ?';
        return query(sql, atendimento);
    }

    lista(){
        const sql = 'SELECT * FROM Atendimentos';
        return query(sql); 
    }

    buscaId(id){
        const sql = `SELECT * FROM Atendimentos WHERE id =${id}`;
        return query(sql); 
    }

    excluiRegistro(id){
        const sql = 'DELETE FROM Atendimentos WHERE id=?';
        return query(sql, id);
    }

    atualiza(parametros){
        const sql =  'UPDATE Atendimentos SET ? WHERE id=?';
        return query(sql, parametros); 
    }
};

module.exports = new AtendimentoRepository();