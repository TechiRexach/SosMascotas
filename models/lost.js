const {Schema, model} = require('mongoose');

const lostAnimal = new Schema({
    species: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    colour:{
        type: String,
        required: true
    },
    sex:{
        type: String,
        required: true
    },
    idTag:{
        type: Boolean,
        required: true
    },
    fasteners:{
        type: String,
        required: true
    },
    chip:{
        type: Boolean,
        required: true
    },
    place:{
        type: String,
        required: true
    },
    date:{
        type: String,
        default: Date()
    },
    photo:{
        type: String,
        required: true
    },
    creatorUser:{
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    status: {
        type: String
    },
    comments:[{
        type: Schema.Types.ObjectId, ref: 'Comentario'
    }],
});


module.exports = LostAnimal = model('LostAnimal', lostAnimal);
