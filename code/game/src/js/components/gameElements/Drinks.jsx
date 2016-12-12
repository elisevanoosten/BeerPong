import React from 'react';

import Drink from './Drink.jsx';

class Drinks extends React.Component {

  constructor(props, context) {

    super(props, context);

    this.state = {
      drinkY: - 150
    };
  }

  componentDidMount() {
    let drinkX;
    let {drinkY} = this.state;

    this.countdown = setInterval(() => {

      // Y POS ++
// TO DO:sneller en sneller in game
      drinkY += 1;
      this.setState({drinkY});

      if (drinkY > 10) {
        //RANDOM X POS (daarna)
        const planeWidth = 8;
        drinkX = Math.floor(Math.random() * planeWidth) - planeWidth / 2;
        this.setState({drinkX});

        drinkY = - 150;
        this.setState({drinkY: - 30});
      }

      //EERSTE X POS
      let drinkX = 0;
    }, 80);

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
