import React from 'react';
import Calculator from './components/Calculator/Calculator';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header>
        <Header expand='md'/>
      </header>
      <section>
        <Calculator/>
      </section>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
}

export default App;