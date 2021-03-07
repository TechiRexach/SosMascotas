const {Router} = require('express');

const User = require('../models/user');

const userRouter = new Router();

userRouter.get('/users', (req, res) => {
    return User.find({})
    .then(users => res.send(users))
})

userRouter.get('/users/:id', (req, res) => {
    const {params: {id} } = req;
    
    return User.findById(id)
    .then(user => res.send(user))
    // .catch(err => {
    //     err.send("No existe ese usuario")
    // })
})

userRouter.delete('/users/:id', (req, res) => {
    const {params: {id} } = req;

    return User.findByIdAndDelete(id)
    .then(() => res.send('El USUARIO se ha borrado correctamente'))
})

module.exports = userRouter