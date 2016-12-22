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
        <div className='page'>
          <h3 className='intro'>SPEEL TEGEN DE COMPUTER</h3>
          <ul>
            <li>Bestuur je auto van links naar rechts met de pijltjestoetsen om thuis te geraken.</li>
            <li>Ontwijk de biertjes om niet te dronken te worden. Wanneer je 5 pintjes op hebt gepikt ben je knock-out.</li>
            <li>Pas op voor eventuele obstakels, wie weet geraak je wel nooit meer thuis</li>
          </ul>
          <Link className='startbutton' to='/game/computer'>SPEEL HET SPEL!</Link>
        </div>
      );
    } else {
      if (player === `me`) {
        if (joinConfirmation === true) {
          return (
            <div>
              <h3 className='intro'>Kan jij de invloed vna je slechte vrienden aan? Doe nu de test.</h3>
              <h3 className='link-vriend'>stuur dit naar vriend: localhost:3000/start/{urlSocketId}</h3>
              <ul>
                <li>Bestuur je auto van links naar rechts met de pijltjestoetsen om thuis te geraken.</li>
                <li>Ontwijk de biertjes om niet te dronken te worden. Wanneer je 5 pintjes op hebt gepikt ben je knock-out. Je slechte vriend zal proberen jou zat te voeren.</li>
                <li>Pas op voor eventuele obstakels, wie weet geraak je wel nooit meer thuis</li>
              </ul>
              <Link className={`startBig ${joinConfirmation}`} to={`/game/${urlSocketId}`}>SPEEL HET SPEL!</Link>
            </div>
          );
        } else {
          return (
            <div>
              <h3 className='intro'>Kan jij de invloed vna je slechte vrienden aan? Doe nu de test.</h3>
              <h3 className='link-vriend'>stuur dit naar vriend: localhost:3000/start/{urlSocketId}</h3>
              <h2 className='intro'>Wachten tot je vriend de link opent...</h2>
              <ul>
                <li>Bestuur je auto van links naar rechts met de pijltjestoetsen om thuis te geraken.</li>
                <li>Ontwijk de biertjes om niet te dronken te worden. Wanneer je 5 pintjes op hebt gepikt ben je knock-out. Je slechte vriend zal proberen jou zat te voeren.</li>
                <li>Pas op voor eventuele obstakels, wie weet geraak je wel nooit meer thuis</li>
              </ul>
            </div>
          );
        }
      } else if (player === `friend`) {
        return (
          <div>
            <h3 className='intro'>Plaats biertjes voor je vriend!</h3>
              <ul>
                <li>Plaats de pintjes op de juiste plaats met de pijltjestoetsen.</li>
                <li>Met je spatiebalk kan je de biertjes neerzetten.</li>
                <li>Je wint het spel als jou vriend niet meer thuis geraakt.</li>
              </ul>
            <Link className='startbutton' to={`/game/${urlSocketId}`}>SPEEL HET SPEL!</Link>;
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
