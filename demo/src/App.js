import React, { useState } from 'react';

import AuthForm from './AuthForm';
import Threads from './Threads';
import './App.css';

const App = () => {
  const [showAuthForm, setShowAuthForm] = useState(false);

  // write me query

  // stub
  const fetching = true;
  const error = undefined;
  const data = undefined;

  const handleAuth = token => {
    // refetch me via network-only query with token
  };

  const handleLogout = () => {
    // refetch me via network-only query
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
                localStorage.removeItem('token');
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
