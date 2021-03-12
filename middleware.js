const { response } = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// const createToken = require('./services');

function isAuth (req, res, next){

    const token = req.headers["authorization"]
    console.log(req.headers)

    if(!token){
        return res.status(403).send("No tienes autorización")
    }

    const decode = jwt.verify(token.split(" ")[1], 'SECRET_TOKEN')
    console.log(decode)


    if(decode.expiresIn < Date.now()){
     return res.status(401).send("El token ha expirado")
    }

    req.user = decode;
    next()
}

module.exports = isAuth;