import React, { useEffect, useRef, useState } from 'react';
import './Display.scss';
import apple from '../../../images/apple.png';
import apple2 from '../../../images/apple2.png';
import kid from '../../../images/kid.png';
import AppleSlice from '../AppleSlice/AppleSlice';

// 'input' se utiliza para registrar los ingresos del teclado
// 'calculate' se utiliza para mostrar la expresión de la operación después de darle al botón igual.
type Props = {
    input: string;
    calculate: string;
};

const Display = ({ input, calculate }: Props) => {

  // Relación de aspecto de la imagen más usada (apple) (ancho/alto)
  const appleImageRatio = 9/11;

  // Máximas manzanas a mostrar en el display por contenedor
  const maxDisplayItems = 100;

  // Número de decimales para los redondeos
  const numDecimals = 2;

  const operators = '−+×÷=';
  const operatorsRegex = new RegExp(`([${operators}])`)
  
  const [numColumnsArr, setNumColumnsArr] = useState<number[]>([]);
  const lastOperation = useRef<string[]>([]);
  // Creamos una referencia mutable a un elemento de la interfaz de usuario con useRef
  const applesImagesElementRef = useRef<HTMLDivElement>(null);
  
  // Separamos cada elemento de la operación en un array utilizando una expresión regular que busca los operadores
  // (+, −, ×, ÷, y =) como separadores. Cada número u operador se almacena en una posición del array Operation.
  const operation=(input.split(operatorsRegex));
 
  // Usamos useEffect para calcular el número de columnas de los contenedores de manzanas dependiendo de las dimensiones del elemento referenciado
  useEffect(() => {    
    if (applesImagesElementRef.current) {

      // Obtenemos el ancho y el alto del contenedor de las manzanas
      // Todos los contenedores de manzanas tienen las mismas dimensiones por lo tanto solo se tiene referencia al primero
      const width =  applesImagesElementRef.current.offsetWidth;
      const height =  applesImagesElementRef.current.offsetHeight;
      const area = width*height;

      // Creamos una copia del arreglo actual de columnas
      const updatedNumColumnsArr = [...numColumnsArr];
      
      // Iteramos sobre la operación que determina el número de columnas por contenedor de manzanas
      // Usamos la expresión i+=2 para saltar unicamente sobre los datos numéricos de la operación
      for (let i=0; i < operation.length; i+=2) {
        const itemOperation = Number(operation[i]);
        let numColumns: number = 1;

        //Condicional para limitar número de items por contenedor
        if (itemOperation<=maxDisplayItems && itemOperation>0) {
          // Redondeamos al entero más proximo hacia arriba de operation[i]
          const integerPartOperation = Math.ceil(itemOperation);
          // Obtenemos el área y el lado de cada manzana
          const appleArea = area/integerPartOperation;
          const appleSide = Math.sqrt(appleArea);

          /* Calculamos el número de columnas necesarias
          Si el alto del contenedor de manzanas es menor al alto de la manzana con su respectivo ajuste de aspecto 
            se asigna un número de columnas igual que el total de manzanas que registre la operación en i.
          De lo contrario, se hace el calculo de columnas dividiendo el ancho del contenedor de manzanas por
            el ancho de la manzana con su respectivo ajuste de aspecto*/
          if (height < (appleSide/appleImageRatio)) {
            numColumns = integerPartOperation;          
          } else {
            numColumns = Math.round(width/(appleSide*appleImageRatio));
          };
        };        

        //Actualizamos el array con el número de columnas por contenedor de manzanas (i)
        updatedNumColumnsArr[i] = numColumns;
        setNumColumnsArr(updatedNumColumnsArr);
      };    
    };

    lastOperation.current = operation;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);
  
  // Genera un objeto de estilos dinámico principalmente con el número de columnas de cada contenedor de manzanas
  const applesImagesElementStyles = (i: number):React.CSSProperties => ({
      gridTemplateColumns: `repeat(${numColumnsArr[i]}, 1fr)`,
      // La visibilidad de los contenedores de manzanas se ajusta para evitar visualizaciones cuando el número de columnas está sin calcular
      visibility: operation.length === lastOperation.current.length && operation[i] === lastOperation.current[i]
      ? 'visible'
      : 'hidden'
  });
  
  // Mapeamos el array de 'operation' para generar los elementos de la calculadora  
  const operationElements = operation.map((item, index) => {
    if (/^[−+×÷=]$/.test(item)) {
      // Si el item es un operador, se genera un div con la clase 'operatorElement' y el contenido del operador
      return (
        <div
        key={`operator-${index}-${item}`}
        className='operatorElement'>
          {item}
        </div>
      );
    } else {
      // Si el item es un número, se genera un elemento JSX con manzanas o niños según
      // Si el operador que antecede es la división se renderiza 'kid'
      let renderedImages:JSX.Element | JSX.Element[];
      const number = Number(item);

      if (number<=maxDisplayItems && number>0 ) {
        // Si item es menor o igual al número máximo de manzanas a renderizar y distinto de '0', se genera un array
        renderedImages = Array.from({ length: number}, (_, i) => (
          <img
          key={`apple-${index}-${item}-${i}`}
          src={ operation[index-1] === operators[3] ? kid : apple }
          alt="Apple"/>
        ));
      } else if ( (operation.length===1 && item==='0' && !calculate) || item === '') {
        // No renderizar nada cuando no se ha hecho ningún calculo o no se a ingresado algún número
        renderedImages = [];
      } else {
        // De lo contrario se genera una unica manzana con el contenido del item superpuesto
        // Si es 0 o menor el número se aplica la clase numberZero a img
        renderedImages = (
          <div className='appleContainer'>
            <img className={number<=0 ? 'negativeNumber' : ''}
            src={ operation[index-1] === operators[3] ? kid : apple }
            alt="Apple"/>
            <p className='numberOverlay'> {number<=0 && number%1!==0 ? number.toFixed(numDecimals) : Math.trunc(number)} </p>
          </div>
        )
      }

      // Se retorna un div que contiene las imágenes de manzanas
      // Se establece la propiedad 'ref' solo en el primer contenedor de manzanas para obtener una referencia a él
      // Se le asignan los estilos dinámicos de 'gridTemplateColumns' usando 'applesImagesElementStyles'
      // Se renderiza la imagen apple en proporción a la fracción decimal si el número no es entero (Number(item)%1 > 0)
      return (
        <div
        key={`apples-${index}-${item}`}
        className='applesImagesElement'
        ref={index === 0 ? applesImagesElementRef : null}
        style={applesImagesElementStyles(index)}>          
          {renderedImages}
          {Number(item)%1 > 0 && <AppleSlice img={apple2} alt="Apple" decimalFraction={Number(item)%1}></AppleSlice>}
        </div>
      );
    };
  });

  /**
   * Esta función redondea el primer número de una expresión a un número específico de decimales.
   * @param expression La expresión matemática en forma de string o array de strings
   * @param numDecimals El número de decimales a redondear.
   * @returns La expresión con el primer número redondeado al número de decimales especificado.
   */
  const roundFirstNumber = (expression:string|string[], numDecimals_:number) => {

    const calculateArray = Array.isArray(expression) ? expression : expression.split(/([−+×÷=])/);

    return (Math.abs(Number(calculateArray[0]))%1 > 0
      ? Number(calculateArray[0]).toFixed(numDecimals_) + calculateArray.slice(1).join('')
      : expression
    )
  }

  return (
    <div className='displayContainer'>

      <div className='displayContainer-apples'>
        {operationElements}
      </div>
      
      <div className='displayContainer-calculate-input'>
        <div className='displayContainer-calculate'>
          {calculate && roundFirstNumber(calculate, numDecimals)}
        </div>    
        <div className='displayContainer-input'>
          {roundFirstNumber(operation, numDecimals)}
        </div>
      </div>

    </div>
  )
}

export default Display;