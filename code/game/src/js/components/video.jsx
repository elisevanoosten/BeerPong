/* API Peer is apart van onze applicatie, wordt vaak gedaan */
// bekijken: flow

import React, {PropTypes} from 'react';

const Video = ({stream}) => {

  if (stream) stream = URL.createObjectURL(stream); //omzetten naar objecturl

  return (

    <article className='video'>
      <video autoPlay src={stream}></video>
    </article>

  );

};

Video.propTypes = {
  meta: PropTypes.string,
  stream: PropTypes.object
};

export default Video;
