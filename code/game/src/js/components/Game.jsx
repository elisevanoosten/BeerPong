import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
// import ReactDOM from 'react-dom';

import {Car, Ground, Bariers} from '../components/gameElements/';

class Game extends React.Component {

  constructor(props, context) {

    super(props, context);

    this.cameraPosition = new THREE.Vector3(0, 3, 4, `XYZ`); //linksrechts, bovenonder, diepte
    this.cameraRotation = new THREE.Euler(- 0.3, 0, 0, `XYZ`);    //     linksrechts

    // this.cameraPosition = new THREE.Vector3(0, - 3, 2);
    // this.cameraRotation = new THREE.Euler(1.4, 0, 0, `XYZ`);

    this.state = {
      cubeRotation: new THREE.Euler(),
      carX: 0,
      barierY: 10,
      barierInterval: 1500,

    };

    //LOAD 3DCAR
    this.loadCar = this.loadCar.bind(this);
  }

  componentWillMount() {
    //CAR MOVEMENT
    window.addEventListener(`keydown`, e => this.carMove(e));

    //LOAD 3DCAR
    const carLoader = new THREE.JSONLoader();
    carLoader.load(`./assets/json/auto.json`, this.loadCar);
  }

  loadCar(geometry, materials) {
    this.setState({geometry});
    this.setState({materials});
  }
  //
  // getBarier() {
  //
  //   const {barierY} = this.state;
  //   const planeWidth = 10;
  //   // const barierX = Math.floor(Math.random() * planeWidth) - planeWidth / 2;
  //   return <Barier barierX={barierX} barierY={barierY} />;
  //   // const intervalleke = setInterval(() => {
  //   //   console.log(`bariere`);
  //   //   return <Barier barierX={barierX} barierY={barierY} />;
  //   // }, this.state.barierInterval);
  // }

  carMove(e) {
    const LEFT = 37;
    const RIGHT = 39;

    let {carX} = this.state;

    if (e.keyCode === LEFT) {
      if (carX > - 4) {
        carX --;
        this.setState({carX});
      }
    }
    else if (e.keyCode === RIGHT) {
      if (carX < 4) {
        carX ++;
        this.setState({carX});
      }
    }
  }

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height
    const {carX, geometry, materials} = this.state;

    return (
      <React3
        mainCamera='camera'
        width={width}
        height={height}
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
        />
        <Ground />
        <Car
          carX={carX}
          geometry={geometry}
          materials={materials}
          rotation={this.cameraRotation}
        />

      <Bariers />

      </scene>
    </React3>);
  }
}

export default Game;
