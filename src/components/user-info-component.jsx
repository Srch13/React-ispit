import React from 'react';
import PropTypes from 'prop-types';

class UserDetails extends React.Component {
  render() {
    const { user, repos, onReset } = this.props;

    if (!user) {
      return null;
    }

    return (
      <div>
        <h2>{user.name}</h2>
        <img src={user.avatar_url} alt={user.name} width="100" />
        <p>Location: {user.location}</p>
        <p>Bio: {user.bio}</p>
        <h3>Repositories:</h3>
        <ul>
          {repos.map((repo) => (
            <li key={repo.id}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </li>
          ))}
        </ul>
        <button onClick={onReset}>Reset</button>
      </div>
    );
  }
}

UserDetails.propTypes = {
  user: PropTypes.object,
  repos: PropTypes.array,
  onReset: PropTypes.func.isRequired,
};

UserDetails.defaultProps = {
  user: null,
  repos: [],
};

export default UserDetails;
