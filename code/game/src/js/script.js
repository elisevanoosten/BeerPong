import React from 'react';
import {render} from 'react-dom';

// import App from './containers/App';
import Game from './containers/Game';

const init = () => {

  render (
    <Game />,
    // <App />,
    document.querySelector(`.container`)
  );

};

init();
