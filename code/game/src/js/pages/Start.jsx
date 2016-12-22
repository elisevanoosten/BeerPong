// LINK MET VRIEND + DEMO

import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import io from 'socket.io-client';

import {Home} from '../pages';

// import {includes} from 'lodash';
import {filter} from 'lodash';

class Start extends Component {

  state = {
    joinConfirmation: false
  }

  componentDidMount() {
    this.socket = io(`/`);
    const {urlSocketId} = this.props;

    this.socket.emit(`joinRoom`, urlSocketId);
    this.socket.on(`newRooms`, rooms => {
      console.log(rooms, `rooms`);
    });

    this.socket.on(`roomJoined`, newJoinSocketId => {
      if (newJoinSocketId === urlSocketId) {
        console.log(newJoinSocketId, `joined you`);
        this.setState({joinConfirmation: true});
      }
    });

  }

  // copyHandler(link) {
  //   // window.prompt(`Copy to clipboard: Ctrl+C, Enter`, link);
  //   try {
  //       // copy text
  //     document.execCommand(`copy`);
  //     link.blur();
  //   }
  //   catch (err) {
  //     alert(`please press Ctrl/Cmd+C to copy`);
  //   }
  // }

  render() {
    const {urlSocketId, player} = this.props;
    const {joinConfirmation} = this.state;
    console.log(joinConfirmation);
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
        if (joinConfirmation === true) {
          return (
            <div>
              <h3 className='intro'>stuur dit naar vriend: localhost:3000/start/{urlSocketId}</h3>
              <Link className={`startBig ${joinConfirmation}`} to={`/game/${urlSocketId}`}>SPEEL HET SPEL!</Link>
            </div>
          );
        } else {
          return (
            <div>
              <h3 className='intro'>stuur dit naar vriend: localhost:3000/start/{urlSocketId}</h3>
              <h2 className='intro'>Wachten op vriend...</h2>
            </div>
          );
        }
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
