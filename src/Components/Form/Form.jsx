import React, {useContext, useState} from 'react'
import './Form.css' 
import Zoom from '@mui/material/Zoom';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../../Store/AuthContext';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import Fab from '@mui/material/Fab';
import { sendEmailVerification } from 'firebase/auth';
import {auth} from '../../Firebase/Confiq'

function Form(props) {

  const [userDetails,setUserDetails] = useState({
    username:'',
    email:'',
    password:''
  })
  const [errors,setErrors] = useState({})
  const [signal,setSignal] = useState(false)

  const navigate = useNavigate()
  const {signup,signin} = useContext(AuthContext)
  
  function handleSubmit(e){
    const validationErrors = {}
    const regex= /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

    if(!userDetails.username.trim() && !props.sign){
      validationErrors.username = "Username is required"
    }

    if(!userDetails.email.trim()){
      validationErrors.email= "Email is required"
    }else if(!regex.test(userDetails.email)){
      validationErrors.email= "This is not a valid email format!"
    }

    if(!userDetails.password.trim()){
      validationErrors.password= "Password is required"
    }else if(userDetails.password.length < 4){
      validationErrors.password = "Password must be more than 6 characters"
    }
    else if(userDetails.password.length > 10){
      validationErrors.password = "Password cannot exceed more than 10 characters"
    }else if(userDetails.email && userDetails.password){
      setSignal(true)
    }

    setErrors(validationErrors)

    props.sign ? signin(userDetails.email,userDetails.password,signal)
    : signup(userDetails.email,userDetails.password)

    e.preventDefault()
  }

  function handleChange(e){
    const {name,value} = e.target
    setUserDetails({...userDetails,[name]:value})
  }

  function handleClick(){
    props.onBtn()
    setUserDetails({
      username:'',
      email:'',
      password:''
    })
  }

  const handleVerify=()=>{
    sendEmailVerification(auth.currentUser)
    .then(()=>{
      userDetails.email && alert('Check Your Email')
    })
    .catch((error)=>{
      alert(error.message)
    })
  }

  return (
      <div>
        <div  className='left'>
          <div className={props.sign ? 'sign-in-container' : 'sign-up-container'}>
            <h1>{props.sign ? "Sign in" : "Create Account" }</h1>
            <p>{props.sign ? "use your account" : "use your email for registration"}</p>
            <form
              action="#"
              className='form-container'
              onSubmit={handleSubmit}
            >
              <div>
                {!props.sign &&
                  <input
                    onChange={handleChange}
                    name='username' 
                    type='text' 
                    placeholder='Name' 
                    inputMode='text'
                    value={userDetails.username}
                    autoComplete='off'
                  />}
                  {!props.sign &&<p>{errors.username}</p>}
              </div>
              <div>
                <input
                  onChange={handleChange} 
                  name='email'
                  type='email' 
                  placeholder='Email' 
                  inputMode='email'
                  value={userDetails.email}
                  autoComplete='off'
                />
                  {errors.email && <span>{errors.email}</span>}
              </div>
              <div>
                <input
                  onChange={handleChange}
                  name='password' 
                  type='password' 
                  placeholder='Password'
                  value={userDetails.password} 
                />
                {errors.password && <span>{errors.password}</span>}
              </div>
              <h3 onClick={()=> navigate('/reset_password')}>
                Forget Your Password?
              </h3>
              
              <div className='submit-btn'>
                <Zoom in={true}>
                  <button
                    className='sign-btn'
                    type='submit'   
                  >
                    {props.sign ? "Sign in" : "Sign up"}
                  </button>
                </Zoom>
              </div>
              {!props.sign &&
                <span style={
                  {paddingRight:"10px",
                    display:'flex',
                    justifyContent:"center",
                    alignItems:'center',
                    marginBottom:'10px'
                  }}>
                      <span style={{
                        paddingRight:"10px"
                      }}>
                        Verify Your Email
                      </span>
                  <Fab 
                    size="small"
                    onClick={handleVerify} 
                  >
                    <MarkEmailReadOutlinedIcon fontSize='small'/>
                  </Fab>
                </span>
              }
            </form>
            <div>
              <h4>
                {props.sign ? "Don't have an account yet?" : "Already have an account?"}
              </h4>
              <h2 onClick={handleClick}>
                  {props.sign ? "Create an account" : "Log in"}
              </h2>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Form;
