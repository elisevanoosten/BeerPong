// CHOOSE BETWEEN COMPUTER OR FRIEND

import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
class Room extends Component {

  state = {
    //socketId: undefined
  }

  componentWillMount() {
    const socketId = this.props.params.socketId;
    this.setState({socketId});
    console.log(this.state);
  }

  // <div>
  //           <input id='friend' type='radio' name='player' value='friend' onClick={e => this.handleChoosePlayer(e)} />
  //           <label htmlFor='friend' className='radioLabel'></label>
  //         </div>
  //         <div>
  //           <input id='computer' type='radio' name='player' value='computer' onClick={e => this.handleChoosePlayer(e)} />
  //           <label htmlFor='computer' className='radioLabel'><img src='../../assets/img/computerbord.png' width='10%' height='10%' className='playerbord' /></label>
  //         </div>

  render() {
    const socketId = 343;
    return (
      <div className='choose'>
        <p className='intro'>Hoeveel invloed hebben jou slechte vrienden? <br />
        Speel het spel en ontdek!</p>
        <div>
          <Link to='/demo'><img src='../../assets/img/vriendenbord.png' width='10%' height='10%' className='playerbord' /></Link>
          <Link to={`/demo/${socketId}`}><img src='../../assets/img/computerbord.png' width='10%' height='10%' className='playerbord' /></Link>
        </div>
    </div>
    );
  }
}

Room.propTypes = {
  params: PropTypes.object,
};

export default Room;
