import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import React from 'react';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './movie-view.scss';

function MovieView(props) {
  const { movies, movieId } = props;

  if (!movies || !movies.length) return null;

  const movie = movies.find(m => m._id === movieId);

  function addFavoriteMovie(e) {
    e.preventDefault();
    console.log();
    // send a request to the server for authentication
    axios
      .post(
        `https://movie-flix-777.herokuapp.com/users/${localStorage.getItem(
          'user'
        )}/favoriteMovies/${movie._id}`,
        {
          username: localStorage.getItem('user')
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      )
      .then(res => {
        alert('added movie to favorites');
      })
      .catch(e => {
        alert('error updating movies');
      });
  }

  return (
    <div>
      <Container>
        <Row>
          <Card style={{ width: '30rem' }}>
            <Card.Img variant='top' src={movie.imagepath} />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>
                Genre: {movie.genre.name}
                <Link to={`/genres/${movie.title}/${movie.genre.name}`}>
                  <Button className='infoButton' size='sm'>
                    More info
                  </Button>
                </Link>
              </Card.Text>
              <Card.Text>
                Director: {movie.director.name}
                <Link to={`/directors/${movie.director.name}`}>
                  <Button className='infoButton' size='sm'>
                    More info
                  </Button>
                </Link>
              </Card.Text>
              <Card.Text>Director Bio: {movie.director.bio}</Card.Text>
              <Card.Text>
                <a href={movie.trailer}>Watch Trailer</a>
              </Card.Text>
              <Link to={`/`}>
                <Button variant='primary'>Go back</Button>
              </Link>
              <Button
                className='favoriteButton'
                variant='primary'
                onClick={e => addFavoriteMovie(e)}
              >
                Add to Favorites
              </Button>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
}

export default connect(({ movies }) => ({ movies }))(MovieView);
