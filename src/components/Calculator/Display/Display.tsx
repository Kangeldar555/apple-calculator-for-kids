import React, { useEffect, useRef, useState } from 'react';
import './Display.scss';
import apple from '../../../images/apple.png';

// 'input' se utiliza para registrar los ingresos del teclado
// 'calculate' se utiliza para mostrar la expresión de la operación después de darle al botón igual.
type Props = {
    input: string;
    calculate: string;
};

const Display = ({ input, calculate }: Props) => {
  
  // Relación de aspecto de la imagen usada (ancho/alto)
  const appleImageRatio = 1.231;

  const [operation, setOperation] = useState<string[]>([]);
  const [numColumnsArr, setNumColumnsArr] = useState<number[]>([]);  
  // Creamos una referencia mutable a un elemento de la interfaz de usuario con useRef
  const applesImagesElementRef = useRef<HTMLDivElement>(null);
  
  // Separamos cada elemento de la operación en un array utilizando una expresión regular que busca los operadores
  // (+, -, *, /, y =) como separadores. Cada número u operador se almacena en una posición del array Operation.
  useEffect(() => {
    setOperation(input.split(/([-+*/=])/));
  }, [input]);  
 
  // Usamos useEffect para calcular el número de columnas de los contenedores de manzanas dependiendo de las dimensiones del elemento referenciado
  // Los cálculos se ejecutan cada vez que cambie el array 'operation'
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
      for (let i = 0; i < operation.length; i+=2) {
        // Obtenemos el área y lado de cada manzana
        const appleArea = area/Number(operation[i]);
        const appleSide = Math.sqrt(appleArea);
        // Calculamos el número de columnas necesarias
        let numColumns = width/appleSide;
        // Hacemos un ajuste al número de columnas necesarias dependiendo de la relación de escala de la imagen usada si no es 1/1
        numColumns = Math.round(numColumns*appleImageRatio);
        updatedNumColumnsArr[i] = numColumns;
        setNumColumnsArr(updatedNumColumnsArr)
      }

      console.log(`Ancho del elemento: ${applesImagesElementRef.current.offsetWidth}`);
      console.log(`Altura del elemento: ${applesImagesElementRef.current.offsetHeight}`);
      console.log(operation.filter(item => !isNaN(Number(item))).length);
      console.log(operation.length)
      console.log(`operación: ${operation}`)
      console.log(`Array columnas: ${updatedNumColumnsArr}`)
    }
  }, [operation]);
  
  // Genera un objeto de estilos dinámico para el número de columnas de cada contenedor de manzanas
  const applesImagesElementStyles = (i: number) => ({
    gridTemplateColumns: `repeat(${numColumnsArr[i]}, 1fr)`
  })
  
  // Mapeamos el array de 'operation' para generar los elementos de la calculadora  
  const operationElements = operation.map((item, index) => {
    if (/^[-+*/=]$/.test(item)) {
      // Si el item es un operador, se genera un div con la clase 'operatorElement' y el contenido del operador
      return (
        <div
        key={`operator-${index}-${item}`}
        className='operatorElement'>
          {item}
        </div>
      );
    } else {
      // Si el item es un número, se genera un array de imágenes de manzanas usando Array.from
      const apples = Array.from({ length: Number(item) }, (_, i) => (
        <img
        key={`apple-${index}-${item}-${i}`}
        src={apple}
        alt="Apple"/>
      ));
      // Se retorna un div que contiene las imágenes de manzanas
      // Se establece la propiedad 'ref' solo en el primer contenedor de manzanas para obtener una referencia a él
      // Se le asignan los estilos dinámicos de 'gridTemplateColumns' usando 'applesImagesElementStyles'
      return (
        <div
        key={`apples-${index}-${item}`}
        className='applesImagesElement'
        ref={index === 0 ? applesImagesElementRef : null}
        style={applesImagesElementStyles(index)}>
          {apples}
        </div>
      );
    };
  });  

  return (
    <div className='displayContainer'>

      <div className='displayContainer-apples'>
        {operationElements}
      </div>
      
      <div className='displayContainer-calculate-input'>
        <div className='displayContainer-calculate'>
          {calculate}
        </div>    
        <div className='displayContainer-input'>
          {input}
        </div>
      </div>

    </div>
  )
}

export default Display;