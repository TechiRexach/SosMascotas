const {Router} = require('express');

const User = require('../models/user');

const bcrypt = require('bcrypt');
const isAuth = require('../middleware')

const userRouter = new Router();

//GET: VER TODOS LOS USUARIOS
userRouter.get('/', (req, res) => {
    return User.find({})
    .then(users => res.send(users))
});

//GET: VER UN USUARIO SEGÚN SU ID
userRouter.get('/:id', isAuth, (req, res) => {
    const {params: {id} } = req;

    User.findById(id, (err, user) => {
        if (err){
            res.sendStatus(404)
        };
        res.json(user)
    });
});

//PUT: ACTUALIZAR INFORMACIÓN DE UN USUARIO SEGÚN SU ID
// userRouter.put('/users/:id', (req, res) => {
//     const { params: {id} } = req;
//     let bodyUpdated = req.body;

//     User.findByIdAndUpdate(id, bodyUpdated, (err, userUpdate) => {
//         if(err) {
//             res.status(500).send(`El usuario no ha sido actualizado: ${err}`)
//         };
//         res.status(200).send(userUpdate)
//     });
// });

//DELETE: ELIMINAR UN USUARIO SEGÚN SU ID
userRouter.delete('/:id', (req, res) => {
    const {params: {id} } = req;

    return User.findByIdAndDelete(id, (err) => {
        if(err){
            res.status(500).send(`El usuario no ha sido eliminado correctamente: ${err}`)
        };
    })
    .then(() => res.send('El USUARIO se ha borrado correctamente'))
});

//GET: VER USUARIOS BUSCADOS POR NOMBRE
// userRouter.get('/user/:name', (req, res) => {

//     User.find({name: req.params.name}, (err, users) => {
       
//         if(users.length == 0) {
        
//          return res.send("This user name doesn't exist");
//         }

//         res.json(users)
//     });
// });


//PUT: ACTUALIZAR CONTRASEÑA
userRouter.put('/password/:id', (req, res) => {
    const { params: {id} } = req;

    User.findById(id, (err,  user) => {

        if(err){
            res.status(404).send("Usuario no encontrado")
            return
        }
        user.password = req.body.password;
        user.save()
        .then((userUpdated) => {
            return res.status(200).send(userUpdated)
                   
            })
        
    })
})


module.exports = userRouter;