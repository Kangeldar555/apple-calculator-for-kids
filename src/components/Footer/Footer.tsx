import React from "react";
import './Footer.scss';

const Footer = () => {

  const footerText = '© 2023 Danny Benavides. Todos los derechos reservados.';

  return (
    <div className="footerContainer">
      <span>{ footerText }</span>
    </div>
  );
};

export default Footer;