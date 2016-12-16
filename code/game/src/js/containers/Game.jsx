import React, {PropTypes} from 'react';
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
      carY: 0,
      barierY: 10,
      barierInterval: 1500,
      kmTeller: 5
    };
    //LOAD 3DCAR
    this.loadCar = this.loadCar.bind(this);
    this.loadCan = this.loadCan.bind(this);
    this.loadBarier = this.loadBarier.bind(this);

  }

  componentWillMount() {
    //CAR MOVEMENT
    window.addEventListener(`keydown`, e => this.carMove(e));

    //LOAD 3DCAR
    const carLoader = new THREE.JSONLoader();
    carLoader.load(`./assets/json/autofile.json`, this.loadCar);

    const canLoader = new THREE.JSONLoader();
    canLoader.load(`./assets/json/can.json`, this.loadCan);

    const barierLoader = new THREE.JSONLoader();
    barierLoader.load(`./assets/json/RoadBarrier.json`, this.loadBarier);

    //KM TOT THUIS
    this.kmTeller();
  }

  kmTeller() {
    let km = this.state.kmTeller;

    this.loadInterval = setInterval(() => {
      km -= 0.1;
      this.setState({kmTeller: km});

      if (km <= 0) {
        this.gameEnd();
      }
    }, 500);
  }

  loadCar(carGeometry, carMaterials) {
    this.setState({carGeometry});
    this.setState({carMaterials});
  }

  loadCan(canGeometry, canMaterials) {
    this.setState({canGeometry});
    this.setState({canMaterials});
  }

  loadBarier(barierGeometry, barierMaterials) {
    this.setState({barierGeometry});
    this.setState({barierMaterials});
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

  // getBarierY(barierY) {
  //   this.setState({barierY: barierY});
  //   // console.log(this.state);
  // }
  // getBarierY(barierX) {
  //   this.setState({barierX});
  //   // console.log(this.state);
  // }

  gameEnd() {
    this.props.gameEnd(this.state.kmTeller);
  }

  componentWillUnmount () {
    this.loadInterval && clearInterval(this.loadInterval);
    this.loadInterval = false;
  }

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height
    const {carX, carY, carGeometry, carMaterials, canGeometry, canMaterials, barierGeometry, barierMaterials} = this.state;
    const km =  Math.round(this.state.kmTeller * 100) / 100;

    return (
      <div>
        <div className='gamePlay'>
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
            <ambientLight

            />
            <Ground />
            <Car
              carX={carX}
              carY={carY}
              geometry={carGeometry}
              materials={carMaterials}
              rotation={this.cameraRotation}
            />

          <Bariers
            // getBarierY={barierY => this.getBarierY(barierY)}
            // getBarierX={barierX => this.getBarierX(barierX)}
            carX={carX}
            carY={carY}
            gameEnd={() => this.gameEnd()}
            geometry={barierGeometry}
            materials={barierMaterials}
            //endGameState={endGame => console.log(endGame)}
          />
          <Drinks
            carX={carX}
            carY={carY}
            geometry={canGeometry}
            materials={canMaterials}
          />

          </scene>
        </React3>);
      </div>
      <div className='kmteller'>
        {km}
      </div>
    </div>
    );}
}

Game.propTypes = {
  gameEnd: PropTypes.func
};


export default Game;
