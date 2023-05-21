import React, { useEffect, useState } from 'react'
import './AppleSlice.scss';
import { fraction, number } from 'mathjs'; //Paquete matemático (npm install mathjs)

type Props = {
    img: string; // Ruta de la imagen
    decimalFraction : number; // Fracción decimal entre 0 y 1 que indica la porción de la manzana que se va a mostrar
    alt?: string // Texto alternativo para la imagen
};

const AppleSlice = ({ img, decimalFraction, alt}: Props) => {

  const maxSlices = 50;
    
  // Estado para controlar si la imagen se carga correctamente
  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    const image = new Image(); //Objeto imagen
    image.src = img;
    image.onload = () => { // Se ejecuta cuando la imagen se carga correctamente
      setImageError(false);
    };
    image.onerror = () => { // Se ejecuta cuando la imagen no se carga correctamente
      setImageError(true);
    };
  }, [img]); // Se ejecuta el efecto cada vez que cambia la ruta de la imagen
  
  // Función para convertir grados a radianes
  const degreesToRadians = (degrees:number) => {
    return (degrees * Math.PI) / 180;
  };

  /** Genera los puntos de un polígono de recorte para una región. 
   * El recorte se hace dependiendo de la fracción decimal pasada como parámetro.
   * @param decimalFraction_ Fracción decimal. Rango de 0 a 1
   * @returns los puntos del polígono de recorte a asignarle a la propiedad clipPath: `polygon(_)`
   */
  const cutPolygonByRegion = (decimalFraction_: number) => {
    // Coordenadas para definir la porción de la imagen que se va a mostrar
    const imgCenter:string = '50% 50%';
    const x1y1:string = '100% 0%'; // Esquina superior derecha
    const x2y2:string = '0% 0%'; // Esquina superior izquierda
    const x3y3:string = '0% 100%'; // Esquina inferior izquierda
    const x4y4:string = '100% 100%'; // Esquina inferior derecha
    const x5y5:string = '100% 50%'; // Centro lado derecho
    let x7y7:string; // Coordenadas para formar la recta con respecto al ángulo

    // Calcula las coordenadas del punto en base al ángulo proporcionado
    const calculatePoint = (angle_: number) => {
      // Constantes definidas de modo que la referencia del plano es en el centro con un alcance en la totalidad del contenedor
      const containerCenterX = 50;
      const containerCenterY = 50;
      const radius = 50;
      
      // Convertimos las coordenadas polares a coordenadas rectangulares
      const pointX = Math.cos(degreesToRadians(angle_)) * radius + containerCenterX;
      const pointY = Math.sin(degreesToRadians(angle_)) * radius + containerCenterY;
      
      return `${pointX}% ${pointY}%`;
    };

    const angle = 360*decimalFraction_; // Cálculo del ángulo basado en la fracción decimal (0-1)

    x7y7 = calculatePoint(angle); // Coordenadas para formar la recta con respecto al ángulo y el centro del contenedor

    // Creamos la cadena de puntos para definir el polígono según la porción de la imagen a mostrar
    const polygonPoints = `${decimalFraction_ > 0.75 ? `${x1y1}, ` : ''} 
    ${decimalFraction_ > 0.50 ? `${x2y2}, ` : ''}
    ${decimalFraction_ > 0.25 ? `${x3y3}, ` : ''}
    ${x4y4}, ${x5y5}, ${imgCenter}, ${x7y7}`;

    return polygonPoints
  };
  
  /** Genera los puntos de un polígono de recorte en secciones.
   * El recorte se hace dependiendo de la fracción decimal pasada como parámetro.
   * @param decimalFraction_ Fracción decimal. Rango de 0 a 1
   * @returns Los puntos del polígono de recorte a asignarle a la propiedad clipPath: `polygon(_)`
   */
  const slicePolygonIntoSections = (decimalFraction_: number) => {

    //Pasamos la fracción decimal a fracción propia y extraemos el denominador
    const properFraction = fraction(decimalFraction_); 
    let sliceCount = properFraction.d; 

    // Constantes definidas de modo que la referencia del plano es en el centro con un alcance en la totalidad del contenedor
    const containerCenterX = 50;
    const containerCenterY = 50;
    const radius = 50;

    const angle = 360 / sliceCount; // Angulo de cada sección
    let polygonPoints = '';    
    let radiusIntersection: number = 0;    

    /**
     * Calcula el espacio de separación entre las porciones de la imagen en función del número de porciones deseadas.
     * La fórmula utilizada es: y = -0.03125 * x + 2.0625, donde 'y' representa el espacio de separación y 'x' representa el número de porciones
     * slices: Número de porciones deseadas
     * Retorna el espacio de separación entre las porciones en grados
     */
    const calculateSliceSpacing = (slices: number) => {
      return -0.03125*slices+2.0625
    }

    // Iteramos sobre cada sección
    for (let i = 0; i < sliceCount; i++) {
      const sliceSpacing = calculateSliceSpacing(sliceCount);
      const startAngle = i * angle;
      const endAngle = (i + 1) * angle;   

      // Cálculo de los puntos para la sección actual con espaciado
      const pointX1 = Math.cos(degreesToRadians(startAngle+sliceSpacing/2)) * radius + containerCenterX;
      const pointY1 = Math.sin(degreesToRadians(startAngle+sliceSpacing/2)) * radius + containerCenterY;      
      const pointX3 = Math.cos(degreesToRadians(endAngle-sliceSpacing/2)) * radius + containerCenterX;
      const pointY3 = Math.sin(degreesToRadians(endAngle-sliceSpacing/2)) * radius + containerCenterY;

      // Calculamos el radio para la intersección de las rectas que forman espaciados paralelos entre si
      if (i === 0) {
        radiusIntersection = (pointX3 -pointX1) / (  Math.cos(degreesToRadians(startAngle+180)) - Math.cos(degreesToRadians(endAngle-180)) );
      }

      const pointX2 = Math.cos(degreesToRadians(startAngle+180)) * radiusIntersection + pointX1;
      const pointY2 = Math.sin(degreesToRadians(startAngle+180)) * radiusIntersection + pointY1;
      
       // Agregamos los puntos del polígono de recorte
      polygonPoints += `${pointX1}% ${pointY1}%, ${pointX2}% ${pointY2}%, ${pointX3}% ${pointY3}%, `;
    }

    return polygonPoints.slice(0, -2); // Elimina la última coma y espacio
  };

  const styles = {
    cutPolygonStyle:{
      clipPath: `polygon(${cutPolygonByRegion(decimalFraction)})`,
      backgroundImage: `url(${img})`
    },
    slicePolygonStyle:
    maxSlices >= fraction(decimalFraction).d
    ? {
      clipPath: `polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%, ${slicePolygonIntoSections(decimalFraction)})`
    }
    : {}
  }

  //Si la imagen no se carga correctamente, se ajusta los estilos para mostrar el atributo alt adecuadamente
  return (
  <div className="appleSliceContainer">
    <div className="slicePolygon" style={imageError ? {} : styles.slicePolygonStyle}>
      <div className="cutPolygon" style={styles.cutPolygonStyle}></div>
      <img src={img} alt={alt} style={imageError ? { opacity: 1 } : {}} />
    </div>
  </div>
  )
}

export default AppleSlice