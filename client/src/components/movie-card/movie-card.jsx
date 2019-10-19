// client/src/components/main-view/movie-card.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world
    // which, in this case, is `MainView`, as `MainView` is what’s
    // connected to your database via the movies endpoint of your API
    const { movie, onClick } = this.props;

    //onClick prop support to the MovieCard
    return (
      // react-bootstrap Card
      <Card>
        <Card.Header
          as='center'
          onClick={() => onClick(movie)}
          className='movie-card'
        >
          {movie.Title}
        </Card.Header>

        <Button
          type='button'
          as='button'
          onClick={() => onClick(movie)}
          className='movie-button'
        >
          Click Here
        </Button>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
