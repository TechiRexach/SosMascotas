const {Router} = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const createToken = require('../services/services');

const authRouter = new Router();

//POST: REGISTRO USUARIO NUEVO

//CREAR USUARIO CON CONTRASEÑA ENCRIPTADA DESDE USER.MODEL
authRouter.post('/signup', (req, res) => {

    const name = req.body.name;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
    const mailAlert = req.body.mailAlert;

    if(password.length < 6){
        res.send('La contraseña debe tener al menos 6 caracteres')
    }
    if(name.length == 0){
        res.status(400).send('Completa el campo Nombre, por favor')
    }
    if(lastname.length == 0){
        res.send('Completa el campo Apellido, por favor')
    }
    if(phone.length < 9){
        res.send('Por favor, revisa el número de teléfono. Debe tener al menos 9 caracteres')
    }

    const user = new User({
        name: name,
        lastname: lastname,
        email: email,
        phone: phone,
        password: password,
        mailAlert: mailAlert
    });

    user.save()
    .then(newUser => {
        res.status(200).send({token: createToken(newUser)})
        console.log(newUser)
    })
});

//CREAR USUARIO CON CONTRASEÑA ENCRIPTADA DESDE AUTHROUTER
// authRouter.post('/signup', async (req, res) =>{
    
//     const name = req.body.name;
//     const lastname = req.body.lastname;
//     const email = req.body.email;
//     const phone = req.body.phone;
//     const password = await bcrytp.hash(req.body.password, 12);
//     const mailAlert = req.body.mailAlert;

//     if(password.length < 6){
//         res.send('La contraseña debe tener al menos 6 caracteres')
//     }

//     const user = new User({
//         name: name,
//         lastname: lastname,
//         email: email,
//         phone: phone,
//         password: password,
//         mailAlert: mailAlert
//     });
//     console.log(user)
//     user.save()

//     .then(res.send('Usuario registrado correctamente'))
// });


// POST: REALIZAR LOGIN DE USUARIO YA REGISTRADO
//ASYNC / AWAIT

authRouter.post('/login', async (req, res) =>{
    // const body = req.body;
    const user = await User.findOne({email: req.body.email});

    if(!user){
       return res.status(401).send('Email no valido')
    };

   const validPassword = await bcrypt.compare(req.body.password, user.password);

    if(!validPassword){
        return res.status(401).send('Contraseña invalida')
    }
           
    return  res.status(200).send({token: createToken(user)}) 

});

// POST: REALIZAR LOGIN DE USUARIO YA REGISTRADO
//.THEN

// authRouter.post('/login', (req, res) =>{
//     // const body = req.body;
//     User.findOne({email: req.body.email}).then(user => {

//         if(!user){
//             return res.status(401).send('Email no valido')
//         }
//         bcrypt.compare(req.body.password, user.password).then(validPassword => {
//             if(validPassword){
//                 res.status(200).send('Contraseña correcta')
//             }
//             else{
//                 res.status(401).send('Contraseña invalida')
//             }
//         })
//     })
// });


module.exports = authRouter;