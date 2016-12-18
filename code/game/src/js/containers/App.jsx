import React, {Component} from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs';

// import {Video} from '../components/';
import Game from './Game';

class App extends Component {

  state = {
    // youStream: undefined,
    // strangerStream: undefined,
    player: undefined,
    drank: undefined,
    gamePlay: true,
    gameEnd: false,
    mySocketId: undefined
  }

  componentDidMount() {
    this.initSocket();
    // this.socket.emit(`send message`, {
    //   room: conversationId,
    //   message: `Some message`
    // });
    // this.socket.on(`conversation private post`, function(data) {
    //   console.log(data, `message`);
    // });
  }

  initSocket = () => { //initialiseren socket server, nieuwe persoon aanmaken die searching is

    this.socket = io(`/`);
    this.socket.on(`connect`, this.initPeer);
    this.socket.on(`found`, this.handleWSFound);

  }

  initPeer = () => {

    const {id} = this.socket;
    this.peer = new Peer(id, {
      host: `cryptic-island-50117.herokuapp.com`,
      port: ``,
      path: `/api`,
      secure: true
    });

    this.socket = io(`/`);
    console.log(window.location.href);
    this.socket.on(`init`, this.handleWSInit);

  }

  handleWSInit = socketId => {
    console.log(`socket id opslaan`);
    this.setState({mySocketId: socketId});
    console.log(this.state);
    this.socket.emit(`subscribe`, socketId);
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

  handleChoosePlayer(e) {
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
    const gameOverText = document.querySelector(`.game-over-text`);
    gameOverText.innerHTML = text;
  }

  handleNewGame() {
    console.log(`newgame`);

    const gameSection = document.querySelector(`.game-over`);
    gameSection.classList.add(`hidden`);

    const playerSection = document.querySelector(`.playerSection`);
    playerSection.classList.remove(`hidden`);
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
              <input id='friend' type='radio' name='player' value='friend' onClick={e => this.handleChoosePlayer(e)} />
              <label htmlFor='friend' className='radioLabel'><img src='../../assets/img/vriendenbord.png' width='10%' height='10%' className='playerbord' /></label>
            </div>
            <div>
              <input id='computer' type='radio' name='player' value='computer' onClick={e => this.handleChoosePlayer(e)} />
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
          <div className='game-over-text'></div>
          <button onClick={this.handleNewGame}>Opnieuw spelen</button>
        </section>
      </main>
    );

  }
}

export default App;
