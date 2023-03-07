import React from 'react';
import Display from '../Display/Display';
import Keypad from '../Keypad/Keypad';
import './Calculator.scss'

type Props = {}

const Calculator = (props: Props) => {
  return (
    <div className='calculatorContainer'>
      <Display input='2+2=4'/>
      <Keypad/>
    </div>
  )
}

export default Calculator;