import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './movie-view.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  submitLike(event) {
    event.preventDefault();

    const { movie } = this.props;
    let userEndpoint = 'https://movie-flix-777.herokuapp.com/users/';
    let usernameLocal = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    let url = `${userEndpoint}${usernameLocal}/movies/${movie._id}`;
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
        //update localStorage
        localStorage.setItem('user', this.state.username);
      })

      .catch(error => {
        console.log(error);
        alert('Ooooops... Something went wrong!');
      });
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div className='movie-view'>
        <div className='movie-title'>
          <h2 className='label'>Title</h2>
          <p className='value'>{movie.Title}</p>
        </div>
        <div className='movie-description'>
          <h3 className='label'>Description</h3>
          <p className='value'>{movie.Description}</p>
        </div>
        <img alt='' className='movie-poster' src={movie.ImageURL} />
        <div className='movie-genre'>
          <Link to={`/genre/${movie.Genre.Name}`}>
            <h3 className='label'>Genre</h3>
            <Button variant='outlin-dark'>
              <p className='value'>{movie.Genre.Name}</p>
            </Button>
          </Link>
        </div>
        <div className='movie-director'>
          <Link to={`/director/${movie.Director.Name}`}>
            <h3 className='label'>Director</h3>
          </Link>
          <h4>{movie.Director.Name}</h4>
        </div>
        <Link to={'/'}>
          <Button variant='outline-dark'>Back</Button>
        </Link>

        <Button
          variant='outline-dark'
          onClick={event => this.submitLike(event)}
        >
          Like
        </Button>
      </div>
    );
  }
}
MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string
  }).isRequired
};
