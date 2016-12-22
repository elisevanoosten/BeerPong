// CLICK START TO START

import React from 'react';
import {Link} from 'react-router';

const EndGame = props => {
  console.log(props.location.pathname);
  if (props.location.pathname === `/EndGame/barier`) {
    console.log(`door bariere`);
    return (
      <div>
        <p className='intro'>TEGEN GEREDEN</p>
        <div className='links'>
          <Link className='startbutton' to='/choose'>TEGEN IEMAND ANDERS?</Link>
          <Link className='startbutton' to='/game'>REMATCH</Link>
        </div>
      </div>
    );
  } else if (props.location.pathname ===  `/EndGame/drink`) {
    console.log(`door pintje`);
    return (
      <div>
        <p className='intro'>TEVEEL GEDRONKEN</p>
        <div className='links'>
          <Link className='startbutton' to='/choose'>TEGEN IEMAND ANDERS?</Link>
          <Link className='startbutton' to='/game'>REMATCH</Link>
        </div>
      </div>
    );
  } else if (props.location.pathname ===  `/EndGame`) {
    console.log(`gewonnen`);
    return (
      <div>
        <p className='intro'>JOEPIE</p>
        <div className='links'>
          <Link className='startbutton' to='/choose'>TEGEN IEMAND ANDERS?</Link>
          <Link className='startbutton' to='/game'>REMATCH</Link>
        </div>
      </div>
    );
  }
};

export default EndGame;
