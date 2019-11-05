// client/src/components/main-view/main-view.jsx
import React from 'react';
import axios from 'axios';

//import view
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

//react-bootstrap imports
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './main-view.scss';

export class MainView extends React.Component {
  constructor(props) {
    super(props);

    // Initialize the state to an empty object so we can destructure it later
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      newUser: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
      // this.getUser(localStorage.getItem('user'), accessToken);
    }
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

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
      .catch(function(error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  registerUser() {
    this.setState({
      newUser: true
    });
  }

  resetMainView() {
    this.setState({
      selectedMovie: null
    });
  }

  render() {
    const { movies, selectedMovie, user, newUser } = this.state;
    if (newUser)
      return <RegistrationView RegisterUser={newUser => this.RegisterUser()} />;
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
    if (!movies) return <div className='main-view' />;
    return (
      <Container className='main-view' fluid='true'>
        <Row>
          {selectedMovie ? (
            <Col>
              {' '}
              <MovieView
                returnCallback={() => this.ResetMainView()}
                movie={selectedMovie}
              />{' '}
            </Col>
          ) : (
            movies.map(movie => (
              <Col>
                {' '}
                <MovieCard
                  key={movie._id}
                  movie={movie}
                  onClick={movie => this.onMovieClick(movie)}
                />{' '}
              </Col>
            ))
          )}
        </Row>
      </Container>
    );
  }
}
