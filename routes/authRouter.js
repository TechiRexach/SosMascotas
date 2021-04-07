const {Router} = require('express');
const authRouter = new Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const createToken = require('../services/services');
const {validatedNewUser, validatedLoginUser} = require('../services/validators');

//POST: REGISTRO USUARIO NUEVO

//CREAR USUARIO CON CONTRASEÑA ENCRIPTADA DESDE USER.MODEL
authRouter.post('/signup', async (req, res) => {

    const name = req.body.name;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;

    try {

        validatedNewUser(email, password, name, lastname, phone)

        const user = new User({
            name: name,
            lastname: lastname,
            email: email,
            phone: phone,
            password: password
        });

        const emailRegistered = await User.findOne({email: req.body.email});
        if(emailRegistered){
            return res.status(401).send("Este email ya está registrado");
        }

        const phoneRegistered = await User.findOne({phone: req.body.phone});
        if(phoneRegistered){
            return res.status(401).send("Este teléfono ya está registrado");
        }

        user.save()
        .then(newUser => {
            return res.status(200).send({message: `Gracias por registrarte ${user.name}. Por favor, espera mientras creamos tu perfil...`, token: createToken(newUser)});
        })
        
    }

    catch (error){
        return res.status(400).send(error.message);
    };
});

// POST: REALIZAR LOGIN DE USUARIO YA REGISTRADO
//ASYNC / AWAIT

authRouter.post('/login', async (req, res) =>{

    const email = req.body.email;
    const password = req.body.password;

    try {
    
        validatedLoginUser(email, password)

        const user = await User.findOne({email: req.body.email});

        if(!user){
        return res.status(401).send('Email no registrado');
        };

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if(!validPassword){
            return res.status(401).send('Contraseña invalida');
        }
            
        return  res.status(200).send({message: `${user.name}, ¡bienvenid@ de nuevo! Espera mientras te redirigimos a tu perfil...`, token: createToken(user)});
    }
    catch (error){
       return res.status(400).send(error.message)
    };
});

module.exports = authRouter;
