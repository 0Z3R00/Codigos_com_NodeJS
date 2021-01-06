const Pet = require('../models/PetsModel');

module.exports = app => {
    app.post('/pet', (request, response) => {
        const pet = request.body;

        Pet.adiciona(pet, response);
    });
};