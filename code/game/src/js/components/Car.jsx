//
// import React, {PropTypes} from 'react';
// // import React3 from 'react-three-renderer';
// import * as THREE from 'three';
//
// const Car = props => {
//   let carGeometry;
//   const Xpos = props.carX;
//
//   //LOAD 3DCAR
//   const carLoader = new THREE.JSONLoader();
//   carLoader.load(`./assets/json/autofile.json`, function(geometry, materials) {
//     carGeometry = geometry;
//   });
//
//   console.log(carGeometry);
//
//   //const Geometry = props.geometry;
//   // const Materials = props.materials;
//
//   return (
//     <group></group>
//     // <mesh
//     //   position={new THREE.Vector3(Xpos, 0, 0)}
//     // >
//   /* <geometry
//         geometry={Geometry}
//         vertices={Geometry}
//         faces={Geometry}
//         colors={Geometry}
//       />
//       <meshLambertMaterial
//         color={0xffffff}
//   /> */
//     // </mesh>
//   );
//
// };

import React, {Component} from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import {remove} from 'lodash';
export default class Car extends Component {

  state = {}

  componentDidMount() {
    const carLoader = new THREE.JSONLoader();
    carLoader.load(`./assets/json/autofile.json`, this.loadCar);
  }

  loadCar = (carGeometry, carMaterials) => {
    carMaterials = carMaterials[0];
    this.setState({carGeometry, carMaterials});
  }

  render() {
    const {carGeometry, carMaterials} = this.state;
    const Xpos = this.props.carX;

    const material = new THREE.MultiMaterial(carMaterials);

    if (carGeometry && carMaterials) {
      console.log(carMaterials);

      return (
          <mesh
            position={new THREE.Vector3(Xpos, 0, 0)}
          >
            <geometry
              //geometry={carGeometry.geometry}
              vertices={carGeometry.vertices}
              faces={carGeometry.faces}
              colors={carGeometry.colors}
            />
          <meshPhongMaterial
            // {...carMaterials}
            // slot={carMaterials.slot}
            visible={carMaterials.visible}
            transparent={carMaterials.transparent}
            alphaTest={carMaterials.alphaTest}
            side={carMaterials.side}
            opacity={carMaterials.opacity}
            visible={carMaterials.visible}
            color={carMaterials.color}
            specular={carMaterials.specular}
            emissive={carMaterials.emissive}
            // wireframe={carMaterials.wireframe}
            // wireframeLinewidth={carMaterials.wireframeLinewidth}
            // shininess={carMaterials.shininess}
            // metal={carMaterials.metal}
            // lightMapIntensity={carMaterials.lightMapIntensity}
            // aoMapIntensity={carMaterials.aoMapIntensity}
            // emissiveIntensity={carMaterials.emissiveIntensity}
            // bumpScale={carMaterials.bumpScale}
            // displacementScale={carMaterials.displacementScale}
            // reflectivity={carMaterials.reflectivity}
            // displacementBias={carMaterials.displacementBias}
            // refractionRatio={carMaterials.refractionRatio}
            // wireframeLinewidth={carMaterials.wireframeLinewidth}
            // normalScale={carMaterials.normalScale}
            // shading={carMaterials.shading}
            // skinning={carMaterials.skinning}
            // morphTargets={carMaterials.morphTargets}
            // morphNormals={carMaterials.morphNormals}
            // resourceId={carMaterials.resourceId}
             />
          </mesh>
      );
    } else {
      return (
        <group></group>
      );
    }

  }

}
