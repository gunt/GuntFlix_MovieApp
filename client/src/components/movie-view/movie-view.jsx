// client/src/components/main-view/movie-view.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-bootstrap/Media';
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
        <h1>{movie.Title}</h1>
        <Media className='d-flex flex-column flex-md-row align-items-center'>
          <Media.Body>
            <h5>Genre: {movie.Genre.Name}</h5>
            <h5>Director: {movie.Director.Name}</h5>
            <br />
            <h5>Description</h5>
            <p>{movie.Description}</p>
          </Media.Body>
          <img width={200} height={300} className='ml-3' src={movie.ImageUrl} />
        </Media>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    ImageUrl: PropTypes.string,
    Description: PropTypes.string,
    Genre: PropTypes.exact({
      _id: PropTypes.string,
      Name: PropTypes.string,
      Description: PropTypes.string
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string
    })
  }).isRequired
};
