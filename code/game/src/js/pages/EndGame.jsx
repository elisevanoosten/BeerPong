// CLICK START TO START

import React from 'react';
import {Link} from 'react-router';

const EndGame = props => {

  const {end, urlSocketId} = props;
  let text;

  if (end === `barier`) {
    console.log(`door bariere`);
    text = `BARIERE`;
  } else if (end ===  `drink`) {
    console.log(`door pintje`);
    text = `TEVEEL`;
  } else if (end ===  `won`) {
    console.log(`gewonnen`);
    text = `JOEPIE`;
  }

  return (
    <div>
      <p className='intro'>{text}</p>
      <div className='links'>
        <Link className='startbutton' to='/choose'>TEGEN IEMAND ANDERS?</Link>
        <Link className='startbutton' to={`/game/${urlSocketId}`}>REMATCH</Link>
      </div>
    </div>
  );
};

export default EndGame;
