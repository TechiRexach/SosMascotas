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
    .then(doc => res.send(doc));
});

//GET: VER TODOS LOS COMENTARIOS
commentRouter.get('/comments', (req, res) => {
    return Comment.find({})
    .populate("creatorUser", ["name", "lastname"])
    .populate("animal", ["name", "species", "colour"])
    .populate("animal", "creatorUser")
    .then(comments => res.send(comments));
});

//GET: VER UN COMENTARIO SEGÚN SU ID
commentRouter.get('/comments/:id', (req, res) => {
    const {params: {id} } = req;

    validatedId(id);
    
    Comment.findById(id, (err, comment) => {
        if(err){
            res.sendStatus(404)
        }
        res.json(comment);
    });
});

//GET: VER TODOS LOS COMENTARIOS ASOCIADOS A LA ID DE UN ANIMAL
commentRouter.get('/comments/animal/:id', (req, res) => {
    const {params: {id} } = req;

    validatedId(id)
    
    Comment.find({animal: id})
    .populate("creatorUser", ["name", "email"])
    .populate("animal", "status")
    .exec((err, comments) => {
        if(err){
            res.status(404).send('Este animal no tiene comentarios')
        }
        res.json(comments)
    });
});

//DELETE: BORRAR UN COMENTARIO SEGÚN LA ID
commentRouter.delete('/comments/:id', isAuth, (req, res) => {
    const {params: {id} } = req;

    validatedId(id);

    Comment.findById(id, (err, comment) => {
    
        if(err){
            return res.status(404).send("El comentario no existe");
        };
        if(comment.creatorUser != req.user.sub){
            return res.status(401).send("No puedes borrar un comentario que no sea tuyo");
        }
        
         comment.deleteOne()
         .then(() => res.status(200).send('El COMENTARIO se ha borrado correctamente'));
    });
});

module.exports = commentRouter;

