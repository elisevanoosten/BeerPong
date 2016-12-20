// CHOOSE BETWEEN COMPUTER OR FRIEND

import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
class Room extends Component {

  state = {
    //socketId: undefined
  }

  componentWillMount() {
    const socketId = this.props.params.socketId;
    this.setState({socketId});
    console.log(this.state);
  }

  render() {
    const socketId = 343;
    return (
      <div>
        <p className='intro'>Hoeveel invloed hebben jou slechte vrienden? <br />
        Speel het spel en ontdek!</p>
        <Link className='startbutton' to='/demo'>Speel tegen de computer</Link>
        <Link className='startbutton' to={`/demo/${socketId}`}>Speel tegen een vriend</Link>
      </div>
    );
  }
}

Room.propTypes = {
  params: PropTypes.object,
};

export default Room;
