const { Router } = require('express');
const Alert = require('../models/alert');

const alertRouter = new Router();

alertRouter.post('/addalert', (req, res) => {
    const creatorUser = req.body.creatorUser;
    const animal = req.body.animal;
    const relatedComments = req.body.relatedComments;
    const status = req.body.status;

    const alert = new Alert({
        creatorUser: creatorUser,
        animal: animal,
        relatedComments: relatedComments,
        status: status
    })
    
    alert.save()
    .then(addedAlert => res.send(addedAlert))
    // .catch((error) => {
    //     res.send(error, "Error al crear nueva alerta")
    // })
})

alertRouter.get('/alerts', (req, res) => {
    return Alert.find({})
    .then(alerts => res.send(alerts))
})

alertRouter.get('/alerts/:id', (req, res) => {
    const {params: {id} } = req;
    return Alert.findById(id)
    .then(alerts => res.send(alerts))
})

alertRouter.delete('/alerts/:id', (req, res) => {
    const {params: {id} } = req;
    return Alert.findByIdAndDelete(id)
    .then(() => res.send('La ALERTA se ha borrado correctamente'))
})

module.exports = alertRouter;