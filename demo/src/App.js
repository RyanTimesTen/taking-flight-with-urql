import React, { useState } from 'react';
import { useQuery } from 'urql';

import AuthForm from './AuthForm';
import Threads from './Threads';
import './App.css';

const App = () => {
  const [showAuthForm, setShowAuthForm] = useState(false);

  const [{ fetching, error, data }, fetchMe] = useQuery({
    query: `
      {
        me {
          username
        }
      } 
    `,
  });

  const handleAuth = token => {
    localStorage.setItem('token', token);
    fetchMe({
      requestPolicy: 'network-only',
      fetchOptions: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    fetchMe({ requestPolicy: 'network-only' });
  };

  return (
    <div className="App">
      <header className="Header">
        <button className="Home" onClick={() => setShowAuthForm(false)}>
          MyMessages
        </button>
        {!fetching && !error && data.me ? (
          <>
            <div className="WelcomeMessage">Welcome, {data.me.username}</div>
            <button
              className="SignInButton"
              onClick={() => {
                handleLogout();

                window.location.reload();
              }}
            >
              {!fetching && !error && data.me ? 'Log Out' : 'Sign In/Sign Up'}
            </button>
          </>
        ) : (
          <button
            className="SignInButton"
            onClick={() => setShowAuthForm(true)}
          >
            {!fetching && !error && data.me ? 'Log Out' : 'Sign In/Sign Up'}
          </button>
        )}
      </header>
      {showAuthForm ? (
        <AuthForm
          onSubmit={token => {
            setShowAuthForm(false);
            handleAuth(token);
            window.location.reload();
          }}
        />
      ) : (
        <Threads />
      )}
    </div>
  );
};

export default App;
