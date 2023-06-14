import React, { useState, useRef } from 'react';
import { evaluate, format } from 'mathjs'; //Paquete matemático (npm install mathjs)
import Display from './Display/Display';
import Keypad from './Keypad/Keypad';
import WarningModal from './WarningModal/WarningModal';
import './Calculator.scss';

const Calculator = () => {

  // Máximo número de operaciones
  const maxNumberOfOperations:number = 10;

  const operators = '−+×÷';

  const [showWarning, setShowWarning] = useState<boolean>(false)
  const warningContentRef = useRef<[string, string]>(['', '']);
  const divisionByZeroWarningTitle = '¡Ups! No se puede dividir por cero 😐';
  const divisionByZeroWarning = `Parece que estás intentando dividir por cero 🙈.
  Recuerda que en las matemáticas, dividir por cero no tiene solución ❌.
  ¡Prueba con otro número diferente de cero y sigue explorando las operaciones matemáticas! 💪`
  const maxOperationsWarningTitle = '¡Vaya! ¡Demasiadas operaciones! 😕'
  const maxOperationsWarning = `Has alcanzado el número máximo de operaciones permitidas (${maxNumberOfOperations}) 🧮.
  ¡Ya casi lo tienes! Ingresa '=' para obtener el resultado 🎯.
  ¡Sigue divirtiéndote calculando! 🚀`;

  const [input, setInput] = useState<string>('0');
  const [calculate, setCalculate] = useState<string>('');
  const isResultCalculated = useRef<boolean>(false);

  const emptyFunction = () => {};

  //Función para calcular resultado
  const calculateResult = () => {
    isResultCalculated.current = true;
    setInput((prevInput) => {
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
      let expression:string = endsWithOperatorRegex.test(prevInput) ? prevInput.slice(0,-1) : prevInput;

      setCalculate(expression + '=');// Establecemos la expresión de la operación actual
      
      let result:number = evaluate(replaceOperators(expression));  // evaluate: función del paquete mathjs que nos permite calcular el resultado, nos devuelve un number    
      return result <= 1e+20 ? result.toString() : format(result, {notation: 'fixed'}); // La función format con fixed nos permite mostrar el resultado sin notación científica
    });
  }

  //Función para agregar operadores al cálculo
  const addOperator = (operator: string) => {
    if (isResultCalculated.current) {
      isResultCalculated.current = false;
      setCalculate('');//Limpiamos la expresión de la operación anterior
    }

    setInput((prevInput:string) => {

      // Si el último operador ingresado es igual al operador actual, se interrumpe la función addOperator
      if (operator === prevInput.slice(-1)) return prevInput;

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
      
      /* Validación para evitar la presencia de operadores consecutivos en el cálculo.
      Si el último carácter del input es un operador, se reemplaza el operador anterior por el nuevo operador.
      De lo contrario, se agrega el operador al input si el número de operadores es menor al máximo configurado.*/
      if (endsWithOperatorRegex.test(prevInput)) {     
        return prevInput.slice(0,-1) + operator;
      } else if (countOperators(prevInput, allOperatorsRegex) < maxNumberOfOperations){
        return prevInput + operator;
      } else {
        setShowWarning(true);
        warningContentRef.current = [maxOperationsWarningTitle, maxOperationsWarning];
        return prevInput;
      };
    });
  };

  //Función para agregar números al cálculo
  const addNumber = (number: string) => {
    setInput((prevInput:string) => {
      if (isResultCalculated.current) {
        isResultCalculated.current = false;
        setCalculate(''); //Limpiamos la expresión de la operación anterior
        return number; //Agregamos el número reemplazando el resultado anterior
      } else if (prevInput.endsWith(operators[3]) && number === '0') {
        // Validamos que no se pueda dividir por 0
        setShowWarning(true);
        warningContentRef.current = [divisionByZeroWarningTitle, divisionByZeroWarning];
        return prevInput
      } else {
        return prevInput === '0' ? number : prevInput + number;
      }
    });
  };

  //Función para borrar los datos
  const clear = () => {
    //Esta función se encarga de borrar la entrada del usuario (input) y/o la expresión de la operación (calculate).
    setInput((prevInput:string) => {
      if (isResultCalculated.current) {
        // Borra calculate y establece input en '0' cuando ya se ha realizado el cálculo
        setCalculate('');
        return '0';
      } else if (Math.abs(Number(prevInput))%1>0) {
        // Si el input es un número decimal, se descarta la parte fraccionaria.
        return Math.trunc(Number(prevInput)).toString();
      } else if (prevInput[prevInput.length-2] === '-'){
        // Si el número es negativo y tiene un solo dígito se borra con todo y signo
        return prevInput.length > 2 ? (prevInput.slice(0, -2)) : '0';
      } else {
        // De lo contrario, se descarta el último dígito del input (a menos que tenga solo un dígito, en cuyo caso se establece en "0"
        return prevInput.length > 1 ? prevInput.slice(0, -1) : '0';
      };
    });
  };

  const handleInput = (value: string) => {

    switch (value) {
      case 'Delete':
        isResultCalculated.current = true; // Comodín para borrar todo      
        clear();
        break;
      case 'C':
        clear();
        break;
      case '=':
        if (!isResultCalculated.current) calculateResult(); // Se verifica si aún no se a calculado el resultado
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
        <Keypad handleKeypadInput={ showWarning ? emptyFunction : handleInput }/>
      </div>
      <WarningModal
        show={showWarning}
        onHide={() => setShowWarning(false)}
        content={warningContentRef.current}
      />
    </div>
  );
};

export default Calculator;