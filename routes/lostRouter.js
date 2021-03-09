const {Router} = require('express');

const LostAnimal = require('../models/lost');
const multerInstance = require('./multerRouter')

const lostRouter = new Router();

lostRouter.post('/addLostAnimal', multerInstance.single('photo'), (req, res) => {

    const species = req.body.species;
    const name = req.body.name;
    const breed = req.body.breed;
    const colour = req.body.colour;
    const sex = req.body.sex;
    const idTag = req.body.idTag;
    const fasteners = req.body.fasteners;
    const chip = req.body.chip;
    const place = req.body.place;
    const date = req.body.date;
    const photo = req.file.filename;
    const creatorUser = req.body.creatorUser;
    const status = req.body.status;
    const comments = req.body.comments;

    const lostAnimal = new LostAnimal({
        species: species,
        name: name,
        breed: breed,
        colour: colour,
        sex: sex,
        idTag: idTag,
        fasteners: fasteners,
        chip: chip,
        place: place,
        date: date,
        photo: photo,
        creatorUser: creatorUser,
        status: status,
        comments: comments
    })

    lostAnimal.save()
    .then(doc => res.send(doc))
});

lostRouter.get('/lostAnimals', (req, res) => {
    return LostAnimal.find({})
    .then(lostAnimals => res.send(lostAnimals))
});


lostRouter.get('/lostAnimals/:id', (req, res) => {
    const {params: {id} } = req;
    return LostAnimal.findById(id)
    .then(LostAnimals => res.send(LostAnimals))
})

lostRouter.put('/lostAnimals/:id', (req, res) => {
    const { params: {id} } = req;
    let bodyUpdated = req.body;

    LostAnimal.findByIdAndUpdate(id, bodyUpdated, (err, animalUpdate) => {
        if(err) {
            res.status(500).send(`El animal no ha podido ser actualizado: ${err}`);
        }
        res.status(200).send(animalUpdate)
    }) 
})

lostRouter.delete('/lostAnimals/:id', (req, res) => {
    const {params: {id} } = req;
    return LostAnimal.findByIdAndDelete(id)
    .then(() => res.send('El animal PERDIDO se ha borrado correctamente'))
})

module.exports = lostRouter;