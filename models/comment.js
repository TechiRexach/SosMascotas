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
        type: Date,
        default: Date.now()
    },
    fechaUsuario:{
        type: Date,
        required: true
    },
    place:{
        type: String,
    },
    animal:{
            type: Schema.Types.ObjectId, 
            ref: 'Animal', 
            required: true
    }
});

module.exports = Comentario = model('Comentario', comment);


