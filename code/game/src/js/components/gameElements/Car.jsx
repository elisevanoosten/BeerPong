import React, {Component} from 'react';
import * as THREE from 'three';

export default class Car extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
    };

    // let car;
    //
    // const carLoader = new THREE.JSONLoader();
    // carLoader.load(`./assets/json/marmelab.json`, function(geometry, materials) {
    //   car = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    //   car.scale.x = car.scale.y = car.scale.z = 16.75;
    //   car.translation = THREE.GeometryUtils.center(geometry);
    // });
  }

  render() {

    console.log(`hey`);

    return (
      <div>
      </div>
    );
  }
}
