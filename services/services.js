const jwt = require('jsonwebtoken');
const moment = require('moment');
require('dotenv').config();

function createToken(newUser){
    const payload = {
        //id del usuario
        sub: newUser._id,
        //fecha de cuando se crea el token
        iat: moment().unix(),
        //fecha de caducidad del token
        // exp: moment().add(1, 'minute').unix()
    }

    return jwt.sign(payload, 'SECRET_TOKEN', {expiresIn: '1h'})
}

module.exports = createToken;