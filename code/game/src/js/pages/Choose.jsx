// CHOOSE BETWEEN COMPUTER OR FRIEND

import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

const Room = props => {

  const {mySocketId} = props;
  return (
    <div>
      <p className='intro'>Hoeveel invloed hebben jou slechte vrienden? <br />
      Speel het spel en ontdek!</p>
      <Link className='startbutton' to='/demo/computer'>Speel tegen de computer</Link>
      <Link className='startbutton' to={`/demo/${mySocketId}`}>Speel tegen een vriend</Link>
    </div>
  );
};

Room.propTypes = {
  mySocketId: PropTypes.string,
};

export default Room;
