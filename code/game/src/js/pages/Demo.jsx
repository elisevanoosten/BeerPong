import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

class Demo extends Component {

  state = {
    socketId: undefined
  }

  componentWillMount() {
    const socketId = this.props.params.socketId;
    this.setState({socketId});
    // console.log(this.state);
    // console.log(this.props);
  }

  render() {
    const {socketId} = this.state;
    if (socketId === undefined) {
      return (
        <div>
          {/* <game player='computer' /> */}
          <h3>DEMO TEGEN COMPUTER</h3>
          <Link className='startBig' to='/game'>SPEEL HET SPEL!</Link>
        </div>
      );
    } else {
      return (
        <div>
          <h3>stuur dit naar vriend: link.be/join/{this.state.socketId}</h3>
          {/* <game player='friend' /> */}
          {/* <Link className='startbutton' to={`/game/\${socketId}`}>Speel tegen een vriend</Link> */}
          <Link className='startBig' to={`/game/${socketId}`}>SPEEL HET SPEL!</Link>
        </div>
      );
    }
  }
}

Demo.propTypes = {
  params: PropTypes.object
};

export default Demo;
