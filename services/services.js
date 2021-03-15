const jwt = require('jsonwebtoken');
// const moment = require('moment');
require('dotenv').config();
const {env: {SECRET_TOKEN}} = process;

function createToken(newUser){
    const payload = {
        //id del usuario
        sub: newUser._id,
        //fecha de cuando se crea el token
        iat: Date.now() / 1000,
        //fecha de caducidad del token
        // exp: moment().add(1, 'minute').unix()
    }

    return jwt.sign(payload, SECRET_TOKEN, {expiresIn: '20m'})
}

module.exports = createToken;