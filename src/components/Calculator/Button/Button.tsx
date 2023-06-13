import React from 'react';
import './Button.scss';
import BsButton from 'react-bootstrap/Button';

type Props = {
  children: string;
  _onClick: (buttonContent: string) => void;
}

const Button = ({ children, _onClick }: Props) => {

  //Tipos de estilos para un button en bootstrap
  let style: 'primary' 
  | 'secondary' 
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'light'
  | 'dark'
  | 'link'; 

  const numbers = '0123456789';
  const operators = '−+×÷';

  if (numbers.includes(children)) {
    style = 'warning' ; //Estilo números
  } else if (operators.includes(children)) {
    style = 'dark'; //Estilo operadores
  } else if (children === '=') {
    style = 'success'; //Estilo botón'igual'
  } else {
    style = 'danger'; //Estilo botón 'clear' y otros
  }

  return (
    <BsButton  className='BsButton'
    variant={ style }
    onClick={() => _onClick(children)}>
      { children }     
    </BsButton>
  )
}

export default Button;