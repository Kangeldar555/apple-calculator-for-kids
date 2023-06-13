import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Help from './pages/Help/Help';

function App() {
  return (
    <div className="App">
      <header>
        <Header expand='md'/>
      </header>
      <section>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/help' element={<Help/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='*' element={<Navigate to="/" />}/>
        </Routes>
      </section>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
}

export default App;