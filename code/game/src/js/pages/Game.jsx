import React, {Component, PropTypes} from 'react';

import {GamePlay} from '../containers';

class Game extends Component {

  state = {
    //socketId: undefined
  }

  componentWillMount() {
    const socketId = this.props.params.socketId;
    this.setState({socketId});
  }

  render() {
    const {socketId} = this.state;
    if (socketId === undefined) {
      return (
        <div>
          <GamePlay />
        </div>
      );
    }
    else {
      return (
        <div>
          <GamePlay player={socketId} />
        </div>
      );
    }
  }
}

Game.propTypes = {
  params: PropTypes.object
};

export default Game;
