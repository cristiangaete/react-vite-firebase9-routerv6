export const formValidate = (getValues) => { 
    return {
        required: {
            value: true,
            message: "Campo obligatorio"
        },
        patternEmail:{
            value: /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
            message:"Formato de email incorrecto"
        },
        minLength:{
            value: 6,
            message: "Minimo 6 caracteres"
        },
        validateTrim: {
            trim: v => {
                if(!v.trim()){
                    return "No seas payaso, escribe algo"
                }
               return true
            },
        },
        validateEquals(value) {
            return {
                equals: (v) => v === value || "No coinciden las contraseñas",
            }
            // message: "No coinciden las contraseñas"
        }
    }
 }