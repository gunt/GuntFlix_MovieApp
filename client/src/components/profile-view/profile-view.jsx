import React from 'react';
import Button from 'react-bootstrap/Button';
import './profile-view.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';

import { connect } from 'react-redux';

const mapStateToProps = state => {
  const { movies } = state;
  return { movies };
};

//https://reactjs.org/docs/error-boundaries.html
// * Where to Place Error Boundaries
// great idea

class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      userData: null,
      favoriteMovies: [],
      usernameForm: null,
      passwordForm: null,
      emailForm: null,
      birthdayForm: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    let username = localStorage.getItem('user');
    let userEndpoint = 'https://movie-flix-777.herokuapp.com/users/';
    let url = `${userEndpoint}${username}`;
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.setState({
          userData: response.data,
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: response.data.Birthday,
          favoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  deleteUser(event) {
    event.preventDefault();
    let userEndpoint = 'https://movie-flix-777.herokuapp.com/users/';
    let usernameLocal = localStorage.getItem('user');
    let url = `${userEndpoint}${usernameLocal}`;
    axios
      .delete(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(response => {
        alert('Your account has been deleted!');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.open('/', '_self');
      })

      .catch(event => {
        alert(event, 'failed to delete user');
      });
  }

  deleteMovie(event, favoriteMovie) {
    event.preventDefault();
    console.log(favoriteMovie);
    let userEndpoint = 'https://movie-flix-777.herokuapp.com/users/';
    let usernameLocal = localStorage.getItem('user');
    let url = `${userEndpoint}${usernameLocal}/FavoriteMovies/${favoriteMovie}`;
    axios
      .delete(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(response => {
        this.getUser(localStorage.getItem('token'));
      })
      .catch(event => {
        alert(event, 'Something went wrong...');
      });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let userEndpoint = 'https://movie-flix-777.herokuapp.com/users/';
    let usernameLocal = localStorage.getItem('user');
    let url = `${userEndpoint}${usernameLocal}`;
    axios
      .put(
        url,
        {
          Username: this.state.usernameForm,
          Password: this.state.passwordForm,
          Email: this.state.emailForm,
          Birthday: this.state.birthdayForm
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      )
      .then(response => {
        console.log(response);
        alert('Your data has been updated!');
        localStorage.setItem('user', this.state.usernameForm);
        this.getUser(localStorage.getItem('token'));
        document.getElementsByClassName('changeDataForm')[0];
        // .requestFullscreen();
      })
      .catch(event => {
        console.log(event, 'error updating the userdata');
        alert('Something went wrong!');
      });
  }

  toggleForm() {
    let form = document.getElementsByClassName('changeDataForm')[0];
    let toggleButton = document.getElementById('toggleButton');

    form.classList.toggle('show-form');
    if (form.classList.contains('show-form')) {
      toggleButton.innerHTML = 'Change data &uarr;';
    } else {
      toggleButton.innerHTML = 'Change data &darr;';
    }
  }

  render() {
    const { userData, username, email, birthday, favoriteMovies } = this.state;
    const { movies } = this.props;

    console.log('fv', favoriteMovies);
    console.log('log m', movies);

    let filteredFavMovie = [];
    let filterMoviesByFav = movies.map(m => {
      for (let i = 0; i < favoriteMovies.length; i++) {
        const favMov = favoriteMovies[i];
        if (m._id === favMov) {
          filteredFavMovie.push(m);
        }
      }
    });
    console.log(
      'TCL: ProfileView -> render -> filteredFavMovie',
      filteredFavMovie
    );

    if (!userData) return null;

    return (
      <div className='profile-view'>
        <h4 className='director'>User Profile</h4>

        {/* username */}
        <div className='username'>
          <h4 className='label'>Name:</h4>
          <div className='value'>{username}</div>
        </div>

        {/* password */}
        <div className='password'>
          <h4 className='label'>Password:</h4>
          <div className='value'>********</div>
        </div>

        {/* birthday */}
        <div className='birthday'>
          <h2 className='label'>Birthday</h2>
          <div className='value'>{birthday}</div>
        </div>

        {/* email */}
        <div className='email'>
          <h4 className='label'>Email:</h4>
          <div className='value'>{email}</div>
        </div>

        {/* Then you can use it as a regular component:
        <ErrorBoundary>
          <MyWidget />
        </ErrorBoundary> */}

        {/* favoriteMovies */}
        <div className='favorite-movies'>
          <h4 id='fav' className='label'>
            Favorite Movies:
          </h4>
          ​
          {movies && filteredFavMovie ? (
            <div className='value'>
              {filteredFavMovie.map(favoriteMovie => (
                <div key={favoriteMovie._id}>
                  {favoriteMovie.Title}
                  <span
                    onClick={event =>
                      this.deleteMovie(event, favoriteMovie._id)
                    }
                  >
                    {' '}
                    Delete
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className='value'>Your Favorite Movie List is empty!</div>
          )}
        </div>

        {/* // FavoritesMovies //FavoriteMovies  "s" */}

        <Link to={'/'}>
          <Button className='view-btn' variant='dark' type='button'>
            Go to Movies
          </Button>
        </Link>

        <Form className='changeDataForm'>
          <h2>Change Data</h2>
          <hr></hr>
          <Form.Group controlId='formBasicUsername'>
            <Form.Label>Your Username</Form.Label>
            <Form.Control
              type='text'
              name='usernameForm'
              onChange={event => this.handleChange(event)}
              placeholder='Enter Username'
            />
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Your Password</Form.Label>
            <Form.Control
              type='text'
              name='passwordForm'
              onChange={event => this.handleChange(event)}
              placeholder='Password'
            />
          </Form.Group>

          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Your Email</Form.Label>
            <Form.Control
              type='text'
              name='emailForm'
              onChange={event => this.handleChange(event)}
              placeholder='example@email.com'
            />
          </Form.Group>

          <Form.Group controlId='formBasicBirthday'>
            <Form.Label>Your Birthday</Form.Label>
            <Form.Control
              type='text'
              name='birthdayForm'
              onChange={event => this.handleChange(event)}
              placeholder='example: 01/01/1990'
            />
          </Form.Group>

          <Button
            className='change-btn'
            variant='dark'
            type='button'
            onClick={event => this.handleSubmit(event)}
          >
            Update Profile
          </Button>

          <Button
            className='view-btn'
            variant='danger'
            type='button'
            onClick={event => this.deleteUser(event)}
          >
            Delete Account
          </Button>
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ProfileView);
