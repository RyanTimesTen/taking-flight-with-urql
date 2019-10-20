import React from 'react';

import Thread from './Thread';

const Threads = () => {
  // fetch threads

  // stub
  const data = { threads: [] };

  return (
    <div>
      {data.threads.map(t => (
        <Thread key={t.id} {...t} />
      ))}
    </div>
  );
};

export default Threads;
