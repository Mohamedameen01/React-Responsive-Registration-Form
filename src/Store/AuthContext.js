import { useState } from 'react'
import {createContext} from 'react'
import {auth} from '../Firebase/Confiq'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

export const AuthContext = createContext(null)

export default function AuthProvider({children}){

    const [userDetails,setUserDetails] = useState()
    
    const signup = async(email,password)=>{   
        await createUserWithEmailAndPassword(auth,email,password)
        .then(userCredential =>{   
            console.log(userCredential)
            setUserDetails(userCredential)
            alert('Sign up Successfull')
        })
        .catch(error =>{
            alert(error.message)
        })
    }
    
    const signin = async(email,password,signal)=>{
        try{
            await signInWithEmailAndPassword(auth,email,password)
            alert("Sign in Successfull")    
        }
        catch {
            if(signal === true){
                alert("Invalid Details")
            }
        } 
    }

    const authUser = {
        userDetails,
        signup,
        signin
    }
    
    return(
        <AuthContext.Provider value={authUser}>
            {children}
        </AuthContext.Provider>
    )
}