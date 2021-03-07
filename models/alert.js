const {Schema, model} = require('mongoose');

// const {Types:{ObjectId}} = Schema;


const alert = new Schema({
    creatorUser: {
        type: String,
        ownerName: {type: Schema.Types.ObjectId, ref: 'User'},
    },
    animal:{
        //id animal perdido o encontrado
        type: String,
        animalInfo:{type: Schema.Types.ObjectId, ref: 'Animal'},
    },
    date:{
        type: Date,
        default: Date.now()
    },
    relatedComments:[{
        //ids comentarios relacionados con este animal
        type: String
    }],
    status:{
        //borrado, final feliz, fallecimiento, aun buscandolo...
        type: String,
        require: true
    }
})

module.exports = Alert = model('Alerta', alert);