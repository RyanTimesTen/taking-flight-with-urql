import React from 'react';
import { useMutation } from 'urql';

import Heart from './Heart';

const Thread = ({ id, title, likesNumber }) => {
  // write likeThread mutation
  const [response, likeThread] = useMutation(`
    mutation LikeThread($threadId: ID!) {
      likeThread(threadId: $threadId) {
        id
      }
    } 
  `);

  if (response.error) {
    alert(response.error);
  }

  return (
    <div className="Thread">
      <span>{title}</span>
      <button className="Heart" onClick={() => likeThread({ threadId: id })}>
        <Heart liked={response.data != null} />
      </button>
      <span className="LikesNumber">{likesNumber}</span>
    </div>
  );
};

export default Thread;
