// client/src/components/main-view/movie-card.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;

    return (
      <Card onClick={() => onClick(movie)} variant='link'>
        <Card.Img variant='top' src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    ImagePath: PropTypes.string,
    Description: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
