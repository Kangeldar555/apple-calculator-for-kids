import React from 'react';
import './Display.scss';

type Props = {
    input: string;
};

const Display = ({ input }: Props) => {
  return (
    <div className='displayContainer'>
      {input}
    </div>
  )
}

export default Display;