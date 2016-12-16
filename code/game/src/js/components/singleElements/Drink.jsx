import React, {PropTypes} from 'react';
import * as THREE from 'three';

const Drink = props => {

  const xPos = props.drinkX;
  const yPos = props.drinkY;
  const geometry = props.geometry;

  return (
    <mesh
      position={new THREE.Vector3(xPos, 0, yPos)}
      scale={new THREE.Vector3(0.15, 0.15, 0.15)}
    >
      <geometry
        geometry={geometry.geometry}
        vertices={geometry.vertices}
        faces={geometry.faces}
        colors={geometry.colors}
      />
      <meshLambertMaterial
        color={0xffffff}
      />
    </mesh>
  );
};

Drink.propTypes = {
  drinkX: PropTypes.number,
  drinkY: PropTypes.number,
  geometry: PropTypes.object
};

export default Drink;
