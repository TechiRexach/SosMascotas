const {Router} = require('express');
const Animal = require('../models/animal');
const multerInstance = require('./multerRouter');

const animalRouter = new Router();

animalRouter.post('/addAnimal', multerInstance.single('photo'), (req, res) => {

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

    const animal = new Animal({
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

    animal.save()
    .then(doc => res.send(doc))
});

animalRouter.get('/animals', (req, res) => {
    return Animal.find({})
    .populate("creatorUser", "name")
    .populate("comments", "text")
    .then(Animals => res.send(Animals))
});

animalRouter.get('/animals/:id', (req, res) => {
    const {params: {id} } = req;

    Animal.findById(id)
    .populate("creatorUser", "name")
    .populate("comments", ["text", "animal"])
    .exec(function (err, animal){
        if(err){
            res.sendStatus(404)
        }
        res.send(animal)
    });
});

animalRouter.put('/animals/:id', (req, res) => {
    const { params: {id} } = req;
    let bodyUpdated = req.body;

    Animal.findByIdAndUpdate(id, bodyUpdated, (err, animalUpdate) => {
        if(err) {
            res.status(500).send(`El animal no ha podido ser actualizado: ${err}`);
        }
        res.status(200).send(animalUpdate)
    });
});

animalRouter.delete('/animals/:id', (req, res) => {
    const {params: {id} } = req;
    return Animal.findByIdAndDelete(id)
    .then(() => res.send('El animal se ha borrado correctamente'))
})

module.exports = animalRouter;




