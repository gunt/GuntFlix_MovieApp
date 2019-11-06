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
import { UpdateProfile } from '../update-profile/update-profile';
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
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }
  //clicking movie to get more info
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token);
  }
  //getting the movies after the user is logged in
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
  //button to return back
  onButtonClick() {
    this.setState({
      selectedMovie: null
    });
  }
  //button to logout and clear token/username
  buttonLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.setState({
      user: false,
      selctedMovie: null
    });
    // window.location.reload();
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
    const { movies, selectedMovie, user, register } = this.state;

    if (!movies) return <div className='main-view' />;
    return (
      <Router>
        <div className='main-view'>
          <Container>
            <Row>
              <Route
                exact
                path='/'
                render={() => {
                  if (!user)
                    return (
                      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    );

                  return (
                    <div>
                      <Button
                        className='logoutButton'
                        onClick={() => this.buttonLogout()}
                      >
                        Log Out
                      </Button>
                      <Link to={`/user`}>
                        <Button>Profile</Button>
                      </Link>
                      {movies.map(m => (
                        <Col xs={12} sm={6} md={4} lg={4}>
                          <MovieCard key={m._id} movie={m} />
                        </Col>
                      ))}
                    </div>
                  );
                }}
              />
              <Route
                path='/user'
                render={() => <ProfileView username={this.state.user} />}
              />

              <Route path='/register' render={() => <RegistrationView />} />

              <Route path='/user/update' render={() => <UpdateProfile />} />

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
