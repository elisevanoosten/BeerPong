import React, {PropTypes} from 'react';

import {Barier} from './singleElements/';

class Bariers extends React.Component {

  constructor(props, context) {

    super(props, context);

    this.state = {
      barierY: - 100,
      barierPos: [
        {
          xPos: this.getRandomPos(),
          distance: 20
        },
        {
          xPos: this.getRandomPos(),
          distance: 40
        },
        {
          xPos: this.getRandomPos(),
          distance: 10
        },
        {
          xPos: this.getRandomPos(),
          distance: 30
        },
        {
          xPos: this.getRandomPos(),
          distance: 20
        },
        {
          xPos: this.getRandomPos(),
          distance: 10}
      ]
      //barierX: this.getRandomPos(),
    };
  }

  componentDidMount() {
    let {barierY} = this.state;

    //const randomDistance = Math.random() * (500 - 1000) + 500;
    //const delay = 1000; //1 second

    this.checkCollision();

    this.loadInterval = setInterval(() => {
    //   // barier later laten vertrekken
    //
      barierY += 1;
      this.setState({barierY});
    //
    //   this.checkCollision();
    //
    //   if (barierY > 10) {
    //     //barierX = this.getRandomPos();
    //     //this.setState({barierX});
    //
    //     barierY = - 250;
    //     this.setState({barierY: - 150});
    //
    //   }
    //
    //   const barierX = 0;
    //
    }, 35);

  }

  getRandomPos() {
    const planeWidth = 8;
    return Math.floor(Math.random() * planeWidth) - planeWidth / 2;
  }

  checkCollision() {
    const {carX, carY} = this.props;
    const {barierY, barierX} = this.state;

    const carwidth = 2;
    const carDepth = 1;

    if (barierX <= carX + carwidth && barierX >= carX) {
      if (barierY <= carY + carDepth / 2 && barierY >= carY - carDepth / 2) {
        this.props.gameEnd();
      }
    }
  }

  componentWillUnmount () {
    this.loadInterval && clearInterval(this.loadInterval);
    this.loadInterval = false;
  }

  //const randomDistance = Math.random() * (40 - 80) + 40;

  renderBariers() {
    const bariers = [];

    this.loopBariers(bariers);

    if (bariers) {
      return bariers;
    } else {
      console.log(`end`);
    }
    //requestAnimationFrame(() => {this.update()});
  }

  loopBariers(bariers) {

    const {barierX, barierY, barierPos} = this.state;

    for (let i = 0;i <= (barierPos.length - 1);i ++) {
      console.log(`for`);
      //const Ypos = barierY - i * 100;
      bariers.push(<Barier key={i} barierX={barierPos[i].xPos} barierY={barierY - i * barierPos[i].distance} />);

      if (i + 1 === barierPos.length) {
        console.log(`end`);
        // bariers = [];
        // this.loopBariers();
      }
    }

    return bariers;
  }

  render() {
    return (
      <group>
        {this.renderBariers()}
      </group>
    );
  }
}


Bariers.propTypes = {
  carY: PropTypes.number,
  carX: PropTypes.number,
  // getBarierY: PropTypes.func,
  gameEnd: PropTypes.func,
};


export default Bariers;
