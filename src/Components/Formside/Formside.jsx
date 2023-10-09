import React from 'react'
import './Formside.css'
import Zoom from '@mui/material/Zoom';


function Formside(props) {
    function handleClick(){
        props.onBtn()
    }

  return (
    <div className='right'>
        <div id={props.sign ? 'side-up-container' : 'side-in-container'}>
            <h1>
                {props.sign ?"Hello, Friend!" : "Welcome Back"}
            </h1>
            <p>
                {props.sign ? "Enter your personal details and start journey with us"
                : "To keep connected with us please login with your personal info"}
            </p>
            <Zoom in={true}>
                <button onClick={handleClick}>
                    {props.sign ? "Sign up" : "sign in"}
                </button>
            </Zoom>
        </div>
    </div>
  )
}

export default Formside
