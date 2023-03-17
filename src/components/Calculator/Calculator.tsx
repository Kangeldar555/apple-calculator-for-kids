import React, { useState } from 'react';
import { evaluate } from 'mathjs'; //Paquete matemático (npm install mathjs)
import Display from '../Display/Display';
import Keypad from '../Keypad/Keypad';
import './Calculator.scss'

type Props = {}

const Calculator = (props: Props) => {

  const [input, setInput] = useState('0');

  //Función para calcular resultado
  const calculateResult = () => {
    if (input) { // Si el input está vacío se entiende como False
      setInput(evaluate(input)); //Función del paquete mathjs que nos permite calcular el resultado
    } else {
      alert('Ingresar valores para realizar los cálculos');
    }
  }

  //Función para agregar operadores al calculo
  const addOperator = (operator: string) => {
    setInput(input + operator)
  }

  //Función para agregar números al calculo
  const addNumber = (number: string) => {
    input == '0' ? setInput(number) : setInput(input + number);
  }

  const handleInput = (value: string) => {

    switch (value) {
      case 'C': // Clear
        setInput('0');
        break;
      case '=':
        calculateResult();
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        addOperator(value);
        break;
      default:
        addNumber(value);
    }
  };

  return (
    <div className='calculatorContainer'>
      <Display input= { input }/>
      <Keypad _handleKeypadInput={ handleInput }/>
    </div>
  )
}

export default Calculator;