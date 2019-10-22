import React from 'react';
import { useMutation } from 'urql';

import Heart from './Heart';

const Thread = ({ id, title, likesNumber }) => {
  // 1. write likeThread mutation

  // this is just a stub so the app doesn't break
  const response = {
    fetching: undefined,
    error: undefined,
    data: undefined,
  };

  // 2. handle error from response
  if (response.error) {
    alert(response.error);
  }

  // 3. fire off the likeThread mutation
  const handleHeartClick = () => {};

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
