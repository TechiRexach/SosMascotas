const {Router} = require('express');
const Comment = require('../models/comment');

const commentRouter = new Router();

//POST: AÑADIR NUEVO COMENTARIO
commentRouter.post('/addcomment', (req, res) =>{
    const creatorUser = req.body.creatorUser;
    const text = req.body.text;
    const place = req.body.place;
    const animal = req.body.animal;
    const tags = req.body.tags;
    
    const comment = new Comment({
        creatorUser: creatorUser,
        text: text,
        place: place,
        animal: animal,
        tags: tags
    })

    comment.save()
    .then(doc => res.send(doc))
});

//GET: VER TODOS LOS COMENTARIOS
commentRouter.get('/comments', (req, res) => {
    return Comment.find({})
    .populate("creatorUser", ["name", "lastname"])
    .populate("animal", ["name", "species", "colour"])
    .then(comments => res.send(comments))
});

//GET: VER UN COMENTARIO SEGÚN SU ID
commentRouter.get('/comments/:id', (req, res) => {
    const {params: {id} } = req;
    
    Comment.findById(id, (err, comment) => {
        if(err){
            res.sendStatus(404)
        }
        res.json(comment)
    });
});

//GET: VER TODOS LOS COMENTARIOS ASOCIADOS A LA ID DE UN ANIMAL
commentRouter.get('/comments/animal/:id', (req, res) => {
    const {params: {id} } = req;
    
    Comment.find({animal: id})
    .populate("creatorUser", ["name", "email"])
    .populate("animal", "status")
    .exec((err, comments) => {
        if(err){
            res.sendStatus(404)
        }
        res.json(comments)
    });
});

//DELETE: BORRAR UN COMENTARIO SEGÚN LA ID
commentRouter.delete('/comments/:id', (req, res) => {
    const {params: {id} } = req;
    return Comment.findByIdAndDelete(id)
    .then(() => res.send('El COMENTARIO se ha borrado correctamente'))
});

module.exports = commentRouter;





