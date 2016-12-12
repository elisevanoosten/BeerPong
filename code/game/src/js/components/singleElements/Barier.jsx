import React, {PropTypes} from 'react';
import * as THREE from 'three';

const Barier = props => {

  const xPos = props.barierX;
  const yPos = props.barierY;

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
        color={0xff0000}
      />
    </mesh>
  );
};

Barier.propTypes = {
  barierX: PropTypes.number,
  barierY: PropTypes.number
};

export default Barier;



{/* <mesh
  position={new THREE.Vector3(barierX, 0, barierY)}
  castShadow={true}
>
  <boxGeometry
    width={1}
    height={1}
    depth={1}
  />
  <meshBasicMaterial
    color={0xff0000}
  />
</mesh> */}
