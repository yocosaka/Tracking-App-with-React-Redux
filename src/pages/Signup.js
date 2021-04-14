import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import AuthSignup from '../components/auth/AuthSignup';

const Signup = ({
  loggedInStatus, handleLogin, history, username, handleLogout,
}) => {
  const handleSuccessfulAuth = (userObj) => {
    handleLogin(userObj);
    history.push('/dashboard');
  };

  const handleLogoutClick = () => {
    axios.delete('http://localhost:3001/logout', { withCredentials: true })
      .then(() => {
        handleLogout();
      }).catch((error) => console.log('Logout Error: ', error));
  };

  return (
    <div>
      <h1>Signup</h1>
      <h2>
        Logged In Status:
        {loggedInStatus === 'LOGGED_IN' ? `Hi ${username}, You are now ${loggedInStatus}` : loggedInStatus }
      </h2>
      <button type="button" onClick={handleLogoutClick}>Logout</button>
      <AuthSignup handleSuccessfulAuth={handleSuccessfulAuth} />
    </div>
  );
};

Signup.propTypes = {
  loggedInStatus: PropTypes.string,
  handleLogin: PropTypes.func,
  history: PropTypes.instanceOf(Object),
  username: PropTypes.string,
  handleLogout: PropTypes.func,
};

Signup.defaultProps = {
  loggedInStatus: '',
  handleLogin: null,
  history: undefined,
  username: '',
  handleLogout: null,
};

export default Signup;