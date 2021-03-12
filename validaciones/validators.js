const  validaciones = {
    validAnimal(id){
        if(id.length < 24) throw new TypeError (`La id no es correcta`)
    },
    validEmail(email){
        if(email == !/^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/)
        throw new TypeError ('El email no es correcto desde validators')
    }
  
}

module.exports = validaciones;