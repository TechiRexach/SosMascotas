const {Router} = require('express');

const User = require('../models/user');

const userRouter = new Router();

userRouter.get('/users', (req, res) => {
    return User.find({})
    .then(users => res.send(users))
});

userRouter.get('/users/:id', (req, res) => {
    const {params: {id} } = req;
    
    User.findById(id, (err, user) => {
        if (err){
            res.send("El usuario no existe")
        }
        res.json(user)
    })
    
    // .then(user => res.send(user))
});

userRouter.put('/users/:id', (req, res) => {
    const { params: {id} } = req;
    let bodyUpdated = req.body;

    User.findByIdAndUpdate(id, bodyUpdated, (err, userUpdate) => {
        if(err) {
            res.status(500).send(`El usuario no ha sido actualizado: ${err}`)
        }
        res.status(200).send(userUpdate)
    }) 
})

userRouter.delete('/users/:id', (req, res) => {
    const {params: {id} } = req;

    return User.findByIdAndDelete(id)
    .then(() => res.send('El USUARIO se ha borrado correctamente'))
});

module.exports = userRouter;


// userRouter.get('/user/:name', (req, res) => {

//     User.find({name: req.params.name}, (err, users) => {
//         // if(err) {
//         //     return res.status(400).send(err.message);
//         // }
//         if(users.length == 0) {
        
//          return res.send("This user name doesn't exist");
//         }
//         res.json(users)
//     });
// });