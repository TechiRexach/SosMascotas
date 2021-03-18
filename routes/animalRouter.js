const {Router} = require('express');
const animalRouter = new Router();
const Animal = require('../models/animal');
const multerInstance = require('./multerRouter');
const {validatedId, validatedAnimal} = require('../services/validators')
const isAuth = require('../services/middlewareIsAuth');

//POST: CREAR NUEVO AVISO DE ANIMAL
animalRouter.post('/addAnimal', isAuth, multerInstance.single('photo'), (req, res) => {

    const species = req.body.species;
    const name = req.body.name;
    const breed = req.body.breed;
    const colour = req.body.colour;
    const sex = req.body.sex;
    const idTag = req.body.idTag;
    const fasteners = req.body.fasteners;
    const chip = req.body.chip;
    const place = req.body.place;
    const fechaUsuario = req.body.fechaUsuario;
    const photo = req.file.filename;
    const creatorUser = req.user.sub;
    const status = req.body.status;

    validatedAnimal(species, colour, fasteners, place, fechaUsuario, status);

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
        fechaUsuario: fechaUsuario,
        photo: photo,
        creatorUser: creatorUser,
        status: status,
    })

    animal.save()
    .then(doc => res.send(doc));
});

//GET: VER TODOS LOS AVISOS DE ANIMALES
animalRouter.get('/animals', (req, res) => {
    return Animal.find({})
    .populate("creatorUser", ["name", "email"])
    .populate("comments", "text")
    .then(Animals => res.send(Animals));
});

//GET: VER EL AVISO DE UN ANIMAL SEGÚN SU ID
animalRouter.get('/animals/:id', (req, res) => {
    const {params: {id} } = req;

    validatedId(id)

    Animal.findById(id)
    .populate("creatorUser", "name")
    .populate("comments", ["text", "animal"])
    .exec(function (err, animal){
        if(err){
            res.status(404).send("No existe ningún animal con esa ID");
        }
        res.send(animal);
    });
});

//PUT: ACTUALIZAR INFORMACIÓN DE UN ANIMAL SEGÚN SU ID
animalRouter.put('/animals/:id', isAuth, (req, res) => {
    const { params: {id} } = req;
    let bodyUpdated = req.body;
    
    Animal.findByIdAndUpdate(id, bodyUpdated, { runValidators: true, context: 'query' }, (err, animal) => {
        if(err) {
            res.status(500).send(`El animal no ha podido ser actualizado: ${err}`);
        };

        if(animal.creatorUser != req.user.sub){
           return res.status(401).send("No puedes actualizar un animal que no sea tuyo"); 
        };

        res.status(200).send('El animal se ha actualizado correctamente');
    });
});

//DELETE: ELIMINAR AVISO DE UN ANIMAL SEGÚN SI ID
animalRouter.delete('/animals/:id', isAuth, (req, res) => {
    const {params: {id} } = req;

    validatedId(id);

    Animal.findById(id, (err, animal) => {
        if(err){
            return res.status(404).send("El animal no existe");
        };
        if(animal.creatorUser !== req.user.sub){
            return res.status(401).send("No puedes borrar un animal que no sea tuyo");
        };
    });

    animal.deleteOne()
    .then(() => res.status(200).send('El ANIMAL se ha borrado correctamente'));
});

module.exports = animalRouter;
