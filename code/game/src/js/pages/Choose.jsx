// CHOOSE BETWEEN COMPUTER OR FRIEND

import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import io from 'socket.io-client';
// import Peer from 'peerjs';

class Room extends Component {

  state = {
  }

  componentDidMount() {
    this.initSocket();
  }

  initSocket = () => {
    this.socket = io(`/`);
    // this.socket.on(`connect`, this.initPeer);
    this.socket.on(`init`, this.handleWSInit);
  }

  // initPeer = () => {
  //   const {id} = this.socket;
  //   this.peer = new Peer(id, {
  //     host: `cryptic-island-50117.herokuapp.com`,
  //     port: ``,
  //     path: `/api`,
  //     secure: true
  //   });
  //
  //   this.socket = io(`/`);
  //   console.log(window.location.href);
  //   this.socket.on(`init`, this.handleWSInit);
  // }

  handleWSInit = socketId => {
    this.setState({mySocketId: socketId});
    // this.socket.emit(`subscribe`, socketId);
  }

  render() {
    const {mySocketId} = this.state;
    return (
      <div>
        <p className='intro'>Hoeveel invloed hebben jou slechte vrienden? <br />
        Speel het spel en ontdek!</p>
        <Link className='startbutton' to='/demo'>Speel tegen de computer</Link>
        <Link className='startbutton' to={`/demo/${mySocketId}`}>Speel tegen een vriend</Link>
      </div>
    );
  }
}

Room.propTypes = {
  params: PropTypes.object,
};

export default Room;
