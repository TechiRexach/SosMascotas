const {Router} = require('express');

const User = require('../models/user');

const authRouter = new Router();

// crear endpoints

authRouter.post('/signup', (req, res) =>{
    
    const name = req.body.name;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
    const mailAlert = req.body.mailAlert;

    // const {body: {fullname, email, password} } = req;

    const user = new User({
        name: name,
        lastname: lastname,
        email: email,
        phone: phone,
        password: password,
        mailAlert: mailAlert
    });

    user.save()
    .then(doc => res.send(doc))
})


// authRouter.post('/login', (req, res) =>{
//     const email = req.body.email;
//     const password = req.body.password;

//     return User.find({email})
//     .then(userLogged => {
//         if(userLogged.password == password)
//         res.send('Usuario logeado')})
//     .catch((error) => {
//         res.send(error, 'Usuario sin registro, no se puede logear')})
// })

module.exports = authRouter;