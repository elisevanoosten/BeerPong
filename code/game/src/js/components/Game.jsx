import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
// import ReactDOM from 'react-dom';

//import Car from '../components/gameElements/Car';

class Game extends React.Component {

  constructor(props, context) {

    super(props, context);

    console.log(`game`);

    this.cameraPosition = new THREE.Vector3(0, - 3, 2);
    this.cameraRotation = new THREE.Euler(1.4, 0, 0, `XYZ`);

    this.state = {
      cubeRotation: new THREE.Euler(),
      carX: 0
    };

    // carX = 0;

  }

  componentDidMount() {
    // carX = 0;
    // this.setState(carX: 0);
    // console.log(this.state);

    window.addEventListener(`keydown`, this.keypressed);
    // const img = new Image();
    // img.src = `./assets/img/road.png`;
    // const tex = new THREE.texture(img);
    // img.tex = tex;

  }

  keypressed(e) {
    const LEFT = 37;
    const RIGHT = 39;

    // const {carX} = this.state;

    if (e.keyCode === LEFT) {
      console.log(`links`);
      // carX --;
      // this.setState({carX});
    }
    else if (e.keyCode === RIGHT) {
      console.log(`right`);
      // carX ++;
      // this.setState({carX});
    }

    // console.log(carX);
  }

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height
    const carX = this.state.carX;

    const roadTexLoader = new THREE.TextureLoader();
    const roadTex = roadTexLoader.load(`./assets/img/road.png`);

    const mesh = null;

    return (<React3
      mainCamera='camera' // this points to the perspectiveCamera which has the name set to "camera" below
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
        <mesh
          rotation={this.state.cubeRotation}
          position={new THREE.Vector3(carX, 0, 0)}
          castShadow={true}
        >
          <boxGeometry
            width={1}
            height={1}
            depth={1}
          />
          <meshBasicMaterial
            color={0x00ff00}

          />
        </mesh>

        <mesh
          rotation={this.state.cubeRotation}
        >
          <planeGeometry
            width={10}
            height={800}
            depth={10}
          />

          {/* <spriteMaterial */}
          <meshBasicMaterial
            // scale={0.2, 0.2, 0.2}
            map={roadTex}
          />

        </mesh>
        {/* <Car /> */}

        {/* <mesh>
          <shape
            type={`shape`}
            map={carLoader}
          />
        </mesh> */}

      </scene>
    </React3>);
  }
}

export default Game;

// ReactDOM.render(<Game />, document.body);
