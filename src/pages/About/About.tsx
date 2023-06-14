import React from "react";
import '../../styles/pages.scss'

const About = () => {
  return (
    <div className="aboutContainer pages">
      <h2>Acerca de</h2>
      <p>¡Bienvenido a Manzanitas Mágicas! Una calculadora interactiva diseñada para ayudar a los niños a aprender matemáticas de una manera divertida y educativa. Esta calculadora única permite a los niños realizar operaciones de suma, resta, multiplicación y división utilizando manzanas como referencia. ¡Aprender a contar y operar nunca ha sido tan divertido!</p>
      <h3>Características</h3>
      <ul>
        <li>
          <span>Interfaz fácil de usar y atractiva para los niños:</span> Nuestra calculadora presenta una interfaz intuitiva y colorida, diseñada especialmente para los más pequeños. Los botones grandes y los elementos visuales atractivos hacen que aprender matemáticas sea divertido y accesible.
        </li>
        <li>
          <span>Funciones de suma, resta, multiplicación y división:</span> Los niños pueden practicar diferentes operaciones matemáticas esenciales mediante nuestra calculadora. Las operaciones son interactivas y se muestran de manera visual para ayudar en la comprensión de los conceptos.
        </li>
        <li>
          <span>Representación visual de los números utilizando manzanas:</span> Hemos incorporado un enfoque visual único para ayudar a los niños a visualizar los números. Cada número se representa mediante una cantidad correspondiente de manzanas, lo que facilita el aprendizaje y la asociación de valores numéricos.
        </li>
        <li>
          <span>Advertencia de división por cero:</span> Nuestra calculadora incluye una advertencia de división por cero para evitar errores comunes. Esto ayuda a los niños a comprender la importancia de no dividir entre cero y promueve una comprensión sólida de las operaciones matemáticas.
        </li>
        <li>
          <span>Límite máximo de operaciones permitidas:</span> Para garantizar la eficiencia y el rendimiento de la calculadora, hemos establecido un límite máximo de operaciones. Esto evita que se realicen demasiadas operaciones consecutivas y ayuda a mantener un rendimiento óptimo.
        </li>
        <li>
          <span>Diseño responsive:</span> Nuestra calculadora está diseñada para adaptarse a diferentes dispositivos y tamaños de pantalla. Puedes disfrutar de la experiencia interactiva en computadoras de escritorio, tabletas y dispositivos móviles.
        </li>
      </ul>
    </div>
  );
};

export default About;