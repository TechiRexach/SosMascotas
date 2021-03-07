const {Schema, model} = require('mongoose');

const {Types:{ObjectId}} = Schema;

const foundAnimal = new Schema({
    species: {
        type: String,
        require: true
    },
    name:{
        type: String,
    },
    breed: {
        type: String,
    },
    colour:{
        type: String,
        require: true
    },
    sex:{
        type: String,
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
    },
    place:{
        type: String,
        require: true
    },
    date:{
        type: Date,
        default: Date.now(),
        require: true
    },
    photo:{
        type: String,
        require: true
    },
    creatorUser:{
        //dueño animal
        type: ObjectId,
        require: true
    }
});


module.exports = FoundAnimal = model('FoundAnimal', foundAnimal);
