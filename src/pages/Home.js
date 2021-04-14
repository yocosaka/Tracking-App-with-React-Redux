import React from 'react';
import PropTypes from 'prop-types';

const Home = ({ loggedInStatus, username }) => (
  <div>
    <h1>Home</h1>
    <h2>
      Logged In Status:
      {loggedInStatus === 'LOGGED_IN' ? `Hi ${username}, You are now ${loggedInStatus}` : loggedInStatus }
    </h2>
  </div>
);

Home.propTypes = {
  loggedInStatus: PropTypes.string,
  username: PropTypes.string,
};

Home.defaultProps = {
  loggedInStatus: '',
  username: '',
};

export default Home;