// src/components/main-view/main-view.jsx
import React from 'react';
import axios from 'axios';

import MovieView from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import DirectorView from '../director-view/director-view';
import ProfileView from '../profile-view/profile-view';
import GenreView from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

// import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './main-view.scss';

import { connect } from 'react-redux';
import MoviesList from '../movies-list/movies-list';
import { setMovies, setLoggedInUser } from '../../actions/actions';

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      user: null,
      profileData: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
        profileData: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getUser(token) {
    let username = localStorage.getItem('user');
    let userEndpoint = 'https://movie-flix-777.herokuapp.com/users';
    let url = `${userEndpoint}${username}`;
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.props.setLoggedInUser(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
      profileData: authData.user
    });

    this.props.setLoggedInUser(authData.user);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios
      .get('https://movie-flix-777.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onSignedIn(user) {
    this.setState({
      user: user
    });
  }

  buttonLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.setState({
      user: false,
      selectedMovie: null
    });
    window.location.reload();
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('movies');

    this.setState({
      user: null
    });
  }

  render() {
    const { user } = this.state;

    return (
      <Router basename='/client'>
        <Container className='main-view' fluid='true'>
          <header className='header'>
            <Link to={'/'}>
              <div alt='clap' className='logohme'></div>
            </Link>
            <h1>Welcome to Cinema</h1>

            {/* <div className='navbar'> */}
            {user && (
              <div>
                <Link to={'/'}>
                  <Button className='view-btn' variant='dark' type='button'>
                    Go to Movies
                  </Button>
                </Link>
                {/* </li> */}

                {/* <li> */}
                <Link to={'/profile'}>
                  <Button id='profilebtn' variant='dark'>
                    My profile
                  </Button>
                </Link>
                {/* </li> */}
                {/* <li> */}
                <Button
                  className='logoutButton'
                  variant='dark'
                  onClick={() => this.buttonLogout()}
                >
                  Log Out
                </Button>
                {/* </li> */}
                {/* </ul> */}
              </div>
            )}
            {/* </div> */}
          </header>

          {/* <Container className='main-view'> */}
          <Row>
            <Route
              exact
              path='/'
              render={() => {
                if (!user)
                  return (
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  );
                return <MoviesList />;
              }}
            />
            <Route
              path='/movies/:movieId'
              render={({ match }) => (
                <MovieView movieId={match.params.movieId} />
              )}
            />

            <Route
              path='/register'
              render={() => (
                <RegistrationView onSignedIn={user => this.onSignedIn(user)} />
              )}
            />

            <Route
              exact
              path='/genres/:name'
              render={({ match }) => (
                <GenreView genreName={match.params.name} />
              )}
            />

            <Route
              exact
              path='/directors/:name'
              render={({ match }) => (
                <DirectorView directorName={match.params.name} />
              )}
            />

            <Route exact path='/profile' render={() => <ProfileView />} />
          </Row>
        </Container>
      </Router>
    );
  }
}

export default connect(
  null,
  { setMovies, setLoggedInUser }
)(MainView);
