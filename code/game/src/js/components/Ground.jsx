import React from 'react';
import * as THREE from 'three';

const Ground = () => {

  // const roadTexLoader = new THREE.TextureLoader();
  // const roadTex = roadTexLoader.load(`../assets/img/road.png`);
  // const mesh = null;

  // const planeRotation = new THREE.Euler(- 1.32, 0, 0, `XYZ`);
  const planeRotation = new THREE.Euler(36.105, 0, 0, `XYZ`);

  return (
    <mesh
      rotation={planeRotation}
      >
      <planeGeometry
        width={10}
        height={800}
      />
      <meshBasicMaterial>
        <texture url={`../assets/img/road.png`} />
      </meshBasicMaterial>
    </mesh>
  );
};

export default Ground;
