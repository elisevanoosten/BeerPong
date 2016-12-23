// PLAY GAME WITH FRIEND IN ROOM / COMPUTER

import React, {PropTypes} from 'react';
import React3 from 'react-three-renderer';
// import {EndGame} from '../pages/';

import io from 'socket.io-client';

import * as THREE from 'three';

import {Car, Ground, Bariers, Drinks} from '../components';

class Game extends React.Component {

  constructor(props, context) {

    super(props, context);

    this.state = {
      cubeRotation: new THREE.Euler(),

      carX: - 0.2,
      carY: 0,
      barierY: 10,
      barierInterval: 1500,

      kmTeller: 15,
      drinkCount: 0
    };
  }

  componentDidMount() {
    this.cameraPosition = new THREE.Vector3(0, 3, 4, `XYZ`); //linksrechts, bovenonder, diepte
    this.cameraRotation = new THREE.Euler(- 0.3, 0, 0, `XYZ`);

    const {urlSocketId} = this.props;

    io.broadcast.to(urlSocketId).emit(`roomJoined`, urlSocketId);
  }

  componentWillMount() {
    //CAR MOVEMENT
    window.addEventListener(`keydown`, e => this.carMove(e));

    //KM TOT THUIS
    this.kmTeller();
  }

  getRandomPos() {
    const planeWidth = 8;
    return Math.floor(Math.random() * planeWidth) - planeWidth / 2;
  }

  kmTeller() {
    let km = this.state.kmTeller;

    this.loadInterval = setInterval(() => {
      km -= 0.1;
      this.round(km, 3);
      if (km <= 0) {
        this.gameEnd(kmTeller);
      }
    }, 500);
  }

  round(value, decimals) {
    const n = Number(`${Math.round(`${value  }e${  decimals}`)  }e-${  decimals}`);
    this.setState({kmTeller: n});
  }

  drinkCounter() {
    let drinks = this.state.drinkCount;
    const {player} = this.props;

    drinks ++;
    this.setState({drinkCount: drinks});

    if (player === `me`) {
      this.setBlurry();
    }

    if (drinks === 1) {
      this.gameEnd(`drink`);
    }
  }

  setBlurry() {
    const count =  this.state.drinkCount * 2;
    const view = document.querySelector(`.player-me`);
    view.style.filter = `blur(${ count }px)`;
  }

  carMove(e) {
    const LEFT = 37;
    const RIGHT = 39;

    let {carX} = this.state;
    const {player} = this.props;
    // const rotation = carX / 10;
    // const position = carX * 1.1;
    //
    // this.cameraPosition = new THREE.Vector3(position, 3, 4, `XYZ`); //linksrechts, bovenonder, diepte
    // this.cameraRotation = new THREE.Euler(- 0.3, rotation, 0, `XYZ`);
    if (player === `me`) {
      if (e.keyCode === LEFT) {
        if (carX > - 4.2) {
          carX -= 0.5;
          this.setState({carX});
        }
      }
      else if (e.keyCode === RIGHT) {
        if (carX < 3.8) {
          carX += 0.5;
          this.setState({carX});
        }
      }
    }
  }

  gameEnd(end) {
    const {urlSocketId} = this.props;
    window.location.assign(`/EndGame/${end}/${urlSocketId}`);
  }

  componentWillUnmount () {
    this.loadInterval && clearInterval(this.loadInterval);
    this.loadInterval = false;
  }

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height
    //const {carX, carY, canGeometry, canMaterials, barierGeometry, barierMaterials} = this.state;
    // const {carX, carY, barierPos} = this.state;
    const {player} = this.props;
    const {carX, carY, kmTeller, drinkCount} = this.state;
    // const km =  Math.round(this.state.kmTeller * 100) / 100;
    let lightLookat;
    let cameraLookat;

    if (player === `me` || player === `computer`) {
      // I PLAY
      this.cameraPosition = new THREE.Vector3(0, 3, 4, `XYZ`); //linksrechts, bovenonder, diepte
      this.cameraRotation = new THREE.Euler(- 0.3, 0, 0, `XYZ`);

      cameraLookat = new THREE.Vector3(carX, carY, - 8, `XYZ`); //linksrechts, bovenonder, diepte
      lightLookat = new THREE.Vector3(carX, carY - 10, - 8, `XYZ`); //linksrechts, bovenonder, diepte
    } else if (player === `friend`) {
      // FRIEND PLAYS
      this.cameraPosition = new THREE.Vector3(0, 2, - 20, `XYZ`);
      this.cameraRotation = new THREE.Euler(0, 0, 0, `XYZ`);

      cameraLookat = new THREE.Vector3(carX, carY, 8, `XYZ`); //linksrechts, bovenonder, diepte
      lightLookat = new THREE.Vector3(0, - 200, 8, `XYZ`); //linksrechts, bovenonder, diepte
    }

    return (
      <div>
        <div className={`gamePlay player-${player}`}>
          <React3
            mainCamera='camera'
            width={width}
            height={height}
            clearColor={0x7DD71B}
            alpha={true}
            clearAlpha={0.0}
          >
          <scene>
            <perspectiveCamera
              name='camera'
              fov={75}
              aspect={width / height}
              near={0.01}
              far={1000}
              rotation={this.cameraRotation}
              position={this.cameraPosition}
              lookAt={cameraLookat}
            />
            <directionalLight
              // color={0xffffff}
              lookAt={lightLookat}
              castShadow={true}
              intensity={3}
              // shadowDarkness={8}
              visible={true}
            />
            <Car
              carX={carX}
              carY={carY}
              rotation={this.cameraRotation}
            />
            <Bariers
              carX={carX}
              carY={carY}
              gameEnd={drink => this.gameEnd(drink, kmTeller)}
              kmTeller={kmTeller}
              // barierPos={barierPos}
            />
            <Drinks
              carX={carX}
              carY={carY}
              gameEnd={barier => this.gameEnd(barier, kmTeller)}
              player={player}
              // drinkPos={drinkPos}
              drinkCounter={() => this.drinkCounter()}
            />
            <Ground />
          </scene>
        </React3>);
      </div>
      <div className='kmteller'>
        <ul>
        <li>{kmTeller} km</li>
        <li>{drinkCount}/5</li>
        </ul>
      </div>
    </div>
    );
  }
}

Game.propTypes = {
  gameEnd: PropTypes.func,
  player: PropTypes.string,
  urlSocketId: PropTypes.string,
  mySocketId: PropTypes.string,
  drinkCounter: PropTypes.func
};

export default Game;
