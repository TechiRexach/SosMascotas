const {Router} = require('express');
const Comment = require('../models/comment');

const commentRouter = new Router();

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

commentRouter.get('/comments', (req, res) => {
    return Comment.find({})
    .populate("creatorUser", "name")
    .populate("animal", "name")
    .then(comments => res.send(comments))
});

commentRouter.get('/comments/:id', (req, res) => {
    const {params: {id} } = req;
    
    Comment.findById(id, (err, comment) => {
        if(err){
            res.sendStatus(404)
        }
        res.json(comment)
    });
});

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

commentRouter.delete('/comments/:id', (req, res) => {
    const {params: {id} } = req;
    return Comment.findByIdAndDelete(id)
    .then(() => res.send('El COMENTARIO se ha borrado correctamente'))
});

module.exports = commentRouter;





