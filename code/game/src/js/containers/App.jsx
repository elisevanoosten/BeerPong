import React, {Component} from 'react';
import io from 'socket.io-client';
// import Peer from 'peerjs';

// import {Video} from '../components/';
import Game from './Game';

class App extends Component {

  state = {
    // youStream: undefined,
    // strangerStream: undefined,
    player: undefined,
    drank: undefined,
    gamePlay: false,
    gameEnd: false
  }

  componentDidMount() {
    //this.initStream();
    this.socket = io(`/`);
    this.socket.on(`init`, this.handleWSInit);
    this.socket.on(`join`, this.handleWSJoin);
    this.socket.on(`room`, this.handleWSRoom);
  }

  handleWSInit() {
    console.log(`je bent heir voor de eerste keer`);
  }

  handleWSJoin() {
    console.log(`iemand is er bij gekomen`);
  }

  handleWSRoom() {

  }

  goGame(e) {
    e.preventDefault();

    const bord = document.querySelector(`.startbord`);
    bord.classList.add(`hidden`);
    const startbutton = document.querySelector(`.startbutton`);
    startbutton.classList.add(`hidden`);

    const playerSection = document.querySelector(`.playerSection`);
    playerSection.classList.remove(`hidden`);

    const player = e.currentTarget.value;
    this.setState({player});
  }

  choosePlayer(e) {
    e.preventDefault();

    const playerSection = document.querySelector(`.playerSection`);
    playerSection.classList.add(`hidden`);

    const gameSection = document.querySelector(`.game`);
    gameSection.classList.add(`hidden`);

    const player = e.currentTarget.value;
    this.setState({player});

    this.setState({gamePlay: true});

    // this.initStream();
  }

  startGame() {
    const {gameEnd, gamePlay} = this.state;
    if (gameEnd !== true) {
      if (gamePlay === true) {
        return <Game gameEnd={kmTeller => this.gameOver(kmTeller)} />;
      }
    }
  }

  gameOver(kmTeller) {
    const gameSection = document.querySelector(`.game-over`);
    gameSection.classList.remove(`hidden`);
    this.setState({gameEnd: true});

    let text;
    if (kmTeller < 0) {
      text = `<p>Hoera! Je bent ondanks de slechte invloed van je vrienden thuis geraakt!</p>`;
      text += `<p>Maar pas in het vervolg toch maar een beetje op met drinken ;-)</p>`;
    } else {
      text = `<p>Oei, je hebt dit ritje niet overleefd, zie dat je dit in het echte leven niet ook meemaakt... Bel op tijd een Uber!</p>`;
      text += `<p>Jouw laatste rustplaats was op ${  Math.round(kmTeller * 100) / 100  } km van je huis. Slaapwel vriend.`
      ;
    }
    const gameOverText = document.querySelector(`.game-over`);
    gameOverText.innerHTML = text;

  }

  render() {
    // const {strangerStream} = this.state;
    return (
      <main>
        <form>
        <fieldset className='gameSection'>
          <img src='../../assets/img/startbord.png' width='40%' height='40%' className='startbord' /><br />
          <button className='startbutton' onClick={e => this.goGame(e)}>SPEEL HET SPEL!</button>
        </fieldset>
        <fieldset className='playerSection hidden'>
          <p className='intro'>Hoeveel invloed hebben jou slechte vrienden? <br />
          Speel het spel en ontdek!</p>
          <section className='radioSection'>
            <div>
              <input id='friend' type='radio' name='player' value='friend' onClick={e => this.choosePlayer(e)} />
              <label htmlFor='friend' className='radioLabel'><img src='../../assets/img/vriendenbord.png' width='10%' height='10%' className='playerbord' /></label>
            </div>
            <div>
              <input id='computer' type='radio' name='player' value='computer' onClick={e => this.choosePlayer(e)} />
              <label htmlFor='computer' className='radioLabel'><img src='../../assets/img/computerbord.png' width='10%' height='10%' className='playerbord' /></label>
            </div>
          </section>
        </fieldset>
        </form>

        <section className='game hidden'>
          {/* <Video meta={`stranger`} stream={strangerStream} /> */}
          <container></container>
        </section>
        {this.startGame()}

        <section className='game-over hidden'>
        </section>
      </main>
    );

  }
}

export default App;
