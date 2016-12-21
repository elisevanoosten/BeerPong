// CHOOSE BETWEEN COMPUTER OR FRIEND

import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const Room = props => {

  // componentWillMount() {
  //   const socketId = this.props.params.socketId;
  //   this.setState({socketId});
  // }

  // render() {
  const {mySocketId} = props;
  return (
      <div className='choose'>
        <p className='intro'>Hoeveel invloed hebben jou slechte vrienden? <br />
        Speel het spel en ontdek!</p>
        <div className='links'>
          <Link className='startbutton' to='/demo/computer'>TEGEN DE COMPUTER</Link>
          <Link className='startbutton' to={`/demo/${mySocketId}`}>TEGEN EEN SLECHTE VRIEND</Link>
        </div>
    </div>
  );
};

Room.propTypes = {
  mySocketId: PropTypes.string,
};

export default Room;
