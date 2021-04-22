import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Chart from 'react-google-charts';
import getAvgAchieveRateForMonth from '../helpers/progress';
import { getTracks } from '../helpers/restTracks';
import { addTracks } from '../actions/tracks';
import { addTrackDates } from '../actions/trackDates';

const Progress = ({
  addTracks, loginUser, addTrackDates, trackDates, tracks,
}) => {
  const [error, setError] = useState('');
  // const [arMonth, setArMonth] = useState(0);

  const runGetTracks = async () => {
    try {
      const response = await getTracks();
      if (response) {
        setError('');
        addTracks(response.records);
        addTrackDates(response.record_dates);
      } else {
        setError('No Tracks');
      }
    } catch {
      setError('Unable to fetch the data');
    }
  };

  useEffect(() => {
    if (loginUser) {
      runGetTracks();
    }
  }, []);

  const arMonth = getAvgAchieveRateForMonth(trackDates, tracks);
  const percentForChart = arMonth >= 100 ? 100 : arMonth;
  const leftPercentForChart = 100 - percentForChart;
  return loginUser ? (
    <div className="progress">
      <h1 className="heading">Your Progress</h1>
      <div className="content">
        {error && <p className="error-msg">{error}</p>}
        <div className="progress__header">
          <div className="progress__title">
            Average achievements rate for the last 30 days
          </div>
          <div className="progress__chart__text">
            <span className="txt">You achieved</span>
            <span className="num">
              {`${arMonth}`}
            </span>
            <span className="txt">on average</span>
          </div>
          <div className="progress__chart__container">
            <Chart
              width="400px"
              height="400px"
              chartType="PieChart"
              loader={<div className="loader">Loading...</div>}
              data={[['Pac Man', 'Percentage'], ['', percentForChart], ['', leftPercentForChart]]}
              options={{
                legend: 'none',
                pieSliceText: 'none',
                pieStartAngle: 0,
                tooltip: { trigger: 'none' },
                slices: {
                  0: { color: '#86df81' },
                  1: { color: '#eaeef1' },
                },
              }}
              rootProps={{ 'data-testid': '6' }}
            />
          </div>
        </div>
        <div className="progress__graph">
          <div className="progress__title">
            Weekly Achivements Rate (%)
          </div>
          <div className="progress__graph__container">
            <Chart
              width="100%"
              height="200px"
              chartType="Bar"
              loader={<div>Loading Chart</div>}
              data={[
                ['', ''],
                ['This week', 80],
                ['Last week', 90],
                ['2 weeks ago', 68],
                ['3 weeks ago', 75],
                ['last month', 75],
              ]}
              rootProps={{ 'data-testid': '2' }}
            />
          </div>
        </div>
        <div className="progress__items">
          <div className="progress__item">
            Your total score for item1
          </div>
          <div className="progress__item">
            Your total score for item2
          </div>
          <div className="progress__item">
            Your total score for item3
          </div>
          <div className="progress__item">
            Your total score for item4
          </div>
          <div className="progress__item">
            Your total score for item5
          </div>
          <div className="progress__item">
            Your total score for item6
          </div>
        </div>
      </div>
    </div>
  ) : <Redirect to="/" />;
};

const mapStateToProps = (state) => ({
  tracks: state.tracks,
  trackDates: state.trackDates,
  loginUser: state.user.logIn,
});

const mapDispatchToProps = (dispatch) => ({
  addTracks: (tracks) => dispatch(addTracks(tracks)),
  addTrackDates: (trackDates) => dispatch(addTrackDates(trackDates)),
});

Progress.propTypes = {
  addTracks: PropTypes.func,
  addTrackDates: PropTypes.func,
  trackDates: PropTypes.instanceOf(Array),
  loginUser: PropTypes.bool.isRequired,
  tracks: PropTypes.instanceOf(Array),
};

Progress.defaultProps = {
  addTracks: null,
  addTrackDates: null,
  trackDates: [],
  tracks: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Progress);
