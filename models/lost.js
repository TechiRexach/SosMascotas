const {Schema, model} = require('mongoose');

const {Types:{ObjectId}} = Schema;

const lostAnimal = new Schema({
    species: {
        type: String,
        require: true
    },
    name:{
        type: String,
        require: true
    },
    breed: {
        type: String,
        require: true
    },
    colour:{
        type: String,
        require: true
    },
    sex:{
        type: String,
        require: true
    },
    idTag:{
        type: Boolean,
        require: true
    },
    fasteners:{
        //sujecciones
        type: String,
        require: true
    },
    chip:{
        type: Boolean,
        require: true
    },
    place:{
        type: String,
        require: true
    },
    date:{
        type: String,
        default: Date()
    },
    photo:{
        type: String,
        require: true
    },
    creatorUser:{
        //dueño animal
        type: ObjectId,
        require: true
    },
    status: {
        type: String
    },
    relatedComments:[{
        //ids comentarios relacionados con este animal
        type: String
    }],
});


module.exports = LostAnimal = model('LostAnimal', lostAnimal);
