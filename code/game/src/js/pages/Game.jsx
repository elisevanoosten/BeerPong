import React, {Component, PropTypes} from 'react';

import {GamePlay} from '../containers';

class Game extends Component {

  state = {
    urlSocketId: undefined,
    mySocketId: undefined
    // rooms: []
  };

  componentDidMount() {
    console.log(this.props.params, `YESSS`);
  }

  componentWillMount() {
    // const urlSocketId = this.props.params.urlSocketId;
    // this.setState({urlSocketId});
  }

  render() {
    // const {urlSocketId} = this.state;
    // const {mySocketId} = this.state;
    // console.log(urlSocketId, mySocketId, `hey`);

    // if (urlSocketId === undefined) {
    //   // tegen computer
    //   return (
    //     <div>
    //       <GamePlay player='computer' />
    //     </div>
    //   );
    // } else {
    //   if (urlSocketId === mySocketId) {
    //     // me
    //     return (
    //         <div>
    //           <GamePlay player='me' />
    //         </div>
    //     );
    //   } else {
        // friend
    return (
          <div>
            <GamePlay player='friend' />
          </div>
    );
      // }
    // }
  }
}

Game.propTypes = {
  params: PropTypes.object
};

export default Game;
