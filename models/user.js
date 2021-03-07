const {Schema, model} = require('mongoose');

//para verificar emails automaticamente
const validator = require('validator');

// const Schema = require('mongoose').Schema;

const user = new Schema({
    name: {
        type: String,
        require: true,
        //recortar espacios delante o detras del texto
        trim: true
    },
    lastname: {
        type: String,
        require: true,
        trim: true
    },
    email:{
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(email){
            if(!validator.isEmail(email)){
                throw new Error ('Email is not valid')
            }
        }
    },
    phone: {
        type: Number,
        require: true,
        trim: true,
        minlength: 9
    },
    password:{
        type: String,
        require: true,
        minlength: 4
    },
    mailAlert:{
        type: Boolean,
        require: true
    }
})

module.exports = User = model('User', user);