export const erroresFirebase = (code) =>{
    switch (code) {
        case "auth/email-already-in-use":
            
            return "Ususario ya registrado"
        case "auth/invalid-email":
           return "Formato email no valido"
        case "auth/user-not-found":
            return "Usuario no registrado"
        case "auth/wrong-password":
            return "Contraseña incorrecta"
    
        default:
            return "Error desde el servidor"
    }
}