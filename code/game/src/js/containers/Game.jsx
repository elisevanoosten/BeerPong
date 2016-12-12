import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

import {Car, Ground, Bariers, Drinks} from '../components';

class Game extends React.Component {

  constructor(props, context) {

    super(props, context);

    this.cameraPosition = new THREE.Vector3(0, 3, 4, `XYZ`); //linksrechts, bovenonder, diepte
    this.cameraRotation = new THREE.Euler(- 0.3, 0, 0, `XYZ`);    //     linksrechts

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

  collisionCar() {
    console.log(`carcollission`);
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
      <Drinks />

      </scene>
    </React3>);
  }
}

export default Game;
