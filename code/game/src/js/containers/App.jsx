import React, {Component} from 'react';
import {Match, BrowserRouter as Router} from 'react-router';

import {Home, Demo, Game, Choose} from '../pages/';

import io from 'socket.io-client';
// import Peer from 'peerjs';

class App extends Component {

  state = {
    // rooms: []
  };

  componentDidMount() {
    this.initSocket();
    console.log(`rerender`);
  }

  initSocket = () => {

    this.socket = io(`/`);
    this.socket.on(`init`, this.handleWSInit);

    // this.socket.on(`connect`, this.initPeer);

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
    if (mySocketId) {
      return (
        <Router>
          <main>
            <Match
              exactly pattern='/'
              component={Home}
            />
            <Match
              pattern='/choose'
              component={Choose}
            />
            <Match
              exactly pattern='/demo'
              component={Demo}
            />
            <Match
              exactly pattern='/demo/:mySocketId'
              component={Demo}
            />
            <Match
              exactly pattern='/game/:urlSocketId'
              // component={Game}
              render={() => <Game mySocketId={mySocketId} />}
            />
            <Match
              exactly pattern='/game'
              component={Game}
            />
          </main>
        </Router>
      );
    } else {
      return (
        <main></main>
      );
    }
  }
}

export default App;
