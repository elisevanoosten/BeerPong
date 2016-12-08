import {Component} from 'react';
import * as THREE from 'three';

export default class Ground extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  render() {
    const fieldWidth = 700, fieldHeight = 200;

    console.log(`hey`);

    const planeMaterial = new THREE.MeshLambertMaterial({
      color: 0x20252B
    });

    const planeWidth = fieldWidth,
      planeHeight = fieldHeight,
      planeQuality = 10;

    const plane = new THREE.Mesh(

        new THREE.PlaneGeometry(
          planeWidth * 0.95,	// 95% of table width, since we want to show where the obstacle goes out-of-bounds
          planeHeight,
          planeQuality,
          planeQuality), planeMaterial);

    plane.position.x = planeHeight - 51;
    plane.receiveShadow = true;

    return (`hey`);
  }
}
