import React, { useState } from 'react';
import { useQuery } from 'urql';

import AuthForm from './AuthForm';
import Threads from './Threads';
import './App.css';

const App = () => {
  const [showAuthForm, setShowAuthForm] = useState(false);

  const [{ fetching, error, data }, fetchCurrentUser] = useQuery({
    query: `
      {
        me {
          username
        }
      }
    `,
  });

  const handleAuth = token => {
    fetchCurrentUser({
      requestPolicy: 'network-only',
      fetchOptions: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    });
  };

  const handleLogout = () => {
    fetchCurrentUser({ requestPolicy: 'network-only' });
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
                localStorage.removeItem('token');
                handleLogout();
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
            Sign In/Sign Up
          </button>
        )}
      </header>
      {showAuthForm ? (
        <AuthForm
          onSubmit={token => {
            setShowAuthForm(false);
            localStorage.setItem('token', token);
            handleAuth(token);
          }}
        />
      ) : (
        <Threads />
      )}
    </div>
  );
};

export default App;
