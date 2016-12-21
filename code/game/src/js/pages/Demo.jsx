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
          <Link className='startbutton' to='/game'>SPEEL HET SPEL!</Link>
        </div>
      );
    } else {
      return (
        <div>
          <h3>stuur dit naar vriend: link.be/join/{urlSocketId}</h3>
          <Link className='startbutton' to={`/game/${urlSocketId}`}>SPEEL HET SPEL!</Link>
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
