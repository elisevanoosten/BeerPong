import React, {PropTypes} from 'react';

import {Barier} from './singleElements/';


getRandomPos() {
  const planeWidth = 8;
  return Math.floor(Math.random() * planeWidth) - planeWidth / 2;
}

import React from 'react';

export default () => {

  for (let i = 0;i <= (barierPos.length - 1);i ++) {
    bariers.push(<Barier index={i} distance={barierPos[i].distance} barierX={barierPos[i].xPos} sendYpos={index => this.sendYposHandler(index)} />);
  }

  return (
  );

};
