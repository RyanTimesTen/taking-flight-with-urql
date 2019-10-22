import React from 'react';
import { useQuery } from 'urql';

import Thread from './Thread';

const Threads = () => {
  // 1. write query to fetch threads
  const [response] = useQuery({
    query: `
      {
        threads(sortBy: LATEST) {
          id
          title
          likesNumber
        }
      } 
    `,
  });

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
