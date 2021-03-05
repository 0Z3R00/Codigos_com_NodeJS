const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.listen(3000, () => console.log('API funcionado corretamente'));


app.get('/api/filmes', (req, res) =>{
    const filmes = [
        {nome: 'Matrix'},
        {nome: 'Os Vingadores'},
        {nome: 'No limite do amanha'},
        {nome: 'Viagem ao centro da terra'}
    ];

    res.status(200).send(JSON.stringify(filmes));
});


const jogosFavoritos = [];
app.get('/api/jogos', (req, res) =>{
  
    try {
    if (!req.body.nome || !req.body.plataforma) {
        throw new Error('Campos inválidos!')
      }
      jogosFavoritos.push(req.body)
      res.send(JSON.stringify(req.body))
    } catch (erro) {
    }
});