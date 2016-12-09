import React from 'react';

import Barier from './Barier.jsx';

class Bariers extends React.Component {

  constructor(props, context) {

    super(props, context);

    this.state = {
      barierY: - 30,
      activeBariers: [`test`, `test`, `test`, `test`]
    };
  }

  componentDidMount() {
    const planeWidth = 8;
    const barierX = Math.floor(Math.random() * planeWidth) - planeWidth / 2;
    this.setState({barierX});

    let {barierY} = this.state;
    this.countdown = setInterval(() => {
      barierY += 1;
      this.setState({barierY});

      if (barierY > 10) {
        barierY = - 30;
        this.setState({barierY: - 30});
      }
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
