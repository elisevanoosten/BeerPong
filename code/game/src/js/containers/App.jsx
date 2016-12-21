import React, {Component} from 'react';
import {Match, BrowserRouter as Router} from 'react-router';

import {Home, Demo, Choose} from '../pages/';
import {GamePlay} from './';

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
              render={() => <Choose mySocketId={mySocketId} />}
            />

            <Match
              exactly pattern='/demo'
              component={Home}
            />
            <Match
              exactly pattern='/demo/:urlSocketId'
              render={props => {
                const {mySocketId} = this.state;
                const {urlSocketId} = props.params;
                return (<Demo urlSocketId={urlSocketId} mySocketId={mySocketId} />);
              }}
            />
            <Match
              exactly pattern='/game'
              component={Home}
            />
            <Match
              exactly pattern='/game/:urlSocketId'
              render={props => {
                const {mySocketId, rooms} = this.state;
                const {urlSocketId} = props.params;

                if (urlSocketId === `computer`) {
                  return (<GamePlay player={`computer`} />);
                } else {
                  // console.log(includes(rooms, mySocketId));
                  if (urlSocketId === mySocketId) {
                    return (<GamePlay player={`me`} mySocketId={mySocketId} urlSocketId={urlSocketId} rooms={rooms} />);
                  } else {
                    return (<GamePlay player={`friend`} mySocketId={mySocketId} urlSocketId={urlSocketId} rooms={rooms} />);
                  }
                }
              }}
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

// App.propTypes = {
//   urlSocketId: PropTypes.string
// };

export default App;
