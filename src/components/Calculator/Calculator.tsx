import React, { useState } from 'react';
import { evaluate } from 'mathjs'; //Paquete matemático (npm install mathjs)
import Display from '../Display/Display';
import Keypad from '../Keypad/Keypad';
import './Calculator.scss'

type Props = {}

const Calculator = (props: Props) => {

  const [input, setInput] = useState<string>("0");
  const [calculate, setCalculate] = useState<string>("");

  //Función para calcular resultado
  const calculateResult = () => {
    setCalculate(input + "=");// Establecemos el cálculo actual
    setInput(evaluate(input).toString()); //Función del paquete mathjs que nos permite calcular el resultado, nos devuelve un number
  }

  //Función para agregar operadores al cálculo
  const addOperator = (operator: string) => {   
    setCalculate(""); //Limpiamos el calculo anterior en pantalla
    /* Validación para evitar la presencia de operadores consecutivos en el cálculo.
    Si el último carácter del input es un operador, se reemplaza el operador anterior por el nuevo operador.
    De lo contrario, se agrega el operador al input.*/
    // Nota: /[+\-\*\/]$/ expresión regular
    if (/[+\-\*\/]$/.test(input)) {     
      setInput(input.slice(0,-1) + operator)
    } else {
      setInput(input + operator)
    }
  }

  //Función para agregar números al cálculo
  const addNumber = (number: string) => {
    input === '0' ? setInput(number) : setInput(input + number);
  }

  //Función para borrar los datos
  const clear = () => {
    setCalculate("");   
    setInput("0");
  }

  const handleInput = (value: string) => {

    switch (value) {
      case 'C':
        clear();
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
      <Display input= { input } calculate= { calculate }/>
      <Keypad _handleKeypadInput={ handleInput }/>
    </div>
  )
}

export default Calculator;