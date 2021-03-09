const {Schema, model} = require('mongoose');

const foundAnimal = new Schema({
    species: {
        type: String,
        required: true
    },
    name:{
        type: String,
    },
    breed: {
        type: String,
    },
    colour:{
        type: String,
        required: true
    },
    sex:{
        type: String,
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
        type:  Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    status: {
        type: String
    },
    comments:[{
        type: Schema.Types.ObjectId, ref: 'Comentario'
    }],
});


module.exports = FoundAnimal = model('FoundAnimal', foundAnimal);
