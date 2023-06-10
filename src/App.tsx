import React from 'react';
import Calculator from './components/Calculator/Calculator';
import Header from './components/Header/Header';
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
    </div>
  );
}

export default App;