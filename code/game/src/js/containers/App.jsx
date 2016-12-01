import React, {Component} from 'react';
import IO from 'socket.io-client';
import Peer from 'peerjs';

import Video from '../components/Video';

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

  handleYouStream = youStream => { //this gelijk aan het component, geen problemen met binding -- stream binnenkrijgen in state zetten
    this.setState({youStream});
    this.initSocket();
  }

  handleYouStreamError = e => console.error(e);

  initSocket = () => { //initialiseren socket server, nieuwe persoon aanmaken die searching is

    this.socket = IO(`/`);
    this.socket.on(`connect`, this.initPeer);
    this.socket.on(`found`, this.handleWSFound);

  }

  initPeer = () => { //makkelijker connectie maken, server draaien om video door te sturen, klaar om te zoeken

    const {id} = this.socket;
    this.peer = new Peer(id, {
      host: `localhost`,
      port: 9000,
      path: `/api`
    });

    this.peer.on(`open`, () => { //Search random stranger - connection van peer js is open
      this.socket.emit(`search`); //komt toe op server
    });

    this.peer.on(`call`, call => {
      const {youStream} = this.state;
      call.answer(youStream);

      call.on(`stream`, this.handleStrangerStream);
      call.on(`close`, this.handleCloseStream);

    }); //telefoon krijgen

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

  choosePlayer(e) {
    e.preventDefault();

    const playerSection = document.querySelector(`.playerSection`);
    playerSection.classList.add(`hidden`);

    const drinkSection = document.querySelector(`.drinkSection`);
    drinkSection.classList.remove(`hidden`);

    const player = e.currentTarget.value;
    this.setState({player});
  }
  chooseDrink(e) {
    e.preventDefault();

    const drinkSection = document.querySelector(`.drinkSection`);
    drinkSection.classList.add(`hidden`);

    const gameSection = document.querySelector(`.game`);
    gameSection.classList.remove(`hidden`);

    const drank = e.currentTarget.value;
    this.setState({drank});

    this.initStream();
  }

  render() {
    const {strangerStream} = this.state;

    console.log(this.state);

    return (
      <main>
        <h1>Start</h1>
        <form>
        <fieldset className='playerSection'>
          <legend>Tegen wie wil je spelen?</legend>
          <div>
            <label htmlFor='friend'>Friend</label>
            <input type='radio' name='player' value='friend' onClick={e => this.choosePlayer(e)} />
          </div>
           <div>
            <label htmlFor='random'>Random</label>
            <input type='radio' name='player' value='random' onClick={e => this.choosePlayer(e)} />
          </div>
           <div>
            <label htmlFor='computer'>Computer</label>
            <input type='radio' name='player' value='computer' onClick={e => this.choosePlayer(e)} />
          </div>
        </fieldset>
        <fieldset className='drinkSection hidden'>
          <legend>Welke drank wil je gebruiken?</legend>
          <div>
            <label htmlFor='bier'>Bier</label>
            <input type='radio' name='drank' value='bier' onClick={e => this.chooseDrink(e)} />
          </div>
          <div>
            <label htmlFor='vodka'>Vodka</label>
            <input type='radio' name='drank' value='vodka' onClick={e => this.chooseDrink(e)} />
          </div>
          <div>
            <label htmlFor='tequila'>Tequila</label>
            <input type='radio' name='drank' value='tequila' onClick={e => this.chooseDrink(e)} />
          </div>
        </fieldset>
        </form>
        <section className='game hidden'>
          <Video meta={`stranger`} stream={strangerStream} />
          <container></container>
        </section>
      </main>

    );

  }

}

export default App;
