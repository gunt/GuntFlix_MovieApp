// client/src/main-view/movie-view.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './movie-view.scss';

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }
  render() {
    const { movie, onClick } = this.props;

    if (!movie) return null;

    return (
      <div className='movie-view'>
        <div className='movie-title'>
          <h3 className='label'>Title</h3>
          <p className='value'>{movie.Title}</p>
        </div>
        <div className='movie-description'>
          <h3 className='label'>Description</h3>
          <p className='value'>{movie.Description}</p>
        </div>
        <img className='movie-poster' src={movie.ImageURL} />

        <div className='movie-genre'>
          <h3 className='label'>Genre</h3>
          <p className='value'>{movie.Genre.Name}</p>
        </div>
        <div className='movie-director'>
          <h3 className='label'>Director</h3>
          <p className='value'>{movie.Director.Name}</p>
        </div>
        <button onClick={() => onClick()}>Back</button>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
