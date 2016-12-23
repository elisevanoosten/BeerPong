// CLICK START TO START

import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const EndGame = props => {

  const {end} = props;
  let text;

  if (end === `barier`) {
    text = `AIAIAI! Je bent niet thuis geraakt. De volgende keer toch wat beter opletten!`;
  } else if (end ===  `drink`) {
    text = `Oh nee! Je bent niet thuis geraakt. Misschien toch iets minder drinken?`;
  } else if (end ===  `won`) {
    text = `Hoera! Je bent heelhuids thuis geraakt. Zeer verantwoordlijk van jou.`;
  } else if (end === `barierfriend`) {
    text = `AIAIAI! Je vriend is tegen een wegobstakel gereden!`;
  } else if (end ===  `drinkfriend`) {
    text = `Mensen zat voeren is gevaarlijk! Je vriend raakte niet thuis`;
  } else if (end ===  `wonfriend`) {
    text = `Hoera, je vriend heeft veel geluk gehad en is ondanks alle alcohol dat je hem voerde toch nog thuis geraakt`;
  }

  return (
    <div className='endpage'>
      <p className='intro'>{text}</p>
      <div className='links'>
        <Link className='startbutton' to='/choose'>Nog een keer spelen?</Link>
      </div>
    </div>
  );
};

EndGame.propTypes = {
  end: PropTypes.string,
  urlSocketId: PropTypes.string,
};

export default EndGame;
