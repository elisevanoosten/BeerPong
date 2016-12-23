// LINK MET VRIEND + DEMO
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import io from 'socket.io-client';

import {Home} from '../pages';

class Start extends Component {

  state = {
    joinConfirmation: false
  }

  componentDidMount() {
    console.log(this.props.player);
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

    // this.socket.on(`startGameResponse`, urlSocketId => {
      // <HashRouter basename='/' />;
      // window.location.assign(`/game/${urlSocketId}`);
    // });
  }

  // clickStartHandler(e) {
  //   this.socket = io(`/`);
  //   e.preventDefault();
  //   const {urlSocketId} = this.props;
  //   this.socket.emit(`startGame`, urlSocketId);
  // }

  render() {
    const {urlSocketId, player} = this.props;
    const {joinConfirmation} = this.state;

    if (urlSocketId === `computer`) {
      return (
        <div className='page'>
          <h1 className='intro'>SPEEL TEGEN DE COMPUTER</h1>
          <ul className='demo-list'>
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
              <h1 className='intro'>Kan jij de invloed van je slechte vrienden aan? Doe nu de test.</h1>
              <Link
                className={`startbutton ${joinConfirmation}`}
                to={`/game/${urlSocketId}`}
                // onClick={() => this.clickStartHandler()}
                > SPEEL HET SPEL!</Link>
              <ul className='demo-list'>
                <li>Bestuur je auto van links naar rechts met de pijltjestoetsen om thuis te geraken.</li>
                <li>Ontwijk de biertjes om niet te dronken te worden. Wanneer je 5 pintjes op hebt gepikt ben je knock-out. Je slechte vriend zal proberen jou zat te voeren.</li>
                <li>Pas op voor eventuele obstakels, wie weet geraak je wel nooit meer thuis</li>
              </ul>
            </div>
          );
        } else {
          return (
            <div>
              <h1 className='intro'>Kan jij de invloed vna je slechte vrienden aan? Doe nu de test.</h1>
              <h1 className='link-vriend'>
                Stuur deze link naar je vriend!
                <a className='friendlink' href={`https://onder-invloed.herokuapp.com/start/${urlSocketId}`}>https://onder-invloed.herokuapp.com/start/{urlSocketId}</a>
              </h1>
              <h2 className='intro'>Wachten tot je vriend de link opent...</h2>
              <ul className='demo-list'>
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
            <h1 className='intro'>Plaats biertjes voor je vriend!</h1>
              <ul className='demo-list'>
                <li>Plaats de pintjes op de juiste plaats met de pijltjestoetsen.</li>
                <li>Met je spatiebalk kan je de biertjes neerzetten.</li>
                <li>Je wint het spel als jou vriend niet meer thuis geraakt.</li>
              </ul>
              <Link
                className={`startbutton ${joinConfirmation}`}
                to={`/game/${urlSocketId}`}
                // onClick={() => this.clickStartHandler()}
                > SPEEL HET SPEL!</Link>
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
