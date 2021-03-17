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
    }
}

module.exports = validaciones;