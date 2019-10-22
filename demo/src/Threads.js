import React from 'react';
import { useQuery } from 'urql';

import Thread from './Thread';

const Threads = () => {
  // 1. write query to fetch threads

  // this is just a stub so the app doesn't break
  const response = {
    fetching: undefined,
    error: undefined,
    data: { threads: [] },
  };

  if (response.fetching) return <div>Loading threads...</div>;
  if (response.error) return <div>Error loading threads :(</div>;

  // 2. render threads from query response
  return (
    <div>
      {response.data.threads.map(thread => (
        <Thread key={thread.id} {...thread} />
      ))}
    </div>
  );
};

export default Threads;
