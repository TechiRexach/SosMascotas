const {Router} = require('express');

const Comment = require('../models/comment');

const commentRouter = new Router();

commentRouter.post('/addcomment', (req, res) =>{
    const creatorUser = req.body.creatorUser;
    const text = req.body.text;
    const place = req.body.place;
    const animalRelated = req.body.animalRelated;
    const tags = req.body.tags;
    

    const comment = new Comment({
        creatorUser: creatorUser,
        text: text,
        place: place,
        animalRelated: animalRelated,
        tags: tags
    })

    comment.save()
    .then(doc => res.send(doc))
})

commentRouter.get('/comments', (req, res) => {
    return Comment.find({})
    .then(comments => res.send(comments))
})

commentRouter.get('/comments/:id', (req, res) => {
    const {params: {id} } = req;
    return Comment.findById(id)
    .then(comments => res.send(comments))
})

commentRouter.delete('/comments/:id', (req, res) => {
    const {params: {id} } = req;
    return Comment.findByIdAndDelete(id)
    .then(() => res.send('El COMENTARIO ha borrado correctamente'))
})

module.exports = commentRouter;