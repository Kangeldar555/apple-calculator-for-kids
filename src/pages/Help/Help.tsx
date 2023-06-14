import React from 'react';
import '../../styles/pages.scss';

const Help = () => {
  return (
    <div className="helpContainer pages">
      <h2>Ayuda</h2>
      <p>¡Bienvenido a la sección de ayuda de Manzanitas Mágicas! Aquí encontrarás información y guías útiles para sacar el máximo provecho de nuestra calculadora interactiva. Si tienes alguna pregunta o necesitas asistencia, ¡estamos aquí para ayudarte!</p>

      <h3>Guía de Uso</h3>
      <ol>
        <li>
          <span>Operaciones Básicas:</span> Utiliza los botones de suma (+), resta (−), multiplicación (×) y división (÷) para realizar operaciones matemáticas básicas. Simplemente haz clic en los números y operadores para construir tus expresiones.
        </li>
        <li>
          <span>Visualización de Resultados:</span> La calculadora mostrará el resultado de la operación una vez se de clic en el operador igual (=). El resultado se representará visualmente mediante manzanas y se mostrará numéricamente en la pantalla de la calculadora.
        </li>
        <li>
          <span>División por Cero:</span> Ten en cuenta que la división entre cero no está permitida y la calculadora mostrará un mensaje de advertencia si intentas hacerlo. Esto es para asegurar la precisión y evitar errores matemáticos.
        </li>
        <li>
          <span>Limite de Operaciones:</span> La calculadora tiene un límite máximo de operaciones permitidas. Si alcanzas este límite, deberás calcular el resultado o hacer ajustes en la operación.
        </li>
      </ol>

      <h3>
        Preguntas Frecuentes
      </h3>
      <ol>
        <li>
          <span>¿Cómo puedo reiniciar la calculadora?</span>
          <br />
          Puedes reiniciar la calculadora haciendo clic en el botón de "Reiniciar" o refrescando la página.
        </li>
        <li>
          <span>¿La calculadora permite ingresar números negativos?</span>
          <br />
          No, aunque si está permitido realizar operaciones que devuelvan números negativos como resultado.
        </li>
        <li>
          <span>¿La calculadora tiene límite en el tamaño de los números?</span>
          <br />
          No hay un límite específico en el tamaño de los números. Sin embargo, ten en cuenta que números extremadamente grandes pueden afectar el rendimiento y la visualización de la calculadora.
        </li>
      </ol>

      <h3>Contacto</h3>
      <p>Si tienes alguna pregunta adicional o necesitas asistencia adicional, no dudes en ponerte en contacto conmigo. Puedes enviarme un correo electrónico a dannyben555@gmail.com.</p>
    </div>
  );
};

export default Help;