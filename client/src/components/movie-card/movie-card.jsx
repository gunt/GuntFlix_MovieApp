import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';
import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card>
        <Card.Header>{movie.Title}</Card.Header>
        <Card.Img variant='top' src={movie.ImagePath} />
        <Link to={`/movies/${movie._id}`}>
          <Button
            type='button'
            as='button'
            variant='outline-dark'
            size='sm'
            className='movie-button'
          >
            Click Here
          </Button>
        </Link>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string
  }).isRequired
};
