import React from 'react';

import Button from 'react-bootstrap/Button';
import './movie-view.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { connect } from 'react-redux';

function MovieView(props) {
  const { movies, movieId } = props;

  if (!movies || !movies.length) return null;

  const movie = movies.find(movie => movie._id == movieId);

  function submitLike(event) {
    event.preventDefault();

    let userEndpoint = 'https://movie-flix-777.herokuapp.com/users/';
    let usernameLocal = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    let url = `${userEndpoint}${usernameLocal}/FavoriteMovies/${movie._id}`;
    axios
      .post(
        url,
        {
          Username: usernameLocal
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .then(response => {
        console.log(response);
        alert('Movie has been added to your Favorite List!');

        // localStorage.setItem('user', usernameLocal);
      })

      .catch(error => {
        console.log(error);
        alert('Something went wrong!');
      });
  }

  return (
    // Movie View
    <div className='movie-view'>
      <div className='movie-title'>
        <h2 className='label'>Title</h2>
        <p className='value'>{movie.Title}</p>
      </div>

      {/* Movie Description */}
      <div className='movie-description'>
        <h3 className='label'>Description</h3>
        <p className='value'>{movie.Description}</p>
      </div>
      <img alt='' className='movie-poster' />

      {/* Movie Genre */}
      <div className='movie-genre'>
        <Link to={`/genres/${movie.Genre.Name}`}>
          <h3 className='label'>Genre</h3>
          <Button variant='dark'>
            <p className='value'>{movie.Genre.Name}</p>
          </Button>
        </Link>
      </div>

      {/* Movie Director */}
      <div className='movie-director'>
        <Link to={`/directors/${movie.Director.Name}`}>
          <h3 className='label'>Director</h3>
        </Link>
        <h4>{movie.Director.Name}</h4>
      </div>
      <Link to={'/'}>
        <Button variant='dark'>Back</Button>
      </Link>

      {/* Add to Favorites Buton */}
      <Button variant='dark' onClick={event => this.submitLike(event)}>
        Add to Favorites!
      </Button>
    </div>
  );
}

export default connect(({ movies }) => ({ movies }))(MovieView);
