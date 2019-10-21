import React, { useState } from 'react';
import { useMutation } from 'urql';

import Heart from './Heart';

const Thread = ({ id, title, likesNumber }) => {
  const [liked, setLiked] = useState(false);

  // write likeThread mutation

  const handleLike = () => {
    return new Promise(() => {});
    // invoke likeThread mutation with id
  };

  return (
    <div className="Thread">
      <span>{title}</span>
      <button
        className="Heart"
        onClick={() => handleLike().then(res => res && setLiked(true))}
      >
        <Heart liked={liked} />
      </button>
      <span className="LikesNumber">{likesNumber}</span>
    </div>
  );
};

export default Thread;
