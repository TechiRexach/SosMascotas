const {Router} = require('express');
const userRouter = new Router();
const User = require('../models/user');
const isAuth = require('../services/middlewareIsAuth');
const {validatedId, validatedPassword} = require('../services/validators');

//GET: VER TODOS LOS USUARIOS
userRouter.get('/', (req, res) => {
    return User.find({})
    .then(users => {
        return res.status(200).send(users)
    });
});

//GET: VER UN USUARIO SEGÚN SU ID.
userRouter.get('/myprofile/:id', isAuth, (req, res) => {
    const {params: {id} } = req;

    User.findById(id, (err, user) => {
        if (err){
            return res.status(404).send('Esta id de usuario no existe');
        };
        if(id != req.user.sub){
            return res.status(404).send('No es tu perfil')
        }
        return res.status(200).send({message: `¡Hola ${user.name}!`, user});
    });
});

//PUT: ACTUALIZAR CONTRASEÑA
userRouter.put('/password/:id', isAuth, (req, res) => {
    const { params: {id} } = req;

    let password = req.body.password;

    try{
        validatedId(id);
        validatedPassword(password);

        User.findById(id, (err,  user) => {

            if(err){
                return res.status(404).send("Error al modificar la contraseña");
            };

            user.password = password;

            user.save()
            .then((userUpdated) => {
                return res.status(200).send({message: "Contraseña actualizada", userUpdated});
            });
        });
    }
    catch (error){
        return res.status(400).send(error.message);
    };
});

//DELETE: ELIMINAR UN USUARIO SEGÚN SU ID
userRouter.delete('/:id', isAuth, (req, res) => {
    const {params: {id} } = req;

    try{
        validatedId(id);

        if(id != req.user.sub){
            return res.status(401).send("No puedes borrar otro usuario que no seas tu");
        };

        return User.findByIdAndDelete(id, (err) => {
            if(err){
                res.status(500).send("El usuario no ha podido ser eliminado");
            };
        })
        .then(() => res.send('Tu cuenta se ha borrado correctamente'));
    }
    catch (error){
        return res.status(400).send(error.message);
    };
});

module.exports = userRouter;
