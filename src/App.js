
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink
} from "react-router-dom";
import Home from './components/Home';
import Pokemons from './components/Pokemons';
import Pokecard from './components/Pokecard';


function App() {

  
  return (
    <div className="container">
      <h1>Pokemons Moshe Fischman</h1>
      <Router>
        <div className="container mt-5">
          <div className="btn-group">
            <NavLink to="/" className="btn btn-dark">Home</NavLink>
            <NavLink to="/pokemons" className="btn btn-dark">Pokemons</NavLink>
          </div>
          <hr/>
          <Routes>
            <Route path='/' element={<Home/>} />        
            <Route path="/pokemons" element={<Pokemons />} />
            <Route path="/pokecard/:parname" element={<Pokecard />}  />
        
   
          </Routes>
        </div>
      </Router>
        
    </div>
  );
}

export default App;
