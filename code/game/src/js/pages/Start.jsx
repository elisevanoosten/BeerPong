// LINK MET VRIEND + DEMO

import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import io from 'socket.io-client';

import {Home} from '../pages';

// import {includes} from 'lodash';
import {filter} from 'lodash';

class Start extends Component {

  state = {
  }

  componentDidMount() {
    this.socket = io(`/`);
    const {urlSocketId} = this.props;

    const {player, rooms} = this.props;

    const socketids = filter(rooms, function(i) { return rooms[i] = urlSocketId; });
    console.log(socketids);

    if (player === `me`) {
      // player me
      // this.socket.emit(`joinroom`, mySocketId);
    } else if (player === `friend`) {
      // player friend
      // this.socket.emit(`joinRoom`, urlSocketId);
    }


    // if (player === `me`) {
    //
    //   if (!includes(rooms, mySocketId)) {
    //     // New room
    //     rooms.push(mySocketId);
    //     this.setState({rooms});
    //     console.log(`new room`);
    //     this.socket.emit(`joinRoom`, mySocketId);
    //
    //   }
    // } else if (player === `friend`) {
    //   // join room
    // }

  }

  copyHandler(link) {
    // window.prompt(`Copy to clipboard: Ctrl+C, Enter`, link);
    try {
        // copy text
      document.execCommand(`copy`);
      link.blur();
    }
    catch (err) {
      alert(`please press Ctrl/Cmd+C to copy`);
    }
  }

  render() {
    const {urlSocketId, player} = this.props;
    //
    console.log(player);
    if (player === `computer`) {
      return (
        <div>
          <h3 className='intro'>DEMO TEGEN COMPUTER</h3>
          <Link className='startBig' to='/game'>SPEEL HET SPEL!</Link>
        </div>
      );
    } else {
      if (player === `me`) {
        return (
          <div>
            <h3 className='intro'>stuur dit naar vriend: localhost:3000/start/{urlSocketId}</h3>
            {/* <a href='#' onClick={() => this.copyHandler(`localhost:3000/game/${urlSocketId}`)}>copy link</a> */}

          {/* <game player='friend' /> */}
            {/* <Link className='startbutton' to={`/game/\${socketId}`}>Speel tegen een vriend</Link> */}
            <Link className='startBig' to={`/game/${urlSocketId}`}>SPEEL HET SPEL!</Link>
          </div>
        );
      } else if (player === `friend`) {
        return (
          <div>
            <h3 className='intro'>Plaats pintjes voor je vriend!</h3>;
            <Link className='startBig' to={`/game/${urlSocketId}`}>SPEEL HET SPEL!</Link>;
          </div>
        );
      }
      return <Home />;
    }
  }
}

Start.propTypes = {
  params: PropTypes.object,
  mySocketId: PropTypes.string,
  urlSocketId: PropTypes.string,
  player: PropTypes.string,
  rooms: PropTypes.array
};

export default Start;
