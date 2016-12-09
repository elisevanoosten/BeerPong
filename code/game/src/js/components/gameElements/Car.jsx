
import React, {PropTypes} from 'react';
import * as THREE from 'three';

const Car = props => {

  const Xpos = props.carX;

  // let car;
  //     //
  //     // const carLoader = new THREE.JSONLoader();
  //     // carLoader.load(`./assets/json/marmelab.json`, function(geometry, materials) {
  //     //   car = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
  //     //   car.scale.x = car.scale.y = car.scale.z = 16.75;
  //     //   car.translation = THREE.GeometryUtils.center(geometry);
  //     // });

  return (
    <mesh
      position={new THREE.Vector3(Xpos, 0, 0)}
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

Car.propTypes = {
  carX: PropTypes.number
};

export default Car;
