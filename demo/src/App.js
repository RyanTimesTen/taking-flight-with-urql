import React, { useState } from 'react';
import './App.css';
import { useQuery, useMutation } from 'urql';
import Heart from './Heart';

const Thread = ({ id, title, likesNumber }) => {
  const [liked, setLiked] = useState(false);

  const [, likeThread] = useMutation(`
    mutation LikeThread($threadId: ID!) {
      likeThread(threadId: $threadId) {
        id
      }
    }
  `);

  const handleLike = () => {
    likeThread({ threadId: id }).then(response => {
      if (response.error) {
        alert(response.error);
        return;
      }
      setLiked(true);
    });
  };

  return (
    <div className="Thread">
      <span>{title}</span>
      <button className="Heart" onClick={handleLike}>
        <Heart liked={liked} />
      </button>
      <span className="LikesNumber">{likesNumber}</span>
    </div>
  );
};

const AuthForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isModeSignin, setIsModeSignin] = useState(true);

  const [, signIn] = useMutation(`
    mutation Signin($username: String!, $password: String!) {
      signin(username: $username, password: $password) {
        token
      }
    }
  `);

  const [, signUp] = useMutation(`
    mutation Signup($username: String!, $password: String!) {
      signup(username: $username, password: $password) {
        token
      }
    }
  `);

  const handleFormSubmit = e => {
    e.preventDefault();

    const authFn = isModeSignin ? signIn : signUp;
    authFn({ username, password }).then(response => {
      if (response.error) {
        alert(response.error);
        return;
      }
      const key = isModeSignin ? 'signin' : 'signup';
      const { token } = response.data[key];
      onSubmit(token);
    });
  };

  return (
    <form className="AuthForm" onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Beep Boop"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="••••••••"
        />
      </div>
      <button
        type="button"
        className="AuthForm-ModeButton"
        onClick={() => setIsModeSignin(prev => !prev)}
      >
        {isModeSignin
          ? "Don't have an account? Sign Up instead!"
          : 'Already have an account? Sign In instead!'}
      </button>
      <button type="submit" className="AuthForm-SubmitButton">
        {isModeSignin ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

const Threads = () => {
  const [{ fetching, error, data }] = useQuery({
    query: `
      {
        threads(sortBy:LATEST) {
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
    setShowAuthForm(false);
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
            <button className="SignInButton" onClick={handleLogout}>
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
      {showAuthForm ? <AuthForm onSubmit={handleAuth} /> : <Threads />}
    </div>
  );
};

export default App;
