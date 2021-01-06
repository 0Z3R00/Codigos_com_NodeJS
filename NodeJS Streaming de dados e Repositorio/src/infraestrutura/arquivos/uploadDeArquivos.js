const fs = require('fs');
const path = require('path');

/*
fs.readFile('./src/assets/RickMorty.jpg', (erro, buffer)=>{
    console.log('Upload da imagem feita');
    
    fs.writeFile('./src/assets/RickMortySalvo.jpg', buffer, (erro) =>{
          console.log('imagem foi escrita');
    });
});


fs.createReadStream('./src/assets/RickMorty.jpg')
.pipe(fs.createWriteStream('./src/assets/RickMortyStream.jpg')).on('finish', ()=>{
    console.log('Stream da imagem finalizada');
});

*/

module.exports = (caminho, nomeArquivo, callbackImagemCriada) => {

    const tiposValidos = ['jpg', 'png', 'jpeg'];
    const tipo = path.extname(caminho)
    const tipoEhValido = tiposValidos.indexOf(tipo.substring(1)) !== -1

    if (tipoEhValido) {
        const novoCaminho = `./src/assets/img/${nomeArquivo}${tipo}`;
        fs.createReadStream(caminho)
            .pipe(fs.createWriteStream(novoCaminho))
            .on('finish', () => callbackImagemCriada(false, novoCaminho));
    }else{
        const erro = "Tipo é inválido";
        console.log('erro tipo invalido, corrige isso');
        callbackImagemCriada(erro);
    }



};