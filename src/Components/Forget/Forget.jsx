import React, { useState } from 'react'
import './Forget.css'
import {auth} from '../../Firebase/Confiq'
import {sendPasswordResetEmail} from 'firebase/auth'
import Zoom from '@mui/material/Zoom';
import {Link} from 'react-router-dom'

function Forget() {
  const [inputText,setInputText] = useState({
    email:'',
    password:'',
    cpassword:''
  })
  const [errors,setErrors] = useState({})

  const handleChange=(e)=>{
    const {name,value} = e.target
    setInputText({...inputText,[name]:value})
  }

  const handleClick =(e)=>{
    e.preventDefault()
    const validationErrors = {}
    const regex= /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

    if(!inputText.email.trim()){
      validationErrors.email = "Email is required"
    }else if(!regex.test(inputText.email)){
      validationErrors.email = "This is not a valid email format!"
    }else if(inputText.email){
      sendPasswordResetEmail(auth,inputText.email)
      .then(()=>{
        alert("Check Your Email")
      })
      .catch(error =>{
        console.log(error.code)
        alert(error.message)
      })
    }
    
    setErrors(validationErrors)
  }

  return (
    <div className='container'>
      <div className="forgot-box">
        <div className="title">
          <h1>Forgot Password</h1>  
        </div>
        <div className="content">
          <p>No Problem! Enter your email below and
            we will send you an email with instruction to reset your password
          </p>
        </div>
        <div className="input-field">
          <input 
            name='email'
            type="email"
            placeholder='Enter Your Email'
            onChange={handleChange}
            value={inputText.email}
            autoComplete='off'
          />
          {errors.email && <span style={{display:'block'}}>{errors.email}</span>}
        </div>
        <div className="btn">
          <Zoom in={true}>
            <button
              className='reset-btn'
              onClick={handleClick}
            >
              Reset Password
            </button>
          </Zoom>
        </div>
        <div className="btn">
          <Zoom in={true}>
            <Link to='/'
                style={{
                  textDecoration:'none',
                  color:'#fff'
                }}
            >
              <button className="login-btn">
                Login
              </button>
            </Link>
          </Zoom>
        </div>

      </div>
    </div>
  )
}

export default Forget
