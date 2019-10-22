import React from 'react';
import { useMutation } from 'urql';

import Heart from './Heart';

const Thread = ({ id, title, likesNumber }) => {
  // 1. write likeThread mutation
  const [response, likeThread] = useMutation(`
    mutation LikeThread($threadId: ID!) {
    likeThread(threadId: $threadId) {
      id
    }
  }
  `);

  // 2. handle error from response
  if (response.error) {
    alert(response.error);
  }

  const handleHeartClick = () => {
    // 3. fire off the likeThread mutation
    likeThread({ threadId: id });
  };

  return (
    <div className="Thread">
      <span>{title}</span>
      <button className="Heart" onClick={handleHeartClick}>
        <Heart liked={!!response.data} />
      </button>
      <span className="LikesNumber">{likesNumber}</span>
    </div>
  );
};

export default Thread;
