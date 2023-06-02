import React, { useState } from 'react';
import { evaluate, format } from 'mathjs'; //Paquete matemático (npm install mathjs)
import Display from './Display/Display';
import Keypad from './Keypad/Keypad';
import './Calculator.scss';

const Calculator = () => {

  // Máximo número de operaciones
  const maxNumberOfOperations:number = 10;

  const operators = '−+×÷';

  const divisionByZeroWarning = '¡Ups! No se puede dividir por cero. Intenta con otro número, ¡uno distinto de cero!';
  const maxOperationsWarning = `¡Ups! Has alcanzado el número máximo de operaciones permitidas(${maxNumberOfOperations}). ¿Estás listo para obtener el resultado? Ingresa '='. ¡Diviértete calculando!`;

  const [input, setInput] = useState<string>('0');
  const [calculate, setCalculate] = useState<string>('');

  //Función para calcular resultado
  const calculateResult = () => {
    
    const endsWithOperatorRegex = new RegExp(`[${operators}]$`); // Expresión regular

    // Reemplaza los operadores utilizados en el proyecto con los operadores aceptados por la función `evaluate()`
    const replaceOperators = (toReplace: string) => {

      // Objeto de operadores(key) con su remplazo(value)
      const operatorsToReplace: {[key:string]:string} = {
        [operators[0]]:'-',
        [operators[2]]:'*',
        [operators[3]]:'/'
      };

      // Expresión regular para buscar operadores a reemplazar
      const regex = new RegExp(Object.keys(operatorsToReplace).join('|'), 'g');
      
      return toReplace.replace(regex, (operator) => operatorsToReplace[operator]);
    };

    // Se remueve el ultimo elemento de la expresión si es un operador
    let expression:string = endsWithOperatorRegex.test(input) ? input.slice(0,-1) : input;

    setCalculate(expression + '=');// Establecemos la expresión de la operación actual
    
    let result:number = evaluate(replaceOperators(expression));  // evaluate: función del paquete mathjs que nos permite calcular el resultado, nos devuelve un number    
    setInput(result <= 1e+20 ? result.toString() : format(result, {notation: 'fixed'})); // La función format con fixed nos permite mostrar el resultado sin notación científica
  }

  //Función para agregar operadores al cálculo
  const addOperator = (operator: string) => {

    // Expresiones regulares
    const endsWithOperatorRegex = new RegExp(`[${operators}]$`);
    const allOperatorsRegex = new RegExp(`[${operators}]`, 'g');

    //Calcula el número de operadores en la expresión
    const countOperators = (toCount:string, regex:RegExp) => {
      // Utilizamos el operador de fusión nula para asignar un array vacío en caso de que no haya coincidencias
      const matches = toCount.match(regex) ?? [];
      // Devolvemos la longitud del array matches
      return matches.length;
    };    

    if (calculate) setCalculate(''); //Limpiamos la expresión de la operación anterior
    /* Validación para evitar la presencia de operadores consecutivos en el cálculo.
    Si el último carácter del input es un operador, se reemplaza el operador anterior por el nuevo operador.
    De lo contrario, se agrega el operador al input si el número de operadores es menor al máximo configurado.*/
    if (endsWithOperatorRegex.test(input)) {     
      setInput(input.slice(0,-1) + operator);
    } else if (countOperators(input, allOperatorsRegex) < maxNumberOfOperations){
      setInput(input + operator);
    } else {
      alert (maxOperationsWarning)
    };
  };

  //Función para agregar números al cálculo
  const addNumber = (number: string) => {
    if (calculate) {
      setCalculate(''); //Limpiamos la expresión de la operación anterior
      setInput(number); //Agregamos el número reemplazando el resultado anterior
    } else if (input.endsWith(operators[3]) && number === '0') {
      // Validamos que no se pueda dividir por 0
      alert(divisionByZeroWarning)
    } else {
    input === '0' ? setInput(number) : setInput(input + number);
    }
  };

  //Función para borrar los datos
  const clear = () => {
    //Esta función se encarga de borrar la entrada del usuario (input) y/o la expresión de la operación (calculate).
    if (calculate) {
      //Si calculate tiene algún valor, se reinicia a una cadena vacía e input se establece en "0"     
      setCalculate('');   
      setInput('0');
    } else if (Math.abs(Number(input))%1>0) {
      // Si el input es un número decimal, se descarta la parte fraccionaria.
      setInput(Math.trunc(Number(input)).toString())
    } else if (input[input.length-2] === '-'){
      // Si el número es negativo y tiene un solo dígito se borra con todo y signo
      setInput(input.length > 2 ? (input.slice(0, -2)) : '0') 
    } else {
      // De lo contrario, se descarta el último dígito del input (a menos que tenga solo un dígito, en cuyo caso se establece en "0"
      setInput(input.length > 1 ? input.slice(0, -1) : '0');
    };
  };

  const handleInput = (value: string) => {

    switch (value) {
      case 'C':
        clear();
        break;
      case '=':
        calculateResult();
        break;
      case operators[0]:
      case operators[1]:
      case operators[2]:
      case operators[3]:
        addOperator(value);
        break;
      default:
        addNumber(value);
    };
  };

  return (
    <div className='calculatorContainer'>
      <div className="calculatorContainer-display">
        <Display input= { input } calculate= { calculate }/>
      </div>
      <div className='calculatorContainer-keypad'>
        <Keypad _handleKeypadInput={ handleInput }/>
      </div>
    </div>
  );
};

export default Calculator;