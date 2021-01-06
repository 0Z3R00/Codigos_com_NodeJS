
const conexao = require('../infraestrutura/database/conexao');
const uploadDeArquivo = require('../infraestrutura/arquivos/uploadDeArquivos');

class Pet {
    adiciona(pet, response) {
        const sql = 'INSERT INTO Pets SET?';

        uploadDeArquivo(pet.imagem, pet.nome, (erro, novoCaminho) => {
            if (erro) {
              response.status(400).json({ erro });
            } else {
                const novoPet = { nome: pet.nome, imagem: novoCaminho };

                conexao.query(sql, novoPet, (erro) => {
                    if (erro) {
                        console.log(erro);
                        response.status(400).json(erro);
                    } else {
                        response.status(201).json(novoPet);
                    }
                });

            }


        });

    }
}

module.exports = new Pet();