import React from 'react';

import Barier from './Barier.jsx';

class Bariers extends React.Component {

  constructor(props, context) {

    super(props, context);

    this.state = {
    };


  }

  componentWillMount() {

  }

  render() {
    const barierY = - 30;
    const planeWidth = 8;
    const barierX = Math.floor(Math.random() * planeWidth) - planeWidth / 2;

    return (
      <Barier barierX={barierX} barierY={barierY} />
    );
  }
}

export default Bariers;
