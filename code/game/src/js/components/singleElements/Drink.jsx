import React, {Component, PropTypes} from 'react';
import * as THREE from 'three';

export default class Drink extends Component {

  state = {
    Ypos: - 100
  }

  componentDidMount() {
    const barierLoader = new THREE.JSONLoader();
    barierLoader.load(`../assets/json/bottle.json`, this.loadDrink);
  }

  loadDrink = drinkGeometry => {
    this.setState({drinkGeometry});
  }

  render() {
    const {drinkGeometry, Ypos} = this.state;
    const {distance} = this.props;
    //const Ypos = this.props.drinkY;
    //const Xpos = this.props.drinkX;
    if (drinkGeometry) {
      return (
        <mesh
          position={new THREE.Vector3(2, 0, 0)}
          scale={new THREE.Vector3(1, 1, 1)}
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

Drink.propTypes = {
  barierY: PropTypes.number,
  barierX: PropTypes.number
};
