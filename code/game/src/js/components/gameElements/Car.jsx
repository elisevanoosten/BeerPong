
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

    // slot={Materials[0].slot}
    // transparent={Materials[0].transparent}
    // aplhaTest={Materials[0].aplhaTest}
    // side={Materials[0].side}
    // opacity={Materials[0].opacity}
    // visible={Materials[0].visible}
    // color={Materials[0].color}
    // emissive={Materials[0].emissive}
    // wireframe={Materials[0].wireframe}
    // wireframeLinewidth={Materials[0].wireframeLinewidth}
    // recourceId={Materials[0].recourceId}
  );

};

Car.propTypes = {
  carX: PropTypes.number,
  geometry: PropTypes.object,
  // materials: PropTypes.object
};

export default Car;
