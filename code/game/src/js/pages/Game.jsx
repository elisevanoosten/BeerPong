import React, {PropTypes} from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

import {Car, Ground, Bariers, Drinks} from '../components';
import {includes} from 'lodash';

class Game extends React.Component {

  constructor(props, context) {

    super(props, context);

    this.state = {
      cubeRotation: new THREE.Euler(),
      carX: - 0.2,
      carY: 0,
      barierY: 10,
      barierInterval: 1500,
      rooms: []
      // kmTeller: 5,
    };

    // this.loadCan = this.loadCan.bind(this);
    // this.loadBarier = this.loadBarier.bind(this);

  }

  componentDidMount() {
    const {rooms} = this.state;
    const {player, mySocketId} = this.props;
    this.cameraPosition = new THREE.Vector3(0, 3, 4, `XYZ`); //linksrechts, bovenonder, diepte
    this.cameraRotation = new THREE.Euler(- 0.3, 0, 0, `XYZ`);

    if (player === `me`) {
      if (!includes(rooms, mySocketId)) {
        rooms.push(mySocketId);
        this.setState({rooms});
        console.log(`new room`);
      }
    } else if (player === `friend`) {
      console.log(`join room`);
    }
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
  //   let km = this.state.kmTeller;
  //
  //   this.loadInterval = setInterval(() => {
  //     km -= 0.1;
  //     this.setState({kmTeller: km});
  //
  //     if (km <= 0) {
  //       this.gameEnd();
  //     }
  //   }, 500);
  }

  carMove(e) {
    const LEFT = 37;
    const RIGHT = 39;

    let {carX} = this.state;

    // const rotation = carX / 10;
    // const position = carX * 1.1;
    //
    // this.cameraPosition = new THREE.Vector3(position, 3, 4, `XYZ`); //linksrechts, bovenonder, diepte
    // this.cameraRotation = new THREE.Euler(- 0.3, rotation, 0, `XYZ`);

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

  // getBarierY(barierY) {
  //   this.setState({barierY: barierY});
  //   // console.log(this.state);
  // }
  // getBarierY(barierX) {
  //   this.setState({barierX});
  //   // console.log(this.state);
  // }

  gameEnd() {
    console.log(`DOOOODDDD`);
    //this.props.gameEnd(this.state.kmTeller);
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
    const {carX, carY} = this.state;
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
              gameEnd={() => this.gameEnd()}
              // barierPos={barierPos}
            />
            <Drinks
              carX={carX}
              carY={carY}
              gameEnd={() => this.gameEnd()}
              player={player}
              // drinkPos={drinkPos}
            />
            <Ground />
          </scene>
        </React3>);
      </div>
      <div className='kmteller'>
        {/* {km} */}
      </div>
    </div>
    );
  }
}

Game.propTypes = {
  gameEnd: PropTypes.func,
  player: PropTypes.string,
  urlSocketId: PropTypes.string,
  mySocketId: PropTypes.string
};

export default Game;
