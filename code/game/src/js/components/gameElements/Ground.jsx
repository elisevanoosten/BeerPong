import React from 'react';
import * as THREE from 'three';

const Ground = () => {

  const roadTexLoader = new THREE.TextureLoader();
  const roadTex = roadTexLoader.load(`../assets/img/road.png`);
  const mesh = null;

  const planeRotation = new THREE.Euler(36.105, 0, 0, `XYZ`);

  return (
    <mesh
      rotation={planeRotation}
      >
      <planeGeometry
        width={10}
        height={800}
      />
      <meshBasicMaterial
        // color={0xff0000}
        map={roadTex}
      />
    </mesh>
  );
};

export default Ground;
