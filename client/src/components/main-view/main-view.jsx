import React from 'react';
import axios from 'axios';
// import { withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import Route from 'react-router-dom/Route';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
//to update user profile page first import component
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

  // componentDidMount() {
  //   window.addEventListener('hashchange', this.handleNewHash, false);

  //   this.handleNewHash();

  //   const accessToken = localStorage.getItem('token');
  //   if (accessToken !== null) {
  //     this.setState({
  //       user: localStorage.getItem('user')
  //     });
  //     this.getMovies(accessToken);
  //   }
  // }

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
    let username = localStorage.getItem('user');
    axios
      .get(`https://movie-flix-777.herokuapp.com/users/${username}`, {
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

  // getUser(token) {
  //   axios
  //     .get('https://movie-flix-777.herokuapp.com/users/', {
  //       headers: { Authorization: `Bearer ${token}` }
  //     })
  //     .then(response => {
  //       this.props.setLoggedUser(response.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  buttonLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.setState({
      user: false,
      selectedMovie: null
    });
    window.location.reload();
    // window.location.reload();
  }

  // onMovieClick(movie) {
  //   this.setState({
  //     selectedMovieId: movie._id
  //   });

  //   window.location.hash = '#' + movie._id;
  // }

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
              onClick={() => this.buttonLogout()}
            >
              Log Out
            </Button>
            <Link to={'/'}>
              <Button className='back-btn' variant='primary'>
                Go back
              </Button>
            </Link>
          </div>

          <Link to='/users/:username'>
            <Button variant='primary'>Profile View</Button>
          </Link>

          <Link to='/update/:username'>
            <Button variant='primary'>Update Profile</Button>
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
                    <Col xl={3} sm={3} md={5} xs={5}>
                      <MovieCard key={movie._id} movie={movie} />
                    </Col>
                  ));
                }
              }}
            />
            <Route path='/register' render={() => <RegistrationView />} />
            <Route
              path='/profile'
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
            <Route path='/genres/:Genre' render={() => <GenreView />} />
            <Route
              path='/directors/:Director'
              render={() => <DirectorView />}
            />
            {/* <Route
              exact
              path='/Users'
              render={() => <ProfileView movies={movies} />}
            /> */}
            {/* Endpoint Users/:Username to a new Update or the same profile component */}
            {/* example with the users billygraham - http://localhost:1234/users/billygraham */}
            {/* <Route
              path='/users/:username'
              exact
              strict
              component={ProfileView}
            /> */}

            {/* <Route
              path='/users/:username'
              render={({ match }) => {
                return <ProfileView userInfo={userInfo} />;
              }}
            /> */}

            <Route
              path='/update/:username'
              exact
              strict
              component={UpdateProfile}
            />

            <Route
              path='/username/:username'
              exact
              strict
              component={ProfileView}
            />
          </Row>
        </Container>
      </Router>
    );
  }
}
