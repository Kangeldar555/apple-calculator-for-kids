import React from 'react';
import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Help from './pages/Help/Help';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/help' element={<Help/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='*' element={<Navigate to="/" />}/>
      </Routes>
    </div>
  );
}

export default App;