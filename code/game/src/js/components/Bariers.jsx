import React from 'react';

import {Barier} from './singleElements/';

class Bariers extends React.Component {

  constructor(props, context) {

    super(props, context);

    this.state = {
      barierY: - 100
    };
  }

  componentDidMount() {
    //let barierX;
    let {barierY} = this.state;
    const planeWidth = 8;
    const randomXpos = Math.floor(Math.random() * planeWidth) - planeWidth / 2;

    this.countdown = setInterval(() => {
      // TO DO:sneller en sneller in game
      console.log(`intervalling`);
      barierY ++;
      //UIT SCHERM = NIEUWE BARIER
      if (barierY >= 10) {
        this.setState({barierX: randomXpos});
        this.setState({barierY: - 99});

        //COLLISION MET auto
        this.checkCollision();

      } else {
        this.setState({barierX: randomXpos});
        this.setState({barierY});

        //COLLISION MET auto
        this.checkCollision();

      }

      // this.props.getBarierY(barierY);
      // this.props.getBarierX(barierX);


    }, 100);

  }

  checkCollision() {
    const carX = this.props.carX;
    const carY = this.props.carY;
    const barierY = this.state.barierY;
    const barierX = this.state.barierX;

    const carwidth = 0.8;
    const carDepth = 0.8;

    console.log(carX, carY, barierX, barierY);

    if (barierX <= carX + carwidth && barierX >= carX) {
      if (barierY <= carY + carDepth / 2 && barierY >= carY - carDepth / 2) {
        console.log(`bots`);
      }
    }
  }

  renderBariers() {
    const {barierX, barierY} = this.state;
    // const activeBariersList = activeBariers.map(function(name, i) {
    //   return <Barier key={i} barierX={barierX} barierY={barierY} />;
    // });

    return <Barier barierX={barierX} barierY={barierY} />;
    // return activeBariersList;
  }

  render() {
    return (
      this.renderBariers()
    );
  }
}
//
// Bariers.propTypes = {
//   // getBarierY: PropTypes.func,
//   // getBarierY: PropTypes.func
// };


export default Bariers;
