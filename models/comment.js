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
    fechaUsuario:{
        type: String,
        required: true
    },
    place:{
        type: String,
    },
    animal:{
            type: Schema.Types.ObjectId, 
            ref: 'Animal', 
            required: true
    },
    tags:[{
        type: String
    }]
});

module.exports = Comentario = model('Comentario', comment);


