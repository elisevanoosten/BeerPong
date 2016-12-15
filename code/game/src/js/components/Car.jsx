
import React, {PropTypes} from 'react';
// import React3 from 'react-three-renderer';
import * as THREE from 'three';

const Car = props => {

  const Xpos = props.carX;
  const Geometry = props.geometry;
  // const Materials = props.materials;

  return (

    <mesh
      position={new THREE.Vector3(Xpos, 0, 0)}
    >
      <geometry
        geometry={Geometry.geometry}
        vertices={Geometry.vertices}
        faces={Geometry.faces}
        colors={Geometry.colors}
      />
      <meshLambertMaterial
        color={0xffffff}
      />
    </mesh>
  );

};

Car.propTypes = {
  carX: PropTypes.number,
  geometry: PropTypes.object,
  // materials: PropTypes.object
};

export default Car;
