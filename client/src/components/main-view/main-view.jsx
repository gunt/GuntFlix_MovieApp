import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import React from 'react';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import './main-view.scss';

export class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      selectedMovieId: null,
      user: null,
      register: false
    };
  }
  // componentDidMount() {
  //   axios
  //     .get('https://movie-flix-777.herokuapp.com/movies')
  //     .then(res => {
  //       console.log(res);

  //       this.setState({
  //         movies: res.data
  //       });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });

  //   window.addEventListener('hashchange', this.handleNewHash, false);

  //   this.handleNewHash();
  // }

  // handleNewHash = () => {
  //   const movieId = window.location.hash.replace(/^#\/?|\/$/g, '').split('/');

  //   this.setState({
  //     selectedMovieId: movieId[0]
  //   });
  // };

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  // onMovieClick(movie) {
  //   window.location.hash = '#' + movie._id;
  //   this.setState({
  //     selectedMovie: movie
  //   });
  // }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios
      .get('https://movie-flix-777.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        this.setState({
          movies: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  // getUser(_user, token) {
  //   axios
  //     .get('https://movie-flix-777.herokuapp.com/users/', {
  //       headers: { Authorization: `Bearer ${token}` }
  //     })
  //     .then(response => {
  //       // Assign the result to the state
  //       this.setState({
  //         email: response.data.Email,
  //         birthday: response.data.Birthday,
  //         token: token,
  //         userInfo: response.data
  //       });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  onButtonClick() {
    this.setState({
      selectedMovie: null
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

  onSignedIn(user) {
    this.setState({
      user: user,
      register: false
    });
  }

  register() {
    this.setState({
      register: true
    });
  }

  alreadyMember() {
    this.setState({
      register: false
    });
  }

  render() {
    const { movies, selectedMovieId, user } = this.state;

    // if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
    // if (!movies || !movies.length) return <div className='main-view' />;
    // const selectedMovie = selectedMovieId
    //   ? movies.find(m => m._id === selectedMovieId)
    //   : null;

    //

    return (
      <Router>
        <div className='main-view'>
          <Container>
            <Button
              className='logoutButton'
              onClick={() => this.buttonLogout()}
            >
              Log Out
            </Button>
            <Link to={`/user`}>
              <Button>Profile</Button>
            </Link>
            <Row>
              <Route
                exact
                path='/'
                render={() => {
                  if (!user)
                    return (
                      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    );
                  return movies.map(m => (
                    <Col xs={12} sm={6} md={4} lg={4}>
                      <MovieCard key={m._id} movie={m} />
                    </Col>
                  ));
                }}
              />

              {}

              <Route path='/user' render={() => <ProfileView />} />

              <Route path='/register' render={() => <RegistrationView />} />
              <Route
                exact
                path='/movies'
                render={() =>
                  movies.map(m => (
                    <Col xs={12} sm={6} md={4} lg={4}>
                      <MovieCard key={m._id} movie={m} />
                    </Col>
                  ))
                }
              />

              <Route
                path='/movies/:movieId'
                render={({ match }) => (
                  <MovieView
                    movie={movies.find(m => m._id === match.params.movieId)}
                  />
                )}
              />
            </Row>
          </Container>
        </div>
      </Router>
    );
  }
}
