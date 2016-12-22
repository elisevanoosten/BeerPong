import React, {PropTypes} from 'react';
import {Drink} from './singleElements/';

class Drinks extends React.Component {

  constructor(props, context) {

    super(props, context);

    this.state = {
      drinks: [],
      drinkCount: 0
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.loopDrinks();
      requestAnimationFrame(() => {this.updateY();});
      requestAnimationFrame(() => {this.checkCollision();});
    }, 1500);
  }

  getRandomXpos() {
    const planeWidth = 8;
    return Math.floor(Math.random() * planeWidth) - planeWidth / 2;
  }

  getRandomYpos() {
    return Math.floor(Math.random() * 400) - 420 / 2;
  }

  checkCollision() {
    const {carX, carY, player} = this.props;
    const {drinks} = this.state;
    let remove;

    drinks.map((drink, i) => {
      const xPos = drinks[i].drinkX;
      const yPos = drinks[i].drinkY;
      const carwidth = 4;
      const carDepth = 0.5;

      //console.log(xPos, yPos);

      if (xPos <= carX + carwidth && xPos >= carX) {
        if (yPos <= carY + carDepth / 2 && yPos >= carY - carDepth / 2) {
          this .state.drinkCount ++;
          //console.log(this.state.drinkCount);
          if (player === `me`) {
            this.setBlurry();
            //this.updateY(remove);
          }
          if (this.state.drinkCount > 5) {
            this.props.gameEnd(drink);
          }
        }
      }
    });

    requestAnimationFrame(() => {this.checkCollision();});
  }

  setBlurry() {
    const count =  this.state.drinkCount * 2;
    const view = document.querySelector(`.player-me`);
    view.style.filter = `blur(${ count }px)`;
  }

  componentWillUnmount () {
    this.loadInterval && clearInterval(this.loadInterval);
    this.loadInterval = false;
  }

  renderDrinks() {
    const drinks = [];
    this.loopDrinks(drinks);
    return drinks;
  }

  updateY(remove) {
    let {drinks} = this.state;
    //console.log(remove);

    //console.log(remove);

    drinks.map(function(drink, i) {
      drink.drinkY += 0.5;

      if (remove) {
        //bariers = bariers.filter(b => b !== bariers[i]);
        console.log(`remove`);
      }

      if (drink.drinkY > 100) {

        drinks = drinks.filter(b => b !== drinks[i]);
        const planeWidth = 8;

        const drinkX = Math.floor(Math.random() * planeWidth) - planeWidth / 2;
        const drinkY = Math.floor(Math.random() * 170) - 200 / 2;

        drinks.push({
          drinkX: drinkX,
          drinkY: drinkY,
        });
      }
    });

    this.setState({drinks});

    requestAnimationFrame(() => {this.updateY();});
  }

  loopDrinks(drinks) {
    for (let i = 0;i <= 5;i ++) {
      this.pushDrink();
    }
    return drinks;
  }

  pushDrink() {
    const {drinks} = this.state;
    const drinkX = this.getRandomXpos();
    const drinkY = this.getRandomYpos();

    drinks.push({
      drinkX: drinkX,
      drinkY: drinkY
    });
    this.setState({drinks});
  }

  render() {
    const {drinks} = this.state;
    return (
      <group>
        {drinks.map(function(drink, i) {
          return <Drink key={i} drinkX={drink.drinkX} drinkY={drink.drinkY} />;
        })}
      </group>
    );
  }
}

Drinks.propTypes = {
  carY: PropTypes.number,
  carX: PropTypes.number,
  gameEnd: PropTypes.func,
  player: PropTypes.string
};


export default Drinks;
