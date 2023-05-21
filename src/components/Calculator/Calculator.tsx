import React, { useState } from 'react';
import { evaluate, fraction} from 'mathjs'; //Paquete matemático (npm install mathjs)
import Display from './Display/Display';
import Keypad from './Keypad/Keypad';
import './Calculator.scss'

type Props = {}

const Calculator = (props: Props) => {

  const [input, setInput] = useState<string>("0");
  const [calculate, setCalculate] = useState<string>("");

  //Función para calcular resultado
  const calculateResult = () => {
    setCalculate(input + "=");// Establecemos la expresión de la operación actual
    setInput(evaluate(input).toString()); //Función del paquete mathjs que nos permite calcular el resultado, nos devuelve un number
  }

  //Función para agregar operadores al cálculo
  const addOperator = (operator: string) => {   
    setCalculate(""); //Limpiamos la expresión de la operación anterior
    /* Validación para evitar la presencia de operadores consecutivos en el cálculo.
    Si el último carácter del input es un operador, se reemplaza el operador anterior por el nuevo operador.
    De lo contrario, se agrega el operador al input.*/
    // Nota: /[+\-\*\/]$/ expresión regular
    if (/[-+*/]$/.test(input)) {     
      setInput(input.slice(0,-1) + operator)
    } else {
      setInput(input + operator)
    }
  }

  //Función para agregar números al cálculo
  const addNumber = (number: string) => {
    if (calculate) setCalculate(""); //Limpiamos la expresión de la operación anterior
    input === "0" ? setInput(number) : setInput(input + number);
  }

  //Función para borrar los datos
  const clear = () => {  
    /*Esta función se encarga de borrar la entrada del usuario (input) y/o la expresión de la operación (calculate).
    Si calculate tiene algún valor, se reinicia a una cadena vacía e input se establece en "0".
    De lo contrario, se elimina el último dígito del input (a menos que tenga solo un dígito, en cuyo caso se establece en "0").*/
    if (calculate) {      
      setCalculate("");   
      setInput("0");
    }
    else {
      setInput(input.length > 1 ? input.slice(0, -1) : "0");
    }
  }

  const handleInput = (value: string) => {

    switch (value) {
      case "C":
        clear();
        break;
      case "=":
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