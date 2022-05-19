import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
const Register = () => {

    

    const navegate = useNavigate()
    const {registerUser} = useContext(UserContext);

    const {register,
         handleSubmit, 
         formState:{errors},
        getValues,
        setError
        } = useForm()

    const onSubmit = async({email,password}) => {
        console.log(email,password)
            try {
                await registerUser(email, password)
                console.log("usuario creado")
                navegate("/")
            } catch (error) {
                console.log(error.code)
                switch (error.code) {
                    case "auth/email-already-in-use":
                        
                        setError("email",{
                            message: "Usuario ya esta registrado"
                        })
                        break;
                
                    default:
                        console.log("Error desde el servidor")
                        break;
                }
            }
    }

    

    // const handleSubmit = async(e) =>{
    //    
    // }
    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="email" 
                placeholder="Ingrese email"
                {...register("email", {required: {
                    value: true,
                    message: "Campo obligatorio"
                },
                pattern:{
                    value: /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
                    message:"Formato de email incorrecto"
                }
                })}
                />
                {errors.email && <p>{errors.email.message}</p>}
                <input type="password"
                 placeholder="Ingrese password" 
                {...register("password", {
                    setValueAs: v => v.trim(),
                    minLength:{
                    value: 6,
                    message: "Minimo 6 caracteres"
                },
                validate: {
                    trim: v => {
                        if(!v.trim()){
                            return "No seas payaso, escribe algo"
                        }
                       return true
                    }
                    
                }
            })}
                />
                {errors.password && <p>{errors.password.message}</p>}

                <input type="password" 
                placeholder="Ingrese password" 
                {...register("repassword", {
                    setValueAs: v => v.trim(),
                    validate: {
                        equals: v => v===getValues("password") || 
                        "No coinciden las contraseñas",
                        // message: "No coinciden las contraseñas"
                    }
                })}
                />
                {errors.repassword && <p>{errors.repassword.message}</p>}
                <button type="submit">Register</button>
            </form>
        </>
    )
}
export default Register;
