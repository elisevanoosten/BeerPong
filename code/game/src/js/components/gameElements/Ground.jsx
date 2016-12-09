import React, {PropTypes} from 'react';
import * as THREE from 'three';

const Ground = () => {

  const roadTexLoader = new THREE.TextureLoader();
  const roadTex = roadTexLoader.load(`../assets/img/road.png`);
  const mesh = null;

  return (
    <mesh>
      <planeGeometry
        width={10}
        height={800}
      />
      <meshBasicMaterial
        map={roadTex}
      />
    </mesh>
  );
};

Ground.propTypes = {

};

export default Ground;
