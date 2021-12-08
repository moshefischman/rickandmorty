
import ReactDOM from 'react-dom';


import {BrowserRouter, Routes, Route } from "react-router-dom";

import App from './App'
import Home from './routes/Home';
import NotFound from './routes/NotFound'
import About from './routes/About';
import Characters from './routes/Characters';



ReactDOM.render(
  <BrowserRouter>
    
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />  
            <Route path="characters" element={<Characters />} />
            <Route path="about" element={<About />} />
            
            <Route path="*" element={<NotFound />} />
          </Route>       
        </Routes>
    
  </BrowserRouter>,
  document.getElementById('root')
);


