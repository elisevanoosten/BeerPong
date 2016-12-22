import React, {Component, PropTypes} from 'react';
import {Match, BrowserRouter as Router} from 'react-router';

import {Home, Start, Choose, Game} from '../pages/';

import io from 'socket.io-client';
// import Peer from 'peerjs';

class App extends Component {

  state = {
    // rooms: []
  };

  componentDidMount() {
    this.initSocket();
  }

  initSocket = () => {

    this.socket = io(`/`);
    this.socket.on(`init`, this.handleWSInit);

    // this.socket.on(`connect`, this.initPeer);

  }

  // initPeer = () => {
  //   const {id} = this.socket;
  //   this.peer = new Peer(id, {
  //     host: `dry-harbor-31700.herokuapp.com`,
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
                return (<Start urlSocketId={urlSocketId} mySocketId={mySocketId} />);
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
                  return (<Game player={`computer`} />);
                } else {
                  // console.log(includes(rooms, mySocketId));
                  if (urlSocketId === mySocketId) {
                    return (<Game player={`me`} mySocketId={mySocketId} urlSocketId={urlSocketId} rooms={rooms} />);
                  } else {
                    return (<Game player={`friend`} mySocketId={mySocketId} urlSocketId={urlSocketId} rooms={rooms} />);
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

App.propTypes = {
  urlSocketId: PropTypes.string,
  mySocketId: PropTypes.string
};

export default App;
