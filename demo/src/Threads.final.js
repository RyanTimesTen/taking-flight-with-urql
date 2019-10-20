import React from 'react';
import { useQuery } from 'urql';

import Thread from './Thread';

const Threads = () => {
  const [{ fetching, error, data }] = useQuery({
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

  if (fetching) return <div>Fetching threads...</div>;
  if (error) return <div>Error fetching threads :(</div>;

  return (
    <div>
      {data.threads.map(t => (
        <Thread key={t.id} {...t} />
      ))}
    </div>
  );
};

export default Threads;
