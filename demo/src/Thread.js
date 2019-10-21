import React from 'react';

import Heart from './Heart';

const Thread = ({ id, title, likesNumber }) => {
  // 1. write likeThread mutation

  // 2. handle error from response

  const handleHeartClick = () => {
    // 3. fire off the likeThread mutation
  };

  return (
    <div className="Thread">
      <span>{title}</span>
      <button className="Heart" onClick={handleHeartClick}>
        {/* 4. Use response.error to determine if mutation was successful */}
        <Heart liked={false} />
      </button>
      <span className="LikesNumber">{likesNumber}</span>
    </div>
  );
};

export default Thread;
