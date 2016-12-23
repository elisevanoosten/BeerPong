import React, {Component, PropTypes} from 'react';
import * as THREE from 'three';

export default class BigDrink extends Component {

  state = {}

  componentDidMount() {
    const drinkLoader = new THREE.JSONLoader();
    drinkLoader.load(`../assets/json/bottle.json`, this.loadDrink);
  }

  loadDrink = drinkGeometry => {
    this.setState({drinkGeometry});
  }

  render() {
    const {drinkGeometry} = this.state;
    const Xpos = this.props.bigDrinkX;
    const Ypos = this.props.bigDrinkY;

    if (drinkGeometry) {
      return (
        <mesh
          position={new THREE.Vector3(Xpos, 0, Ypos)}
          scale={new THREE.Vector3(3, 3, 3)}
        >
          <geometry
            vertices={drinkGeometry.vertices}
            faces={drinkGeometry.faces}
            colors={drinkGeometry.colors}
          />
          <meshLambertMaterial
            color={0x00ff00}
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

BigDrink.propTypes = {
  bigDrinkX: PropTypes.number,
  bigDrinkY: PropTypes.number
};
