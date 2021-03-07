const {Schema, model} = require('mongoose');

const {Types:{ObjectId}} = Schema;


const comment = new Schema({
    creatorUser: {
        //creatorUser es una ID
        type: ObjectId,
        require: true
    },
    text:{
        type: String,
        require: true
    },
    date:{
        type: Date,
        default: Date.now()
    },
    place:{
        type: String
    },
    animalRelated:{
        //id animal perdido o encontrado
        type: String,
        animalInfo:{type: Schema.Types.ObjectId, ref: 'Animal'},
    },
    tags:[{
        type: String
    }]
})

module.exports = Comentario = model('Comentario', comment);