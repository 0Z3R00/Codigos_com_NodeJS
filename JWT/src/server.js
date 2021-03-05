const express = require('express');
const fs = require('fs');
const cors = require('cors');
const jwt = require('jsonwebtoken');

require("dotenv-safe").config();


const app = express();
const port = 3050;

var dados = [
    { id:0, user: 'luiz', pwd: '123' },
];

app.use(cors());
app.use(express.json());

//catch all
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({ error: error.message });
});


app.get('/', (req, res, next) => {
    res.json({ message: "Tudo ok por aqui!" });
})


app.get('/validar', verifyJWT, (req, res, next) => {
    console.log("Retornou todos clientes!");
    res.json({ status: "Parebens seu token esta devidamente autenticado e vai durar 5 minutos", id: 1, nome: 'luiz' });
})

app.post('/cadastra', (req, res, next) => {
    var nome = req.body.user;
    var senha = req.body.pwd;
    var idUsr = dados.length;
    dados.push({id: idUsr, user: nome, pwd: senha });
    console.log(dados);
    
    return res.status(201).send({
        status: 'novo usuario cadastrado com sucesso',
        user: nome,
        id: idUsr
    })
})


//rota de login
app.post('/login', (req, res, next) => {
    
    for (let index = 0; index < dados.length; index++) {
  
        if (req.body.user === dados[index].user && req.body.pwd === dados[index].pwd) {
            
            //auth ok 
            var id = dados[index].id; //esse id viria do banco de dados 
            var privateKey = fs.readFileSync('./private.key', 'utf8');
            var token = jwt.sign({ id }, privateKey, {
                expiresIn: 15000, // 5min 
                algorithm: "RS256" //SHA-256 hash signature
            });
    
            console.log("Fez login e gerou token!");
            return res.status(200).send({ auth: true, token: token });
        }
    }

    return res.status(401).send('Login inválido!');
})

app.post('/logout', function (req, res) {
    res.json({ auth: false, token: null });
})



app.listen(port, () => console.log(`Server rodando http://localhost:${port}/`));


//função que verifica se o JWT é ok
function verifyJWT(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token)
        return res.status(401).send({ auth: false, message: 'Token não informado.' });

    var publicKey = fs.readFileSync('./public.key', 'utf8');
    jwt.verify(token, publicKey, { algorithm: ["RS256"] }, function (err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Token inválido.' });

        req.userId = decoded.id;
        console.log("User Id: " + decoded.id)
        next();
    });
}