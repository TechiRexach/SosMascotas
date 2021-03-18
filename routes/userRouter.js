const {Router} = require('express');
const userRouter = new Router();
const User = require('../models/user');
const isAuth = require('../services/middlewareIsAuth');
const {validatedId, validatedPassword} = require('../services/validators');

//GET: VER TODOS LOS USUARIOS
userRouter.get('/', (req, res) => {
    return User.find({})
    .then(users => res.send(users));
});

//GET: VER UN USUARIO SEGÚN SU ID.
userRouter.get('/:id', isAuth, (req, res) => {
    const {params: {id} } = req;
    
    validatedId(id);

    User.findById(id, (err, user) => {
        if (err){
            res.status(404).send('Esta id de usuario no existe');
        };
        res.json(user);
    });
});

//PUT: ACTUALIZAR CONTRASEÑA
userRouter.put('/password/:id', isAuth, (req, res) => {
    const { params: {id} } = req;

    let password = req.body.password;

    validatedId(id);
    validatedPassword(password);

    User.findById(id, (err,  user) => {

        if(err){
            return res.status(404).send("Error al modificar la contraseña");
        };

        user.password = password;

        user.save()
        .then((userUpdated) => {
            return res.status(200).send(userUpdated);
         });
    });
});

//DELETE: ELIMINAR UN USUARIO SEGÚN SU ID
userRouter.delete('/:id', isAuth, (req, res) => {
    const {params: {id} } = req;

    validatedId(id);

    if(id != req.user.sub){
        return res.status(401).send("No puedes borrar otro usuario que no seas tu");
    };

    return User.findByIdAndDelete(id, (err) => {
        if(err){
            res.status(500).send(`El usuario no ha sido eliminado correctamente: ${err}`);
        };
    })
    .then(() => res.send('El USUARIO se ha borrado correctamente'));
});

module.exports = userRouter;
