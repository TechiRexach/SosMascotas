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
    const tags = req.body.tags;
    const fechaUsuario = req.body.fechaUsuario;

    try{
        validatedComment(text, fechaUsuario);
        
        const comment = new Comment({
            creatorUser: creatorUser,
            text: text,
            place: place,
            animal: animal,
            tags: tags,
            fechaUsuario: fechaUsuario
        });

        comment.save()
        .then(newComment => res.send({message: "Comentario creado correctamente", newComment}));

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

//GET: VER UN COMENTARIO SEGÚN SU ID
commentRouter.get('/comments/:id', (req, res) => {
    const {params: {id} } = req;

    try{
        validatedId(id);
        
        Comment.findById(id, (err, comment) => {
            if(err){
                return res.status(404).send("No existe ese comentario")
            }
            return res.status(200).send({message:"Aquí tienes el comentario que has buscado", comment});
        });
    }
    catch (error){
        return res.status(400).send(error.message);
    };
});

//GET: VER TODOS LOS COMENTARIOS ASOCIADOS A LA ID DE UN ANIMAL
commentRouter.get('/comments/animal/:id', (req, res) => {
    const {params: {id} } = req;

    try{
        validatedId(id)

        Comment.find({animal: id})
        .populate("creatorUser", ["name", "email"])
        .populate("animal", "name")
        .exec((err, comments) => {
            if(err){
                return res.status(404).send('Este animal no tiene comentarios');
            }
            return res.status(200).send({message: `Aqui tienes los comentarios de ${[comments[0].animal.name]}`, comments});
        });
    }
    catch (error){
        return res.status(400).send(error.message);
    };
});

//DELETE: BORRAR UN COMENTARIO SEGÚN LA ID
commentRouter.delete('/comments/:id', isAuth, (req, res) => {
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
                return res.status(200).send('El COMENTARIO se ha borrado correctamente')
            })
        });
    }
    catch (error){
        return res.status(400).send(error.message);
    };
});

module.exports = commentRouter;

