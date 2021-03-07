const {Router} = require('express');

const FoundAnimal = require('../models/found');

const foundRouter = new Router();


foundRouter.post('/addFoundAnimal', (req, res) => {

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
    const photo = req.body.photo;
    const creatorUser = req.body.creatorUser;
   

    const foundAnimal = new FoundAnimal({
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
    })

    foundAnimal.save()
    .then(doc => res.send(doc))
});

foundRouter.get('/foundAnimals', (req, res) => {
    return FoundAnimal.find({})
    .then(foundAnimals => res.send(foundAnimals))
});

foundRouter.get('/foundAnimals/:id', (req, res) => {
    const {params: {id} } = req;
    return FoundAnimal.findById(id)
    .then(FoundAnimal => res.send(FoundAnimal))
})

foundRouter.delete('/foundAnimals/:id', (req, res) => {
    const {params: {id} } = req;
    return FoundAnimal.findByIdAndDelete(id)
    .then(() => res.send('El animal ENCONTRADO se ha borrado correctamente'))
})

module.exports = foundRouter;