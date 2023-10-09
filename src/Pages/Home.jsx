import React, {useState} from 'react'
import Form from '../Components/Form/Form'
import Formside from '../Components/Formside/Formside'

function Home() {
    const [status,setStatus] = useState(true)
    
    function handleBtn(){
      setStatus(!status)
    }
    
  return (
    <div>
       <Form
         onBtn={handleBtn}
         sign={status}  
       />
      <Formside
        onBtn={handleBtn}
        sign={status} 
      />
    </div>
  )
}

export default Home
