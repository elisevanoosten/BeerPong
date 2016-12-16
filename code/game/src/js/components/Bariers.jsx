import React, {PropTypes} from 'react';

import {Barier} from './singleElements/';

class Bariers extends React.Component {

  constructor(props, context) {

    super(props, context);

    this.state = {
      barierY: - 100,
      barierX: this.getRandomPos(),
    };
  }

  componentDidMount() {
    let {barierY} = this.state;
    const delay = 1000; //1 second

    this.loadInterval = setInterval(() => {
      // barier later laten vertrekken
      setTimeout(() => {

        barierY += 1;
        this.setState({barierY});

        this.checkCollision();

        if (barierY > 10) {
          barierX = this.getRandomPos();
          this.setState({barierX});

          barierY = - 150;
          this.setState({barierY: - 150});
        }

        let barierX = 0;

      }, delay);
    }, 40);

  }

  getRandomPos() {
    const planeWidth = 8;
    return Math.floor(Math.random() * planeWidth) - planeWidth / 2;
  }

  checkCollision() {
    const {carX, carY} = this.props;
    const {barierY, barierX} = this.state;

    const carwidth = 0.8;
    const carDepth = 0.8;

    if (barierX <= carX + carwidth && barierX >= carX) {
      if (barierY <= carY + carDepth / 2 && barierY >= carY - carDepth / 2) {
        //console.log(`bots boem baf -- barrier rood`);
        this.props.gameEnd();
      }
    }
  }

  // renderBariers() {
  //   const activeBariersList = activeBariers.map(function(name, i) {
  //     return <Barier key={i} barierX={barierX} barierY={barierY} />;
  //   });
  //   return <Barier barierX={barierX} barierY={barierY} />;
  //   return activeBariersList;
  // }

  componentWillUnmount () {
    this.loadInterval && clearInterval(this.loadInterval);
    this.loadInterval = false;
  }

  renderBariers() {
    const {barierX, barierY} = this.state;


    const bariers = [];
    for (let i = 0;i < 53;i += 30) {
      //console.log(i + barierX);
      bariers.push(<Barier key={i} barierX={barierX + i} barierY={barierY} />);
    }

    // console.log(bariers);
    return {bariers};
  }

  render() {
    const {barierX, barierY} = this.state;
    const geometry = this.props.geometry;

    const bariers = this.renderBariers();
    //console.log(bariers[1]);
    return (
      // bariers.map(bariers => (
        // {bariers}
        <Barier  barierX={barierX} barierY={barierY} geometry={geometry} />
      // ))
    );
  }
}


Bariers.propTypes = {
  carY: PropTypes.number,
  carX: PropTypes.number,
  // getBarierY: PropTypes.func,
  gameEnd: PropTypes.func,
  geometry: PropTypes.object
};


export default Bariers;
