import React from 'react';
import './Keypad.scss';
import Button from '../Button/Button';
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';
import useKeyboardPress from '../../../hooks/useKeyboardPress';

type Props = {
  handleKeypadInput: (value: string) => void;
};

const Keypad = ({ handleKeypadInput }: Props) => {

  useKeyboardPress(handleKeypadInput);
  
  const handleScreenKeypadInput = (input: string) => {
    handleKeypadInput(input); //Función para manejar 'input' en el componente padre
  };
  
  return (
    <>
      <ButtonGroup className='keypadContainer' vertical>
        <ButtonGroup aria-label="First group">
          <Button _onClick={ handleScreenKeypadInput }>7</Button>   
          <Button _onClick={ handleScreenKeypadInput }>8</Button>   
          <Button _onClick={ handleScreenKeypadInput }>9</Button>   
          <Button _onClick={ handleScreenKeypadInput }>÷</Button> 
        </ButtonGroup>
        <ButtonGroup aria-label="Second group">
          <Button _onClick={ handleScreenKeypadInput }>4</Button>   
          <Button _onClick={ handleScreenKeypadInput }>5</Button>   
          <Button _onClick={ handleScreenKeypadInput }>6</Button>   
          <Button _onClick={ handleScreenKeypadInput }>×</Button> 
        </ButtonGroup>
        <ButtonGroup aria-label="First group">
          <Button _onClick={ handleScreenKeypadInput }>1</Button>   
          <Button _onClick={ handleScreenKeypadInput }>2</Button>   
          <Button _onClick={ handleScreenKeypadInput }>3</Button>   
          <Button _onClick={ handleScreenKeypadInput }>−</Button> 
        </ButtonGroup>
        <ButtonGroup aria-label="First group">
          <Button _onClick={ handleScreenKeypadInput }>0</Button>   
          <Button _onClick={ handleScreenKeypadInput }>C</Button>   
          <Button _onClick={ handleScreenKeypadInput }>=</Button>   
          <Button _onClick={ handleScreenKeypadInput }>+</Button> 
        </ButtonGroup>
      </ButtonGroup>
    </>
  )
}

export default Keypad;