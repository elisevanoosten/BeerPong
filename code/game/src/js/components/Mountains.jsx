import React, {Component, PropTypes} from 'react';
import * as THREE from 'three';

export default class Mountains extends Component {

  state = {}

  componentDidMount() {
    const mountainLoader = new THREE.ObjectLoader();
    mountainLoader.load(`../assets/json/mountain2.json`, this.loadMountains);
  }

  loadMountains = (mountainGeometry, mountainMaterials) => {
    console.log(mountainGeometry, mountainMaterials);
    //mountainMaterials = mountainMaterials[0];
    // this.setState({mountainGeometry});
  }

  // loadCar = (carGeometry, carMaterials) => {
  //   carMaterials = carMaterials[0];
  //   this.setState({carGeometry, carMaterials});
  // }

  render() {
    // const {mountainGeometry} = this.state;
    const Ypos = this.props.mountainY;
    const Xpos = this.props.mountainX;
    // console.log(this.state);
    // if (1) {
    // return (
    //     <mesh
    //       position={new THREE.Vector3(Xpos, 0, Ypos)}
    //       scale={new THREE.Vector3(1, 1, 1)}
    //     >
    //       {/* <geometry
    //         vertices={mountainGeometry.vertices}
    //         faces={mountainGeometry.faces}
    //         colors={mountainGeometry.colors}
    //       /> */}
    //       <meshLambertMaterial
    //         color={0xffffff}
    //       />
    //     </mesh>
    // );
    // } else {
    return (
        <group></group>
    );
    // }
  }
}

Mountains.propTypes = {
  mountainY: PropTypes.number,
  mountainX: PropTypes.number,
};
