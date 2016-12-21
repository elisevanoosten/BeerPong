import React, {Component, PropTypes} from 'react';
//import React3 from 'react-three-renderer';
import * as THREE from 'three';

export default class Car extends Component {

  state = {}

  componentDidMount() {
    const carLoader = new THREE.JSONLoader();
    carLoader.load(`../assets/json/car.json`, this.loadCar);
  }

  loadCar = (carGeometry, carMaterials) => {
    carMaterials = carMaterials[0];
    this.setState({carGeometry, carMaterials});
  }

  render() {
    const {carGeometry} = this.state;
    const Xpos = this.props.carX;

    // const material = new THREE.MultiMaterial(carMaterials);

    if (carGeometry) {

      return (
          <mesh
            position={new THREE.Vector3(Xpos, 0, 0)}
            rotation={new THREE.Euler(0, 3.16, 0)}
          >
            <geometry
              //geometry={carGeometry.geometry}
              vertices={carGeometry.vertices}
              faces={carGeometry.faces}
              colors={carGeometry.colors}
            />
            <meshLambertMaterial
              color={0x901595}
            />
            {/* <meshStandardMaterial
              //{...carMaterials}
              visible={carMaterials.visible}
              transparent={carMaterials.transparent}
              alphaTest={carMaterials.alphaTest}
              side={carMaterials.side}
              opacity={carMaterials.opacity}
              color={carMaterials.color}
              emissive={carMaterials.emissive}
              wireframe={carMaterials.wireframe}
              wireframeLinewidth={carMaterials.wireframeLinewidth}
              lightMapIntensity={carMaterials.lightMapIntensity}
              aoMapIntensity={carMaterials.aoMapIntensity}
              emissiveIntensity={carMaterials.emissiveIntensity}
              bumpScale={carMaterials.bumpScale}
              displacementScale={carMaterials.displacementScale}
              displacementBias={carMaterials.displacementBias}
              refractionRatio={carMaterials.refractionRatio}
              normalScale={carMaterials.normalScale}
              shading={carMaterials.shading}
              skinning={carMaterials.skinning}
              morphTargets={carMaterials.morphTargets}
              morphNormals={carMaterials.morphNormals}
              resourceId={carMaterials.resourceId}
            /> */}
          </mesh>
      );
    } else {
      return (
        <group></group>
      );
    }

  }

}


Car.propTypes = {
  carX: PropTypes.number
};
