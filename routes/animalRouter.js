const {Router} = require('express');
const animalRouter = new Router();
const Animal = require('../models/animal');
const multerInstance = require('./multerRouter');
const {validatedId, validatedAnimal} = require('../services/validators')
const isAuth = require('../services/middlewareIsAuth');


//POST: CREAR NUEVO AVISO DE ANIMAL
animalRouter.post('/addanimal', isAuth, multerInstance.single('photo'), (req, res) => {

    const species = req.body.species;
    const name = req.body.name;
    const breed = req.body.breed;
    const colour = req.body.colour;
    const sex = req.body.sex;
    const idTag = req.body.idTag;
    const fasteners = req.body.fasteners;
    const chip = req.body.chip;
    const place = req.body.place;
    const cp = req.body.cp;
    const fechaUsuario = req.body.fechaUsuario;
    const photo = req.file ? req.file.filename : 'location.svg'
    const creatorUser = req.user.sub;
    const status = req.body.status;
    console.log(creatorUser)

    
    try {

        validatedAnimal(species, colour, status, fasteners, place, fechaUsuario, cp)

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
            cp: cp,
            fechaUsuario: fechaUsuario,
            photo: photo,
            creatorUser: creatorUser,
            status: status,
        })

        animal.save()
        .then(newAnimal => res.status(200).send({message: "Se ha creado tu nuevo aviso", newAnimal}));
    }

    catch (error){
        return res.status(400).send(error.message);
    };
});

//GET: VER TODOS LOS AVISOS DE ANIMALES
animalRouter.get('/animals', (req, res) => {
    return Animal.find({})
    .sort({date: 'descending'})
    .populate("creatorUser", ["name", "email"])
    .populate("comments", "text")
    .then(Animals => res.send({message: "Aquí puedes ver todos los animales:", Animals}));
});

//GET: VER EL AVISO DE UN ANIMAL SEGÚN SU ID
animalRouter.get('/animals/:id', (req, res) => {
    const {params: {id} } = req;

    try{
        validatedId(id)

        Animal.findById(id)
        .populate("creatorUser", "name")
        .populate("comments", ["text", "animal"])
        .exec(function (err, animal){
            if(err){
                return res.status(404).send("No existe ningún animal con esa ID");
            }
            return res.send({message: `Aqui tienes la información de ${animal.name}`, animal});
        });
    }
    catch (error){
        res.status(400).send(error.message);
    };
});

//GET: VER ANIMALES DE UN USUARIO
animalRouter.get('/animals/myanimals/:id', isAuth, (req, res) => {
    
    const id = req.user.sub

    try{
        
        validatedId(id);
        
        Animal.find({creatorUser: id})
            .sort({date: 'descending'})
            .populate('creatorUser', 'name')
            .exec((err, animals) => {
            if(err){
                return res.status(404).send("No hay animales")
            }
            return res.status(200).send({animals});
        })
    }
    catch (error){
        return res.status(400).send(error.message);
    };
});

//GET: VER LISTA DE ANIMALES PERDIDOS
animalRouter.get('/lost', (req, res) => {

    Animal.find({status: "Perdido"})
    .sort({date: 'descending'})
    .exec((err, pets) => {
        if(err){
            return res.status(404).send("No existe ningún animal con esa estado");
        }

        return res.status(200).send({message: "ANIMALES PERDIDOS", pets})
    });
});

//GET: VER LISTA DE ANIMALES ENCONTRADOS
animalRouter.get('/found', (req, res) => {

    Animal.find({status: "Encontrado"})
    .sort({date: 'descending'})
    .exec((err, pets) => {
        if(err){
            return res.status(404).send("No existe ningún animal con esa estado");
        }
        
        return res.status(200).send({message: "ANIMALES ENCONTRADOS", pets})
    });
});

//GET: VER LISTA DE ANIMALES EN CASA
animalRouter.get('/athome', (req, res) => {

    Animal.find({status: "En casa"})
    .sort({date: 'descending'})
    .exec((err, pets) => {
        if(err){
            return res.status(404).send("No existe ningún animal con esa estado");
        }
        
        return res.status(200).send({message: "¡FINALES FELICES!", pets})
    });
});

//GET: VER ANIMALES POR CODIGO POSTAL
animalRouter.get('/cp/:cp', (req, res) => {

    const {params: {cp} } = req;

    Animal.find({cp: cp}, (err, petsCp) => {
   
        if(err){
            return res.status(404).send("No existe ningún animal en ese código postal");
        }
        if(cp.length < 5 || cp.length > 5){
            return res.status(400).send("El código postal no es válido")
        }
        
        return res.status(200).send({message: `No hay animales en el código postal ${cp}`, petsCp})
    });
});

//PUT: ACTUALIZAR INFORMACIÓN DE UN ANIMAL SEGÚN SU ID
animalRouter.put('/animal/:id', isAuth, (req, res) => {
    const { params: {id} } = req;
    
    Animal.findByIdAndUpdate(id, {status: req.body.status}, { runValidators: true, context: 'query' }, (err, animal) => {
       
        if(err) {
            return res.status(400).send(`Elige una opción de estado valida`);
        };

        if(animal.creatorUser != req.user.sub){
           return res.status(401).send("No puedes actualizar un animal que no sea tuyo"); 
        };

        return res.status(201).send({message: `La información de ${animal.name} se ha actualizado correctamente`, animal});
    });
});

//DELETE: ELIMINAR AVISO DE UN ANIMAL SEGÚN SI ID
animalRouter.delete('/animal/:id', isAuth, (req, res) => {
    const {params: {id} } = req;

    try{

        validatedId(id);

        Animal.findById(id, (err, animal) => {
            if(err){
                return res.status(404).send("El animal no existe")
            }
            if(animal.creatorUser != req.user.sub){
                return res.status(401).send("No puedes borrar un animal que no sea tuyo")
            }

            animal.deleteOne()
            .then(() => {
                Animal.find({creatorUser: req.user.sub})
                .sort({date: 'descending'})
                .populate('creatorUser', 'name')
                .exec((err, animals) => {
                    if(err){
                        return res.status(404).send("No hay animales")
                    }
                    return res.status(200).send({message: 'El aviso se ha borrado correctamente', animals});
                })
            })
        })
    }
    catch (error){
        res.status(400).send(error.message);
    };
});

module.exports = animalRouter;
