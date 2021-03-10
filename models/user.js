const {Schema, model} = require('mongoose');
//para verificar emails automaticamente
const validator = require('validator');

// const Schema = require('mongoose').Schema;

const user = new Schema({
    name: {
        type: String,
        required: true,
        //recortar espacios delante o detras del texto
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(email){
            if(!validator.isEmail(email)){
                throw new Error ('Email is not valid')
            };
        }
    },
    phone: {
        type: Number,
        required: true,
        trim: true,
        unique: true,
        minlength: 9
    },
    password:{
        type: String,
        required: true,
        minlength: 4
    },
    mailAlert:{
        type: Boolean,
        required: true
    }
});

module.exports = User = model('User', user);