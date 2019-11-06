// client/src/components/main-view/main-view.jsx
import React from 'react';
import axios from 'axios';
//import PropTypes from 'prop-types'; // Not at the moment

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

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
      user: null
    };
  }

  //One fot the "hooks" available in a react component
  componentDidMount() {
    axios
      .get(' https://movie-flix-777.herokuapp.com/movies')
      .then(response => {
        console.log(response);
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  //go to movie view
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  resetMainView() {
    this.setState({
      selectedMovie: null
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

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
    const { movies, selectedMovie, user, newUser } = this.state;

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

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
    if (!movies) return <div className='main-view' />;

    return (
      <Container className='main-view' fluid='true'>
        <Row>
          {selectedMovie ? (
            <Col>
              <MovieView
                returnCallback={() => this.resetMainView()}
                movie={selectedMovie}
              />
            </Col>
          ) : (
            movies.map(movie => {
              return (
                <Col xl={3} sm={6} md={4} xs={12}>
                  <MovieCard
                    key={movie._id}
                    movie={movie}
                    onClick={movie => this.onMovieClick(movie)}
                  />
                </Col>
              );
            })
          )}
        </Row>
      </Container>
    );
  }
}
