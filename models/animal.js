const {Schema, model} = require('mongoose');

const animal = new Schema({
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
    cp:{
        type: Number,
        required: true,
        length: 5
    },
    date:{
        type: Date,
        default: Date.now()
    },
    fechaUsuario:{
        type: Date,
        required: true
    },
    photo:{
        type: String,
    },
    creatorUser:{
        type:  Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['Perdido', 'Encontrado', 'En casa', 'Fallecido'],
        required: true
    }
});

module.exports = Animal = model('Animal', animal);






