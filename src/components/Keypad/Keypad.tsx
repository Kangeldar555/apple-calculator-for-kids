import React, { useState } from 'react';
import Button from '../Button/Button';

import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';

type Props = {};

const Keypad = (props: Props) => {

  const [size, setSize] = useState<'sm' | 'lg' | undefined>('lg')

  return (
    <>
      <ButtonGroup vertical>
        <ButtonGroup size={ size } aria-label="First group">
          <Button>7</Button>   
          <Button>8</Button>   
          <Button>9</Button>   
          <Button>/</Button> 
        </ButtonGroup>
        <ButtonGroup size={ size } aria-label="Second group">
          <Button>4</Button>   
          <Button>5</Button>   
          <Button>6</Button>   
          <Button>*</Button> 
        </ButtonGroup>
        <ButtonGroup size={ size } aria-label="First group">
          <Button>1</Button>   
          <Button>2</Button>   
          <Button>3</Button>   
          <Button>-</Button> 
        </ButtonGroup>
        <ButtonGroup size={ size } aria-label="First group">
          <Button>0</Button>   
          <Button>C</Button>   
          <Button>=</Button>   
          <Button>+</Button> 
        </ButtonGroup>
      </ButtonGroup>
    </>
  )
}

export default Keypad;