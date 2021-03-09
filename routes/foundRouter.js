const {Router} = require('express');

const FoundAnimal = require('../models/found');
const multerInstance = require('./multerRouter')

const foundRouter = new Router();


foundRouter.post('/addFoundAnimal', multerInstance.single('photo'), (req, res) => {

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
    //imagenes con multer
    const photo = req.file.filename;
    const creatorUser = req.body.creatorUser;
    const status = req.body.status;
    const comments = req.body.comments;
   

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
        status: status,
        comments: comments
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

foundRouter.put('/foundAnimals/:id', (req, res) => {
    const { params: {id} } = req;
    let bodyUpdated = req.body;

    FoundAnimal.findByIdAndUpdate(id, bodyUpdated, (err, animalUpdate) => {
        if(err) {
            res.status(500).send(`El animal no ha podido ser actualizado: ${err}`);
        }
        res.status(200).send(animalUpdate)
    }) 
})

foundRouter.delete('/foundAnimals/:id', (req, res) => {
    const {params: {id} } = req;
    return FoundAnimal.findByIdAndDelete(id)
    .then(() => res.send('El animal ENCONTRADO se ha borrado correctamente'))
})

module.exports = foundRouter;