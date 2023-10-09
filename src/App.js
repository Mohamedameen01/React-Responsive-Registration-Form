import './App.css';
import Home from './Pages/Home'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Reset from './Pages/Reset'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route path='/reset_password' element={<Reset />} />
        </Routes>
      </Router>
       
    </div>
  );
}

export default App;

 
 