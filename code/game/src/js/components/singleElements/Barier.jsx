import React, {PropTypes} from 'react';
import * as THREE from 'three';

const Barier = props => {

  const xPos = props.barierX;
  const yPos = props.barierY;
  const geometry = props.geometry;

  return (
    <mesh
      position={new THREE.Vector3(xPos, 0, yPos)}
      scale={new THREE.Vector3(1, 1, 1)}
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

Barier.propTypes = {
  barierX: PropTypes.number,
  barierY: PropTypes.number,
  geometry: PropTypes.obj
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
