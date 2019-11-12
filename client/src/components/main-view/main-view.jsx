import React from 'react';
import axios from 'axios';
// import { withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import { UpdateProfile } from '../update-profile/update-profile';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './main-view.scss';

export class MainView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: null,
      selectedMovie: null,
      selectedMovieId: null,
      user: null,
      newUser: null
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

  handleNewHash = () => {
    const movieId = window.location.hash.replace(/^#\/?|\/$/g, '').split('/');

    this.setState({
      selectedMovieId: movieId[0]
    });
  };

  //get the Movies after the User logged in
  getMovies(token) {
    axios
      .get('https://movie-flix-777.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  //get information from user
  getUser(token) {
    axios
      .get('https://movie-flix-777.herokuapp.com/users', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.props.setUsers(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
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

  resetMainView() {
    this.setState({
      selectedMovieId: null
    });

    window.location.hash = '#';
  }

  onLoggedIn = authData => {
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  };

  registerUser() {
    this.setState({
      newUser: true
    });
  }

  userRegistered() {
    this.setState({
      newUser: null
    });
  }

  render() {
    const { movies, selectedMovieId, user, newUser } = this.state;

    if (!user) {
      if (newUser)
        return (
          <RegistrationView
            userRegistered={() => this.userRegistered()}
            onLoggedIn={user => this.onLoggedIn(user)}
          />
        );
      else
        return (
          <LoginView
            onLoggedIn={user => this.onLoggedIn(user)}
            newUser={() => this.registerUser()}
            userRegistered={() => this.userRegistered()}
          />
        );
    }

    if (!movies) return <div className='main-view' />;

    const selectedMovie = selectedMovieId
      ? movies.find(movie => movie._id === selectedMovieId)
      : null;

    return (
      <Router>
        <Container className='main-view' fluid='true'>
          <div className='upButton'>
            <Button
              className='logoutButton'
              variant='dark'
              onClick={() => this.buttonLogout()}
            >
              Log Out
            </Button>
            <Link to={'/'}>
              <Button className='back-btn' variant='dark'>
                Go back
              </Button>
            </Link>
          </div>

          <Link to='/users/:Username'>
            <Button variant='dark'>Profile View</Button>
          </Link>

          <Row>
            <Route
              exact
              path='/'
              render={() => {
                if (!user) {
                  return (
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  );
                } else {
                  return movies.map(movie => (
                    <Col key={movie._id} xl={4} sm={6} md={4} xs={10}>
                      <MovieCard key={movie._id} movie={movie} />
                    </Col>
                  ));
                }
              }}
            />
            <Route path='/register' render={() => <RegistrationView />} />
            <Route
              path='/users/:username'
              render={() => <ProfileView movies={this.state.movies} />}
            />
            <Route
              path='/movies/:Id'
              render={({ match }) => (
                <Col>
                  <MovieView
                    movie={movies.find(movie => movie._id === match.params.Id)}
                  />
                </Col>
              )}
            />

            <Route
              path='/directors/:name'
              render={({ match }) => {
                if (!movies || !movies.length)
                  return <div className='main-view' />;
                return (
                  <DirectorView
                    director={
                      movies.find(m => m.Director.Name === match.params.name)
                        .Director
                    }
                  />
                );
              }}
            />
            <Route
              path='/genres/:name'
              render={({ match }) => {
                if (!movies || !movies.length)
                  return <div className='main-view' />;
                return (
                  <GenreView
                    genre={
                      movies.find(m => m.Genre.Name === match.params.name).Genre
                    }
                  />
                );
              }}
            />
            <Route
              path='/update/:Username'
              exact
              strict
              component={UpdateProfile}
            />
          </Row>
        </Container>
      </Router>
    );
  }
}
