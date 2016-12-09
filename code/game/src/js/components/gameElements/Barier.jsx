import React, {PropTypes} from 'react';
import * as THREE from 'three';

const Barier = props => {

  console.log(`barier`);

  const {barierX} = props;
  const {barierY} = props;

  return (
    <mesh
      position={new THREE.Vector3(barierX, barierY, 0)}
      castShadow={true}
    >
      <boxGeometry
        width={1}
        height={1}
        depth={1}
      />
      <meshBasicMaterial
        color={0xffffff}
      />
    </mesh>
  );
};

Barier.propTypes = {
  barierX: PropTypes.int,
  barierY: PropTypes.int
};

export default Barier;
