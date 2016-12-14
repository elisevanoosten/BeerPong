import React, {PropTypes} from 'react';

import {Barier} from './singleElements/';

class Bariers extends React.Component {

  constructor(props, context) {

    super(props, context);

    this.state = {
      barierY: - 100,
      barierX: this.getRandomPos(),
      gameEnd: false
    };
  }

  componentDidMount() {
    let {barierY} = this.state;
    const delay = 1000; //1 second

    setInterval(() => {
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
        console.log(`bots boem baf -- barrier rood`);
        this.state.gameEnd = true;
        console.log(`einde spel`, this.state.gameEnd);
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

  render() {
    const {barierX, barierY} = this.state;
    return <Barier barierX={barierX} barierY={barierY} />;

    // const rows = [];
    // const numrows = 4;
    // for (let i = 0;i < numrows;i ++) {
    //   rows.push({barierX: barierX, barierY: barierY});
    // }
    // console.log(rows);
    // return (
    //   {rows.map((object) => (
    //     <Barier barierX={object.barierX} barierY={object.barierY} />
    //   ))}
    // );
  }
}


Bariers.propTypes = {
  carY: PropTypes.number,
  carX: PropTypes.number,
  gameEnd: PropTypes.bool
  // getBarierY: PropTypes.func,
  // getBarierY: PropTypes.func
};


export default Bariers;
