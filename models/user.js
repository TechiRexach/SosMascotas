const {Schema, model} = require('mongoose');
//para verificar emails automaticamente
const validator = require('validator');

const bcrypt = require('bcrypt');

// const Schema = require('mongoose').Schema;

const userSchema = new Schema({
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
                throw new Error ('El email no es válido')
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
        minlength: 6
    },
    mailAlert:{
        type: Boolean,
        required: true
    },
});

userSchema.pre('save', function (next){

    let user = this;

    if(user.isNew || user.isModified('password')){
       
        bcrypt.hash(user.password, 12, (err, encryptPassword) => {
            if(err){ 
                next(err)
            }
            else{
                user.password = encryptPassword;
                next()
            }
        });
    }
    else{
    next()
    }
})

module.exports = User = model('User', userSchema);