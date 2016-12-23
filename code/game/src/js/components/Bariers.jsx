import React, {PropTypes} from 'react';
import {Barier} from './singleElements/';

class Bariers extends React.Component {

  constructor(props, context) {

    super(props, context);

    this.state = {
      bariers: []
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.loopBariers();
      requestAnimationFrame(() => {this.updateY();});
    }, 1500);

    const {player, urlSocketId} = this.props;
    if (player === `me` || urlSocketId === `computer`) {
      requestAnimationFrame(() => {this.checkCollision();});
    }
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
    const {bariers} = this.state;

    const carwidth = 8;
    const carDepth = 2;

    bariers.map(barier => {
      if (barier.barierX <= carX + carwidth && barier.barierX >= carX) {
        if (barier.barierY <= carY + carDepth / 2 && barier.barierY >= carY - carDepth / 2) {
          if ((player === `me`) || (player === `computer`)) {
            this.props.gameEnd(`barier`);
          } else if (player === `friend`) {
            this.props.gameEnd(`barierfriend`);
          }
        }
      }
    });

    requestAnimationFrame(() => {this.checkCollision();});
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

  loopBariers(bariers) {
    for (let i = 0;i <= 6;i ++) {
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
  gameEnd: PropTypes.func,
  player: PropTypes.string,
  urlSocketId: PropTypes.string
};


export default Bariers;
