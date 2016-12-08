import React, {Component} from 'react';
import IO from 'socket.io-client';
import Peer from 'peerjs';

import {Video, Game} from '../components/';

let gamePlay = 1;

class App extends Component {

  state = { //geen constructer meer gebruiken

    youStream: undefined,
    strangerStream: undefined,
    player: undefined,
    drank: undefined

  }

  componentDidMount() {
    //this.initStream();
  }

  initStream() { //webcam ophalen

    navigator.getUserMedia(
      {video: true},
      this.handleYouStream,
      this.handleYouStreamError
    );

  }

  handleYouStream = youStream => {
    this.setState({youStream});
    this.initSocket();
  }

  handleYouStreamError = e => console.error(e);

  initSocket = () => {

    this.socket = IO(`/`);
    this.socket.on(`connect`, this.initPeer);
    this.socket.on(`found`, this.handleWSFound);

  }

  initPeer = () => {

    const {id} = this.socket;
    this.peer = new Peer(id, {
      host: `localhost`,
      port: 9000,
      path: `/api`
    });

    this.peer.on(`open`, () => {
      this.socket.emit(`search`);
    });

    this.peer.on(`call`, call => {
      const {youStream} = this.state;
      call.answer(youStream);

      call.on(`stream`, this.handleStrangerStream);
      call.on(`close`, this.handleCloseStream);

    });

  }

  handleStrangerStream = strangerStream => this.setState({strangerStream});

  handleCloseStream = () => {

    let {strangerStream} = this.state;
    strangerStream = ``;

    this.socket.emit(`search`);

    this.setState({strangerStream});

  }

  handleWSFound = strangerId => {

    const {youStream} = this.state;

    const call = this.peer.call(strangerId, youStream);
    call.on(`stream`, this.handleStrangerStream);
    call.on(`close`, this.handleCloseStream);

  }

  goGame(e) {
    e.preventDefault();

    console.log(`gogame`);

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

    gamePlay = 1;

    this.initStream();
  }

  startGame() {
    if (gamePlay === 1) {
      return <Game />;
    }
  }

  render() {
    const {strangerStream} = this.state;

    console.log(this.state);

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
          <Video meta={`stranger`} stream={strangerStream} />
          <container></container>
        </section>
        {this.startGame()}
      </main>
    );

  }

}

export default App;
