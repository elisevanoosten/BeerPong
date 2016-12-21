import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

class Demo extends Component {

  componentDidMount() {
  }

  render() {
    const {urlSocketId} = this.props;
    //
    if (urlSocketId === undefined) {
      return (
        <div>
          <h3>DEMO TEGEN COMPUTER</h3>
          <Link className='startBig' to='/game'>SPEEL HET SPEL!</Link>
        </div>
      );
    } else {
      return (
        <div>
          <h3>stuur dit naar vriend: link.be/join/{urlSocketId}</h3>
          {/* <game player='friend' /> */}
          {/* <Link className='startbutton' to={`/game/\${socketId}`}>Speel tegen een vriend</Link> */}
          <Link className='startBig' to={`/game/${urlSocketId}`}>SPEEL HET SPEL!</Link>
        </div>
      );
    }
  }
}

Demo.propTypes = {
  params: PropTypes.object,
  mySocketId: PropTypes.string,
  urlSocketId: PropTypes.string
};

export default Demo;
