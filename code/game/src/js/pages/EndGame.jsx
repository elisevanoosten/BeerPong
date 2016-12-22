// CLICK START TO START

import React from 'react';
import {Link} from 'react-router';

const EndGame = () => {

  return (
    <div>
      <p className='intro'>Hoeveel invloed hebben jou slechte vrienden?<br />
      Speel het spel en ontdek!</p>
      <div className='links'>
        <Link className='startbutton' to='/choose'>TEGEN IEMAND ANDERS?</Link>
        <Link className='startbutton' to='/game'>REMATCH</Link>
      </div>
    </div>
  );

};

export default EndGame;
