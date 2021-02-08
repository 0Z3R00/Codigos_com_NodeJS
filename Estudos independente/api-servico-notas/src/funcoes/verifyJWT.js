const fs = require('fs');
const jwt = require('jsonwebtoken');

exports.verifyJWT = function (req, res, next) {
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

