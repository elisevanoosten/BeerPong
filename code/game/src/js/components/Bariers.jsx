import React, {PropTypes} from 'react';

import {Barier} from './singleElements/';

class Bariers extends React.Component {

  constructor(props, context) {

    super(props, context);

    this.state = {
      //barierX: this.getRandomPos(),
      // barierPos: [
      //   {
      //     xPos: this.getRandomPos(),
      //     distance: 60,
      //   },
      //   {
      //     xPos: this.getRandomPos(),
      //     distance: 80
      //   },
      //   {
      //     xPos: this.getRandomPos(),
      //     distance: 50
      //   },
      //   {
      //     xPos: this.getRandomPos(),
      //     distance: 90
      //   },
      //   {
      //     xPos: this.getRandomPos(),
      //     distance: 10
      //   },
      //   {
      //     xPos: this.getRandomPos(),
      //     distance: 40
      //   }
      // ]
      bariers: []
    };
  }

  componentDidMount() {
    this.loopBariers();
    requestAnimationFrame(() => {this.updateY();});

    // let {barierY} = this.state;

    //const randomDistance = Math.random() * (500 - 1000) + 500;
    //const delay = 1000; //1 second

    // this.checkCollision();

    // this.loadInterval = setInterval(() => {
    // //   // barier later laten vertrekken
    // //
    //   barierY += 1;
    //   this.setState({barierY});
    // //
    //   this.checkCollision();
    // //
    // //   if (barierY > 10) {
    // //     //barierX = this.getRandomPos();
    // //     //this.setState({barierX});
    // //
    // //     barierY = - 250;
    // //     this.setState({barierY: - 150});
    // //
    // //   }
    // //
    // //   const barierX = 0;
    // //
    // }, 35);

  }

  getRandomXpos() {
    const planeWidth = 8;
    return Math.floor(Math.random() * planeWidth) - planeWidth / 2;
  }

  getRandomYpos() {
    return Math.floor(Math.random() * 170) - 200 / 2;
  }

  checkCollision() {
    const {carX, carY} = this.props;
    const {barierY, barierPos} = this.state;

    //const xPos = barierPos.xPos;
    //const aantalBarieres = barierPos.length;


    barierPos.map((barier, i) => {
      const xPos = barierPos[i].xPos;
      const carwidth = 1.65;
      const carDepth = 1;

      if (xPos <= carX + carwidth && xPos >= carX) {
        if (barierY <= carY + carDepth / 2 && barierY >= carY - carDepth / 2) {
          console.log(`dood`);
          this.props.gameEnd();
        }
      }

      return barier;
    });
  }

  componentWillUnmount () {
    this.loadInterval && clearInterval(this.loadInterval);
    this.loadInterval = false;
  }

  //const randomDistance = Math.random() * (40 - 80) + 40;

  renderBariers() {
    const bariers = [];

    this.loopBariers(bariers);
    return bariers;
  }

  updateY() {
    let {bariers} = this.state;

    bariers.map(function(barier, i) {
      barier.barierY += 0.5;

      console.log(barier.barierY);

      if (barier.barierY > 100) {

        bariers = bariers.filter(b => b !== bariers[i]);
        const planeWidth = 8;

        const barierX = Math.floor(Math.random() * planeWidth) - planeWidth / 2;
        const barierY = Math.floor(Math.random() * 170) - 200 / 2;

        bariers.push({
          barierX: barierX,
          barierY: barierY,
        });
      }
    });

    this.setState({bariers});

    requestAnimationFrame(() => {this.updateY();});
  }

  // sendYposHandler(index) {
  //   // console.log(`nieuwe ding in barierpos steken`);
  //   const {barierPos} = this.state;
  //   // console.log(index);
  //   barierPos[index].xPos = this.getRandomPos();
  //   this.setState({barierPos});
  //   //
  //   // loopBariers(barierpos)
  //
  //   // const {barierPos} = this.props;
  //   // bariers[index].push(<Barier index={index} distance={barierPos[index].distance} barierX={barierPos[index].xPos} sendYpos={index => this.sendYposHandler(index)} />);
  //
  // }

  loopBariers(bariers) {
    for (let i = 0;i <= 8;i ++) {
      this.pushBarier();
    }
    return bariers;
  }

  pushBarier() {
    const {bariers} = this.state;
    const barierX = this.getRandomXpos();
    const barierY = this.getRandomYpos();

    bariers.push({
      barierX: barierX,
      barierY: barierY
    });
    this.setState({bariers});
    console.log(bariers);
  }

  render() {
    const {bariers} = this.state;
    return (
      <group>
        {bariers.map(function(barier, i) {
          return <Barier key={i} barierX={barier.barierX} barierY={barier.barierY} />;
        })}
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
