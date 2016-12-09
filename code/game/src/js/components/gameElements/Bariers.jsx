import React from 'react';

import Barier from './Barier.jsx';

class Bariers extends React.Component {

  constructor(props, context) {

    super(props, context);

    this.state = {
      barierY: - 60,
      activeBariers: [`test`, `test`, `test`, `test`]
    };
  }

  componentDidMount() {
    let barierX;
    let {barierY} = this.state;

    this.countdown = setInterval(() => {

      // Y POS ++
// TO DO:sneller en sneller in game
      barierY += 1;
      this.setState({barierY});

      if (barierY > 10) {
        //RANDOM X POS (daarna)
        const planeWidth = 8;
        barierX = Math.floor(Math.random() * planeWidth) - planeWidth / 2;
        this.setState({barierX});

        barierY = - 30;
        this.setState({barierY: - 30});
      }

      //EERSTE X POS
      let barierX = 0;
    }, 100);

  }

  renderBariers() {
    const {barierX, barierY, activeBariers} = this.state;
    console.log(activeBariers);
    // const activeBariersList = activeBariers.map(function(name, i) {
    //   return <Barier key={i} barierX={barierX} barierY={barierY} />;
    // });
    // console.log(activeBariersList);

    return <Barier barierX={barierX} barierY={barierY} />;
    // return activeBariersList;
  }

  render() {
    return (
      this.renderBariers()
    );
  }
}

export default Bariers;
