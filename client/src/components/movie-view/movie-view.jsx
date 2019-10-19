// client/src/components/movie-view/movie-view.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { MainView } from '../main-view/main-view';
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
          <h2 className='label'>Title</h2>
          <p className='value'>{this.props.movie.Title}</p>
        </div>
        <div className='movie-description'>
          <h3 className='label'>Description</h3>
          <p className='value'>{this.props.movie.Description}</p>
        </div>
        <div className='movie-genre'>
          <h3 className='label'>Genre</h3>
          <p className='value'>{this.props.movie.Genre.Name}</p>
        </div>
        <div className='movie-director'>
          <h3 className='label'>Director</h3>
          <p className='value'>{this.props.movie.Director.Name}</p>
        </div>
        <div className='return-button'>
          <Button variant='primary' onClick={() => this.props.returnCallback()}>
            Return
          </Button>
        </div>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string
    })
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
