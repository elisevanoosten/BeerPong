import React, {PropTypes} from 'react';
import * as THREE from 'three';

const Drink = props => {

  const xPos = props.drinkX;
  const yPos = props.drinkY;

  return (
    <mesh
      position={new THREE.Vector3(xPos, 0, yPos)}
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
  );
};

Drink.propTypes = {
  drinkX: PropTypes.number,
  drinkY: PropTypes.number
};

export default Drink;
