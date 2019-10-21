import React from 'react';
import { useQuery } from 'urql';

import Thread from './Thread';

const Threads = () => {
  // fetch threads
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

  if (response.fetching) return <div>Fetching threads...</div>;
  if (response.error) return <div>Error fetching threads :(</div>;

  return (
    <div>
      {response.data.threads.map(t => (
        <Thread key={t.id} {...t} />
      ))}
    </div>
  );
};

export default Threads;
