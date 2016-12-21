// CLICK START TO START

import React, {PropTypes} from 'react';

// import GamePlay from '../components';

const Game = props => {

  console.log(props);

  // let urlSocketId;
  // let mySocketId;

  // const {urlSocketId} = props.params;\if
  // if (params) {
  //   console.log(`er zijn params`);
  //   urlSocketId = params.urlSocketId;
  //   // console.log(props.params, props.mySocketId);
  //   console.log(params);
  // }

  // if (props) {
  //   console.log(`er zijn props`);
  //   mySocketId = props.mySocketId;
  //   console.log(mySocketId);
  // }
  //
  // if (mySocketId && urlSocketId) {

  // }
  // if (urlSocketId) {
  return (
      <div>
        {/* <GamePlay player='friend' /> */}
      </div>
  );

};

Game.propTypes = {
  params: PropTypes.object,
  mySocketId: PropTypes.string
};

export default Game;
