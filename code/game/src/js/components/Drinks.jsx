import React from 'react';

import {Drink} from './singleElements/';

class Drinks extends React.Component {

  constructor(props, context) {

    super(props, context);

    this.state = {
      drinkY: - 100
    };
  }

  componentDidMount() {
    //let drinkX;
    let {drinkY} = this.state;
    const planeWidth = 8;
    const randomXpos = Math.floor(Math.random() * planeWidth) - planeWidth / 2;

    this.countdown = setInterval(() => {
      // TO DO:sneller en sneller in game
      console.log(`intervalling`);
      //UIT SCHERM = NIEUWE BARIER
      if (drinkY >= 10) {
        this.setState({drinkX: randomXpos});
        this.setState({drinkY: - 99});

        //COLLISION MET auto
        this.checkCollision();

      } else {
        drinkY ++;
        this.setState({drinkX: randomXpos});
        this.setState({drinkY});

        //COLLISION MET auto
        this.checkCollision();

      }

      // this.props.getBarierY(drinkY);
      // this.props.getBarierX(drinkX);


    }, 80);

  }

  checkCollision() {
    const carX = this.props.carX;
    const carY = this.props.carY;
    const drinkY = this.state.drinkY;
    const drinkX = this.state.drinkX;

    const carwidth = 0.8;
    const carDepth = 0.8;

    console.log(carX, carY, drinkX, drinkY);

    if (drinkX <= carX + carwidth && drinkX >= carX) {
      if (drinkY <= carY + carDepth / 2 && drinkY >= carY - carDepth / 2) {
        console.log(`bots`);
      }
    }
  }

  renderDrinks() {
    const {drinkX, drinkY} = this.state;

    return <Drink drinkX={drinkX} drinkY={drinkY} />;
  }

  render() {
    return (
      this.renderDrinks()
    );
  }
}

export default Drinks;
