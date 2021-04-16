const {Router} = require('express');
const commentRouter = new Router();
const Comment = require('../models/comment');
const isAuth = require('../services/middlewareIsAuth');
const {validatedId, validatedComment} = require('../services/validators');


//POST: AÑADIR NUEVO COMENTARIO
commentRouter.post('/addcomment', isAuth, (req, res) =>{
    const creatorUser = req.user.sub;
    const text = req.body.text;
    const place = req.body.place;
    const animal = req.body.animal;
    const fechaUsuario = req.body.fechaUsuario;

    try{
        validatedComment(text, fechaUsuario);
        
        const comment = new Comment({
            creatorUser: creatorUser,
            text: text,
            place: place,
            animal: animal,
            fechaUsuario: fechaUsuario
        });

        comment.save()
        .then(newComment => res.send({message: "Comentario creado correctamente", newComment}))
    }
    catch (error){
        res.status(400).send(error.message);
    };
});

//GET: VER TODOS LOS COMENTARIOS
commentRouter.get('/comments', (req, res) => {
    return Comment.find({})
    .populate("creatorUser", ["name", "lastname"])
    .populate("animal", ["name", "species", "colour"])
    .populate("animal", "creatorUser")
    .then(comments => {
        return res.send({message: "COMENTARIOS:", comments})
    });
});

//GET: VER LOS COMENTARIO DE UN USUARIO
commentRouter.get('/comments/mycomments/', isAuth, (req, res) => {
    
    const id = req.user.sub

    try{
        validatedId(id);
        
        Comment.find({creatorUser: id})
            .sort({fechaUsuario: 'descending'})
            .populate('creatorUser', 'name')
            .populate('animal', 'species')
            .exec((err, comments) => {
            if(err){
                return res.status(404).send({message: "No hay comentarios", err})
            }
            return res.status(200).send({message: 'Estos son tus comentarios', comments});
        })
        
    }
    catch (error){
        return res.status(400).send({message: 'ERROR DESDE EL BACK', error});
    };
});

//GET: VER TODOS LOS COMENTARIOS ASOCIADOS A LA ID DE UN ANIMAL
commentRouter.get('/comments/animal/:id', (req, res) => {
    const {params: {id} } = req;

    try{
        validatedId(id)

        Comment.find({animal: id})
        .sort({fechaUsuario: 'descending'})
        .populate("creatorUser", ["name", "email"])
        .populate("animal", "name")
        .exec((err, comments) => {
            if(err){
                return res.status(404).send({err});
            }
            return res.status(200).send({message:'¡Aun no hay comentarios!', comments});
        });
    }
    catch (error){
        return res.status(400).send(error.message);
    };
});

//DELETE: BORRAR UN COMENTARIO SEGÚN LA ID
commentRouter.delete('/comment/:id', isAuth, (req, res) => {

    const {params: {id} } = req;
    
    try{
        validatedId(id);

        Comment.findById(id, (err, comment) => {
            if(err){
                return res.status(404).send("El comentario no existe");
            };
            if(comment.creatorUser != req.user.sub){
                return res.status(401).send("No puedes borrar un comentario que no sea tuyo");
            }
            
            comment.deleteOne()
            .then(() => {
                Comment.find({creatorUser: req.user.sub})
                .populate('creatorUser', 'name')
                .exec((err, comments) => {
                    if(err){
                        return res.status(404).send("No hay comentarios")
                    }
                    return res.status(200).send({message: 'El comentario se ha borrado correctamente', comments});
                })
            })
        });
    }
    catch (error){
        return res.status(400).send(error.message);
    };
});

module.exports = commentRouter;

