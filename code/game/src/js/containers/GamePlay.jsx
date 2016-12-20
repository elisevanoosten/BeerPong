import React, {PropTypes} from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

import {Car, Ground, Bariers} from '../components';

class Game extends React.Component {

  constructor(props, context) {

    super(props, context);

    this.state = {
      cubeRotation: new THREE.Euler(),
      carX: - 0.2,
      carY: 0,
      barierY: 10,
      barierInterval: 1500,
      kmTeller: 5,
    };

    // this.loadCan = this.loadCan.bind(this);
    // this.loadBarier = this.loadBarier.bind(this);

  }

  componentDidMount() {
    console.log(`PROPS`, this.props);

    this.cameraPosition = new THREE.Vector3(0, 3, 4, `XYZ`); //linksrechts, bovenonder, diepte
    this.cameraRotation = new THREE.Euler(- 0.3, 0, 0, `XYZ`);
  }

  componentWillMount() {
    //CAR MOVEMENT
    window.addEventListener(`keydown`, e => this.carMove(e));

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
    this.props.gameEnd(this.state.kmTeller);
  }

  componentWillUnmount () {
    this.loadInterval && clearInterval(this.loadInterval);
    this.loadInterval = false;
  }

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height
    //const {carX, carY, canGeometry, canMaterials, barierGeometry, barierMaterials} = this.state;
    const {carX, carY} = this.state;
    const km =  Math.round(this.state.kmTeller * 100) / 100;

    // //SPELER 1
    this.cameraPosition = new THREE.Vector3(0, 3, 4, `XYZ`); //linksrechts, bovenonder, diepte
    this.cameraRotation = new THREE.Euler(- 0.3, 0, 0, `XYZ`);

    const cameraLookat = new THREE.Vector3(carX, carY, - 8, `XYZ`); //linksrechts, bovenonder, diepte
    const lightLookat = new THREE.Vector3(carX, carY - 10, - 8, `XYZ`); //linksrechts, bovenonder, diepte

    //SPELER 2
    // this.cameraPosition = new THREE.Vector3(0, 2, - 20, `XYZ`);
    // this.cameraRotation = new THREE.Euler(0, 0, 0, `XYZ`);
    //
    // const cameraLookat = new THREE.Vector3(carX, carY, 8, `XYZ`); //linksrechts, bovenonder, diepte
    // const lightLookat = new THREE.Vector3(carX, carY - 10, 8, `XYZ`); //linksrechts, bovenonder, diepte

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
            <Ground />
              <Car
                carX={carX}
                carY={carY}
                rotation={this.cameraRotation}
              />
              <Bariers
                // getBarierY={barierY => this.getBarierY(barierY)}
                // getBarierX={barierX => this.getBarierX(barierX)}
                carX={carX}
                carY={carY}
                gameEnd={() => this.gameEnd()}
                //endGameState={endGame => console.log(endGame)}
              />
          {/* <Drinks
            carX={carX}
            carY={carY}
            geometry={canGeometry}
            materials={canMaterials}
          /> */}
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
