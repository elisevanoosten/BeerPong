// CLICK START TO START

import React from 'react';
import {Link} from 'react-router';

const EndGame = props => {

  const {end, urlSocketId} = props;
  let text;

  if (end === `barier`) {
    text = `Helaas, Je bent niet thuis geraakt. Jouw rustplaast bevind zich op de weg naar jouw huis.`;
  } else if (end ===  `drink`) {
    text = `Helaas, Je bent niet thuis geraakt. Misschien toch iets minder drinken? je onderweg naar jouw huis gestrand.`;
  } else if (end ===  `won`) {
    text = `Proficiat, je bent heelhuids thuis geraakt. Zeer verantwoordlijk van jou.`;
  }

  return (
    <div className='endpage'>
      <p className='intro'>{text}</p>
      <div className='links'>
        <Link className='startbutton' to='/choose'>TEGEN IEMAND ANDERS?</Link>
        <Link className='startbutton' to={`/game/${urlSocketId}`}>REMATCH</Link>
      </div>
    </div>
  );
};

export default EndGame;
