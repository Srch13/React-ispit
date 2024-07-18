import React, { useState } from 'react';
import axios from 'axios';
import Form from './components/form-component';
import UserInfo from './components/user-info-component';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userResponse = await axios.get(
        `https://api.github.com/users/${username}`
      );
      setUser(userResponse.data);

      const reposResponse = await axios.get(userResponse.data.repos_url);
      setRepos(reposResponse.data);

      setError(null);
    } catch (err) {
      setError('User not found');
      setUser(null);
      setRepos([]);
    }
  };

  const handleReset = () => {
    setUsername('');
    setUser(null);
    setRepos([]);
    setError(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>GitHub info korisnika</h1>
        {!user ? (
          <>
            <Form
              username={username}
              onChange={handleInputChange}
              onSubmit={handleSubmit}
            />
            {error && <p>{error}</p>}
          </>
        ) : (
          <UserInfo user={user} repos={repos} onReset={handleReset} />
        )}
      </header>
    </div>
  );
}

export default App;
