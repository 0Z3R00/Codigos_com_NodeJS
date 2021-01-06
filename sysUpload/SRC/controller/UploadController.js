const fs = require('fs');
const formidable = require("formidable");

function dataUpload() {
    var dataAtual = '';
    const d = new Date();
    const semana = new Array(7);
    semana[0] = "Domingo";
    semana[1] = "Segunda-Feira";
    semana[2] = "Terça-Feira";
    semana[3] = "Quarta-Feira";
    semana[4] = "Quinta-Feira";
    semana[5] = "Sexta-Feira";
    semana[6] = "Sabado";

    const diaSemana = semana[d.getUTCDay()];

    const mes = new Array(12);
    mes[0] = "janeiro"
    mes[1] = "fevereiro"
    mes[2] = "março"
    mes[3] = "abril"
    mes[4] = "maio"
    mes[5] = "junho"
    mes[6] = "julho"
    mes[7] = "agosto"
    mes[8] = "setembro"
    mes[9] = "outubro"
    mes[10] = "novembro"
    mes[11] = "dezembro"

    const mesAno = mes[d.getUTCMonth()];
    const ano = d.getUTCFullYear();
    const horario = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`

    return `dia ${d.getDate()} ${diaSemana} de ${mesAno} de ${ano}, no horario ${horario}`;
}



module.exports = {
    async index(req, res) {
        var form = new formidable.IncomingForm();
        
        form.parse(req, function (err, fields, files) {

            for (var file in files) {
                if (!files.hasOwnProperty(file)) continue;
                var oldpath = files[file].path;
                var newpath = `C:/Users/matheus.pereira/Documents/Z3R0.Eng/Novos Estudos/Estudos NODE JS/sysUpload/SRC/UPLOADS/${files[file].name}`;
                fs.renameSync(oldpath, newpath);
            }

            console.log(`Upload do arquivo ${files[file].name} foi realizado, ${dataUpload()}`)
            res.status(200).json({
                status: 'Upload realizado com sucesso!!!',
                file: files[file].name
            })
        });


        /*
                upload(req, res, (err) => {
                    console.log("Request ---", req.body);
                    console.log("Request file ---", req.file);//Here you get file.
                    
                    if(!err)
                       return res.send(200).end();
                 });
        
                 
                console.log("Request ---", req.body);
              console.log("Request file ---", req.file);//Here you get file.
             
              if(!err)
                 return res.send(200).end();
             
               const up =  await fs.createReadStream(originalFile)
                    .pipe(fs.createWriteStream(`./SRC/assets/${nameFile}.${typeFile}`)).on('finish', () => {
                        return res.send({
                            status: 'Upload realizado com sucesso.',
                            message: up,
                        })
                    }).on('erro', (error) => {
                        return res.status(400).send({
                            status: 'Upload não foi realizado.',
                            message: up,
                            error
                        })
                    });
        
        
                fs.stat(originalFile, async function (err, stat) {
                    if (err == null) {
                        const up = await fs.createReadStream(originalFile)
                            .pipe(fs.createWriteStream(`./SRC/assets/${nameFile}.${typeFile}`)).on('finish', () => {
                                return res.send({
                                    status: 'Upload realizado com sucesso.',
                                    message: up.path,
                                })
                            })
                    } else if (err.code === 'ENOENT') {
                        return res.status(400).send({
                            status: 'Upload não foi realizado.',
                            message: 'O arquivo que esta tentando realizar o upload, não existe !!!'
                        })
                    } else {
                        return res.send(err.code);
                    }
                });
        
        
        */


    }
}