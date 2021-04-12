const  validaciones = {
    validatedId(id){
        if(id.length < 24) throw new TypeError (`La id no es correcta`);
    },
    validatedNewUser(email, password, name, lastname, phone){
        if(!email) throw new Error ("Rellena el campo email, por favor");
        if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            throw new Error ('Esto no es un email')
        };
        if(!password) throw new Error ("Rellena el campo contraseña, por favor");
        if(password.length < 6) throw new Error ("La contraseña debe tener al menos 6 caracteres");
        if(!name) throw new Error ("Rellena el campo nombre, por favor");
        if(!lastname) throw new Error ("Rellena el campo apellido, por favor");
        if(!phone) throw new Error ("Rellena el campo teléfono, por favor");
        if(phone.length < 9) throw new Error ("El número de teléfono debe tener al menos 9 caracteres");
    },
    validatedLoginUser(email, password){
        if(!email) throw new Error ("Rellena el campo email, por favor");
        if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            throw new Error ('Esto no es un email')
        };
        if(!password) throw new Error ("Rellena el campo contraseña, por favor");
        if(password.length < 6) throw new Error ("La contraseña debe tener al menos 6 caracteres");
    },
    validatedAnimal(species, colour, status, fasteners, place, fechaUsuario, cp){
        if(!species) throw new Error ("Rellena el campo especie, por favor");
        if(!colour) throw new Error ("Rellena el campo color, por favor");
        if(!fasteners) throw new Error ("Rellena el campo sujecciones, por favor");
        if(!place) throw new Error ("Rellena el campo lugar, por favor");
        if(!fechaUsuario) throw new Error ("Rellena el campo fecha, por favor");
        if(!status) throw new Error ("Selecciona un opción del campo estado, por favor");
        if(!cp) throw new Error ("Rellena el campo código postal, por favor");
        if(cp.length < 5 || cp.length > 5) throw new Error ("El código postal debe tener 5 caracteres");
    },
    validatedComment(text, fechaUsuario){
        if(!text) throw new Error ("Rellena el campo texto, por favor");
        if(!fechaUsuario) throw new Error ("Rellena el campo fecha, por favor");
    }
}

module.exports = validaciones;