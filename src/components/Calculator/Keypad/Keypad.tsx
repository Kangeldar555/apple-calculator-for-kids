import React, { useState } from 'react';
import './Keypad.scss';
import Button from '../Button/Button';
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';

type Props = {
  _handleKeypadInput: (value: string) => void;
};

const Keypad = ({ _handleKeypadInput }: Props) => {
  
  const handleKeypadInput = (input: string) => {
    _handleKeypadInput(input); //Función para manejar 'input' en el componente padre
  };
  
  return (
    <>
      <ButtonGroup className='keypadContainer' vertical>
        <ButtonGroup aria-label="First group">
          <Button _onClick={ handleKeypadInput }>7</Button>   
          <Button _onClick={ handleKeypadInput }>8</Button>   
          <Button _onClick={ handleKeypadInput }>9</Button>   
          <Button _onClick={ handleKeypadInput }>÷</Button> 
        </ButtonGroup>
        <ButtonGroup aria-label="Second group">
          <Button _onClick={ handleKeypadInput }>4</Button>   
          <Button _onClick={ handleKeypadInput }>5</Button>   
          <Button _onClick={ handleKeypadInput }>6</Button>   
          <Button _onClick={ handleKeypadInput }>×</Button> 
        </ButtonGroup>
        <ButtonGroup aria-label="First group">
          <Button _onClick={ handleKeypadInput }>1</Button>   
          <Button _onClick={ handleKeypadInput }>2</Button>   
          <Button _onClick={ handleKeypadInput }>3</Button>   
          <Button _onClick={ handleKeypadInput }>−</Button> 
        </ButtonGroup>
        <ButtonGroup aria-label="First group">
          <Button _onClick={ handleKeypadInput }>0</Button>   
          <Button _onClick={ handleKeypadInput }>C</Button>   
          <Button _onClick={ handleKeypadInput }>=</Button>   
          <Button _onClick={ handleKeypadInput }>+</Button> 
        </ButtonGroup>
      </ButtonGroup>
    </>
  )
}

export default Keypad;