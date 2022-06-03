import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {UserContext} from "../context/UserProvider"
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";
import { formValidate } from "../utils/formValidate";

import FormError from "../components/FormError";
import FormInput from "../components/FormInput";

const Login = () =>{

    

    const {loginUser} = useContext(UserContext);
    const navegate = useNavigate();
    const {required,patternEmail, minLength, validateTrim} = formValidate();

    
    const {register,
        handleSubmit, 
        formState:{errors},
       setError
       } = useForm()
    
       const onSubmit = async({email,password}) => {
        
        try {
            await loginUser(email, password)
            
            navegate("/")
        } catch (error) {
            console.log(error.code)
                const {code, message} = erroresFirebase(error.code)
                setError(code,{message})
           
        }
}

    return(
        <>
            <h1>Login</h1>
            
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
                
                <button type="submit">Login</button>
            </form>
            
        </>
    )
}


export default Login;