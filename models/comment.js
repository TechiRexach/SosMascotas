const {Schema, model} = require('mongoose');

const comment = new Schema({
    creatorUser: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    text:{
        type: String,
        required: true
    },
    date:{
        type: String,
        default: Date()
    },
    place:{
        type: String,
        required: true
    },
    animalRelated:{
        type: Schema.Types.ObjectId, ref: 'Animal',
        required: true  
    },
    tags:[{
        type: String
    }]
})

module.exports = Comentario = model('Comentario', comment);