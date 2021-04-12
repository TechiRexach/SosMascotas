const jwt = require('jsonwebtoken');
require('dotenv').config();
const {env: {SECRET_TOKEN}} = process;

function isAuth (req, res, next){

    const token = req.headers["authorization"]

    if(!token){
        return res.status(401).send("Vuelve a identificarte, por favor.")
    }

    jwt.verify(token.split(" ")[1], SECRET_TOKEN, (err, decode) => {
        if(err){
            return res.status(401).send("Vuelve a identificarte, por favor.");
        } else {
            req.user = decode;
            next()
        }
    })
}

module.exports = isAuth;