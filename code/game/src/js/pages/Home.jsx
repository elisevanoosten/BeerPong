// CLICK START TO START

import React from 'react';
import {Link} from 'react-router';

const Home = () => {

  return (
    <div className='home'>
      <img src='../../assets/img/startbord.png' width='40%' height='40%' className='startbord' />< br />
      <Link className='startbutton' to='/choose'>SPEEL HET SPEL!</Link>
    </div>
  );

};

export default Home;
