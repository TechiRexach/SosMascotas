const  validaciones = {
    validatedId(id){
        if(id.length < 24) throw new TypeError (`La id no es correcta`)
    },
    validatedEmail(email, req, res){
        if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            throw new Error ('Esto no es un email')
        }
    },
    validatedPassword(password){
        if(password.length < 6) throw new Error ("La contraseña debe tener 6 caracteres")
    },
    validatedName(name){
        if(name.length == 0) throw new Error ("Rellena el nombre, por favor")
    },
    validatedLastname(lastname){
        if(lastname.length == 0) throw new Error ("Rellena el apellido, por favor")
    },
    validatedPhone(phone){
        if(phone.length < 9) throw new Error ("El número de teléfono debe tener al menos 9 caracteres")
    },
    validatedAnimal(species, colour, fasteners, place, fechaUsuario, status){
        if(species.length == 0) throw new Error ("Rellena el campo especie por favor");
        if(colour.length == 0) throw new Error ("Rellena el campo color por favor");
        if(fasteners.length == 0) throw new Error ("Rellena el campo sujecciones por favor");
        if(place.length == 0) throw new Error ("Rellena el campo lugar por favor");
        if(fechaUsuario.length == 0) throw new Error ("Rellena el campo fecha por favor");
        if(status.length == 0) throw new Error ("Selecciona un opción del campo estado por favor");
    },
    validatedComment(text, fechaUsuario){
        if(text.length == 0) throw new Error ("Rellena el campo texto por favor");
        if(fechaUsuario.length == 0) throw new Error ("Rellena el campo fecha por favor");
    }
}

module.exports = validaciones;