import React, {Component, PropTypes} from 'react';
//import React3 from 'react-three-renderer';
import * as THREE from 'three';

export default class Barier extends Component {

  state = {
  //   Ypos: - 100
  }

  componentDidMount() {
    const barierLoader = new THREE.JSONLoader();
    barierLoader.load(`../assets/json/RoadBarrier.json`, this.loadBarier);

    // const {index} = this.props;
    //
    // let {Ypos} = this.state;
    // this.loadInterval = setInterval(() => {
    //   if (Ypos > 10) {
    //     Ypos = - 100;
    //     this.setState({Ypos});
    //     Ypos ++;
    //     this.props.sendYpos(index);
    //   } else {
    //     Ypos ++;
    //     this.setState({Ypos});
    //   }
    // }, 35);

  }

  loadBarier = barierGeometry => {
    this.setState({barierGeometry});
  }

  render() {
    const {barierGeometry} = this.state;
    const Ypos = this.props.barierY;
    const Xpos = this.props.barierX;
    if (barierGeometry) {
      return (
        <mesh
          position={new THREE.Vector3(Xpos, 0, Ypos)}
          scale={new THREE.Vector3(1, 1, 1)}
        >
          <geometry
            vertices={barierGeometry.vertices}
            faces={barierGeometry.faces}
            colors={barierGeometry.colors}
          />
          <meshLambertMaterial
            color={0xffffff}
          />
        </mesh>
      );
    } else {
      return (
        <group></group>
      );
    }
  }
}

Barier.propTypes = {
  barierY: PropTypes.number,
  barierX: PropTypes.number,
  sendYpos: PropTypes.func,
  index: PropTypes.number
};
