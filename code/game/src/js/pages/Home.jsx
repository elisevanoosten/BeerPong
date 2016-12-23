// CLICK START TO START

import React from 'react';
import {Link} from 'react-router';

const Home = () => {

  return (
    <div className='home'>
      <div className='startboard-container'>
        <img src='../../assets/img/startbord.png' width='40%' height='40%' className='startbord' />
      </div>
      <Link className='startbutton' to='/choose'>SPEEL HET SPEL</Link>
    </div>
  );

};

export default Home;
