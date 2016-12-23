import React, {Component, PropTypes} from 'react';
import {Match, Miss, BrowserRouter as Router} from 'react-router';

import {Home, Start, Choose, Game, EndGame} from '../pages/';

import io from 'socket.io-client';
import Peer from 'peerjs';

class App extends Component {

  state = {
    rooms: []
  };

  componentDidMount() {
    this.initSocket();
  }

  initSocket = () => {

    this.socket = io(`/`);
    this.socket.on(`init`, this.handleWSInit);

    this.socket.on(`connect`, this.initPeer);
    // this.socket.on(`joinRoom`, this.handleWSJoin);
  }

  initPeer = () => {
    const {id} = this.socket;
    this.peer = new Peer(id, {
      host: `dry-harbor-31700.herokuapp.com`,
      // host: `localhost`,
      port: `9000`,
      path: `/api`,
      secure: true
    });

    this.socket = io(`/`);
    this.socket.on(`init`, this.handleWSInit);
  }

  handleWSInit = socketId => {
    this.setState({mySocketId: socketId});
  }

  handleWSJoin = rooms => {
    console.log(rooms);
    console.log(`jo`);
    this.setState({rooms});
  }

  checkplayer(mySocketId, urlSocketId) {
    if (urlSocketId === `computer`) {
      const player = `computer`;
      return player;
    } else if (urlSocketId === mySocketId) {
      const player = `me`;
      return player;
    } else {
      const player = `friend`;
      return player;
    }
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
              exactly pattern='/start'
              component={Home}
            />
            <Match
              exactly pattern='/start/:urlSocketId'
              render={props => {
                const {mySocketId, rooms} = this.state;
                const {urlSocketId} = props.params;
                console.log(urlSocketId === `computer`);

                if (urlSocketId === mySocketId) {
                  return (
                    <Start mySocketId={mySocketId} urlSocketId={urlSocketId} player='me' rooms={rooms} />
                  );
                } else if (urlSocketId !== mySocketId) {
                  return (
                    <Start mySocketId={mySocketId} urlSocketId={urlSocketId} player='friend' rooms={rooms} />
                  );
                } else if (urlSocketId === `computer`) {
                  return (
                    <Start mySocketId={mySocketId} urlSocketId={urlSocketId} player='computer' rooms={rooms} />
                  );
                }


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
                // const player = this.checkplayer(mySocketId, urlSocketId);
                console.log(urlSocketId, mySocketId);
                if (urlSocketId === mySocketId) {
                  return (
                    <Game mySocketId={mySocketId} urlSocketId={urlSocketId} player='me' rooms={rooms} />
                  );
                } else if (urlSocketId !== mySocketId) {
                  return (
                    <Game mySocketId={mySocketId} urlSocketId={urlSocketId} player='friend' rooms={rooms} />
                  );
                } else if (urlSocketId === `computer`) {
                  return (
                    <Game mySocketId={mySocketId} urlSocketId={urlSocketId} player='computer' rooms={rooms} />
                  );
                }
              }}
            />
            <Match
              pattern='/endgame/:end/:urlSocketId'
              render={props => {
                const {end, urlSocketId} = props.params;

                return <EndGame urlSocketId={urlSocketId} end={end} />;
              }}
            />
            <Miss component={Home} />
          </main>
        </Router>
      );
    } else {
      return (
        <main>hey</main>
      );
    }
  }
}

App.propTypes = {
  urlSocketId: PropTypes.string,
  mySocketId: PropTypes.string,
  params: PropTypes.object
};

export default App;
