const {Router} = require('express');

const LostAnimal = require('../models/lost');

const lostRouter = new Router();

lostRouter.post('/addLostAnimal', (req, res) => {

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

lostRouter.delete('/lostAnimals/:id', (req, res) => {
    const {params: {id} } = req;
    return LostAnimal.findByIdAndDelete(id)
    .then(() => res.send('El animal PERDIDO se ha borrado correctamente'))
})

module.exports = lostRouter;

// "species": "species",
// "name": "name",
// "breed": "breed",
// "colour": "colour",
// "sex": "sex",
// "idTag": "idTag",
// "fasteners": "fasteners",
// "chip": "chip",
// "place": "place",
// "date": "date",
// "photo": "photo",
// "creatorUser": "creatorUser",
// "relatedComment": "relatedComment"



// {
//     "species": "Hamster",
//     "breed": "Ruso",
//     "colour": "Gris",
//     "sex": "Macho",
//     "fasteners": "Ninguno",
//     "place": "Parque Retiro",
//     "photo": "Imagen de Hamster",
//     "creatorUser": "6040fffa25c45a09377c9156",
//     "relatedComment": "604128773bbcbb0bc38584ec"
// }