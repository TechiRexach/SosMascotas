const {Router} = require('express');
const userRouter = new Router();
const User = require('../models/user');
const isAuth = require('../services/middlewareIsAuth');
const {validatedId, validatedPassword} = require('../services/validators');
const bcrypt = require('bcrypt');

//GET: VER TODOS LOS USUARIOS
userRouter.get('/', (req, res) => {
    return User.find({})
    .then(users => {
        return res.status(200).send(users)
    });
});

//GET: VER UN USUARIO SEGÚN SU ID.
userRouter.get('/myprofile', isAuth, (req, res) => {
    
    const id = req.user.sub

    User.findById(id, (err, user) => {
        if (err){
            return res.status(404).send('Esta id de usuario no existe');
        };
        return res.status(200).send({message: `${user.name}, aquí tienes tu perfil:`, user});
    });
});

//PUT: ACTUALIZAR CONTRASEÑA
userRouter.put('/password/', isAuth, (req, res) => {

    const id = req.user.sub
    
    let password = req.body.password;
    

    try{
        validatedId(id);
        
        User.findById(id, async (err,  user) => {

            if(err){
                return res.status(404).send("Error al modificar la contraseña");
            };

            const repeatedPassword = await bcrypt.compare(password, user.password);

            if(repeatedPassword){
                return res.status(400).send('No puedes usar una contraseña ya usada');
            }

            user.password = password;
            
            if(!password){
                return res.status(400).send('Escribe una contraseña nueva, por favor')
            }

            user.save()
            .then((userUpdated) => {
                return res.status(200).send({message: "Contraseña actualizada", userUpdated});
            })
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
        .then(() => res.send({message: 'Tu cuenta se ha borrado correctamente'}));
    }
    catch (error){
        return res.status(400).send(error.message);
    };
});

module.exports = userRouter;
