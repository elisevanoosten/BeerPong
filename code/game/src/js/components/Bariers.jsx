import React, {PropTypes} from 'react';

import {Barier} from './singleElements/';

class Bariers extends React.Component {

  constructor(props, context) {

    super(props, context);

    this.state = {
      barierY: - 100,
      //barierX: this.getRandomPos(),
    };
  }

  componentDidMount() {
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

  getRandomPos() {
    const planeWidth = 8;
    return Math.floor(Math.random() * planeWidth) - planeWidth / 2;
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
    //requestAnimationFrame(() => {this.update()});
  }

  sendYposHandler(index) {
    // console.log(`nieuwe ding in barierpos steken`);
    const {barierPos} = this.props;
    // console.log(index);
    barierPos[index].xPos = this.getRandomPos();
    // this.setState({barierPos});
    //
    // loopBariers(barierpos)

    // const {barierPos} = this.props;
    // bariers[index].push(<Barier index={index} distance={barierPos[index].distance} barierX={barierPos[index].xPos} sendYpos={index => this.sendYposHandler(index)} />);

  }

  loopBariers(bariers) {

    const {barierY} = this.state;
    const {barierPos} = this.props;

    for (let i = 0;i <= (barierPos.length - 1);i ++) {
    // this.loadInterval = setInterval(() => {
    //   console.log(`barrier`);
    //   //const Ypos = barierY - i * 100;
      bariers.push(<Barier key={i} index={i} distance={barierPos[i].distance} barierX={barierPos[i].xPos} sendYpos={index => this.sendYposHandler(index)} />);
    //   bariers.push(<Barier barierX={this.getRandomPos()} />);
    //   // if (i + 1 === barierPos.length) {
    //     //console.log(`end`);
    //     // bariers = [];
    //     // this.loopBariers();
    //   // }
    // }, 300);
    }

    // bariers.push(<Barier barierX={this.getRandomPos()} sendYpos={ypos => this.sendYposHandler()} />);

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
