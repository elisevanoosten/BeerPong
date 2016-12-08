import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ReactDOM from 'react-dom';

class Game extends React.Component {
  constructor(props, context) {
    super(props, context);

    console.log(`game`);

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.
    this.cameraPosition = new THREE.Vector3(0, - 3, 2);
    this.cameraRotation = new THREE.Euler(1.4, 0, 0, `XYZ`);

    this.state = {
      cubeRotation: new THREE.Euler(),
    };
  }

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height
    // const AmbientLight = React3.AmbientLight;

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
          position={new THREE.Vector3(0, 0, 0)}
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
          <meshBasicMaterial
            color={0xff0000}
            shading={true}
          />
        </mesh>
        {/* <AmbientLight
          color={0xff0000}
          intensity={30}
        /> */}
      </scene>
    </React3>);
  }
}

export default Game;

// ReactDOM.render(<Game />, document.body);
