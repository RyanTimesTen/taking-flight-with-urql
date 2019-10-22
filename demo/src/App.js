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

  const handleLogout = () => {
    localStorage.removeItem('token');
    fetchCurrentUser({ requestPolicy: 'network-only' });
  };

  return (
    <div className="App">
      <header className="Header">
        <button className="Home" onClick={() => setShowAuthForm(false)}>
          AmazingApp
        </button>
        {!fetching && !error && data.me ? (
          <>
            <div className="WelcomeMessage">Welcome, {data.me.username}</div>
            <button name="logout" className="AuthButton" onClick={handleLogout}>
              {!fetching && !error && data.me ? 'Log Out' : 'Sign In/Sign Up'}
            </button>
          </>
        ) : (
          <button className="AuthButton" onClick={() => setShowAuthForm(true)}>
            Sign In/Sign Up
          </button>
        )}
      </header>
      {showAuthForm ? (
        <AuthForm
          onSubmit={token => {
            fetchCurrentUser({
              requestPolicy: 'network-only',
              fetchOptions: {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              },
            });
            setShowAuthForm(false);
          }}
        />
      ) : (
        <Threads />
      )}
    </div>
  );
};

export default App;
