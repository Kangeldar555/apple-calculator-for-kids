import React from 'react';
import './Display.scss';

type Props = {
    input: string;
    calculate?: string;
};

const Display = ({ input, calculate }: Props) => {
  return (
    <div className='displayContainer'>
      <div className='displayContainer-calculate'>
       {calculate}
      </div>    
      <div className='displayContainer-input'>
       {input}
      </div>    
    </div>
  )
}

export default Display;