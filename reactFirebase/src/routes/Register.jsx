import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { erroresFirebase } from "../utils/erroresFirebase";
import { formValidate } from "../utils/formValidate";

import FormError from "../components/FormError";
import FormInput from "../components/FormInput";

const Register = () => {

    

    const navegate = useNavigate()
    const {registerUser} = useContext(UserContext);
    const {required,patternEmail, minLength, validateTrim, validateEquals} = formValidate();

    const {register,
         handleSubmit, 
         formState:{errors},
        getValues,
        setError
        } = useForm()

    const onSubmit = async({email,password}) => {
        
            try {
                await registerUser(email, password)
                
                navegate("/")
            } catch (error) {
                console.log(error.code)
                const {code, message} = erroresFirebase(error.code)
                setError(code,{message})
               
            }
    }

    

    // const handleSubmit = async(e) =>{
    //    
    // }
    return (
        <>
            <h1>Register</h1>
            
           
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    type="email"
                    placeholder="Ingrese email"
                    {...register("email", {
                        required,
                        pattern: patternEmail
                        })}
                ></FormInput>
                <FormError error={errors.email} />

                <FormInput
                    type="password"
                    placeholder="Ingrese password" 
                   {...register("password", {
                       
                   minLength,
                   validate: validateTrim
               })}
                ></FormInput>
                <FormError error={errors.password} />

                <FormInput
                    type="password" 
                    placeholder="Ingrese password" 
                    {...register("repassword", {
                        
                        validate: validateEquals(getValues("password")),
                    })}
                ></FormInput>
                <FormError error={errors.repassword} />

                <button type="submit">Register</button>
            </form>
        </>
    )
}
export default Register;
