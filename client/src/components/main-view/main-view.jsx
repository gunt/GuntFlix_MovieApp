// client/src/main-view/main-view.jsx
import React from 'react';
import axios from 'axios';

// views imports
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

// react-bootstrap imports
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';

import './main-view.scss';

export class MainView extends React.Component {
  constructor() {
    //Call the superclass constructor
    // so React can initialize it
    super();

    // Initialize the state to an empty object so we can destructure it later
    this.state = {
      movie: null,
      selectedMovie: null,
      user: null,
      newUser: false
    };
  }

  //One fot the "hooks" available in a react component
  componentDidMount() {
    axios
      .get('https://movie-flix-777.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onBackClick(movie) {
    this.setState({
      selectedMovie: null
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  newUser() {
    this.setState({
      newUser: true
    });
  }

  onSignedIn(user) {
    this.setState({
      user: user,
      register: false
    });
  }

  alreadyRegistered() {
    this.setState({
      newUser: false
    });
  }

  render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies, selectedMovie, user, newUser } = this.state;

    if (!user && newUser === false)
      return (
        <LoginView
          onClick={() => this.newUser()}
          onLoggedIn={user => this.onLoggedIn(user)}
        />
      );

    if (newUser)
      return (
        <RegistrationView
          onClick={() => this.alreadyRegistered()}
          onSignedIn={user => this.onSignedIn(user)}
        />
      );

    // Before the movies have been loaded //change the class to avoid confusion
    // if (!movies) return <div className='main-view' />;

    if (!movies) return <body className='mainV' />;

    return (
      <body className='mainV'>
        <Navbar className='title' fluid='true'>
          <Navbar.Brand className='t'>GuntFlix MovieAPP</Navbar.Brand>
        </Navbar>

        <Container className='main-view'>
          <Row>
            {selectedMovie ? (
              <Col>
                <MovieView
                  movie={selectedMovie}
                  onClick={button => this.onBackClick()}
                />
              </Col>
            ) : (
              movies.map(movie => (
                <Col xl={4} sm={6} md={4} xs={10}>
                  <MovieCard
                    key={movie._id}
                    movie={movie}
                    onClick={movie => this.onMovieClick(movie)}
                  />
                </Col>
              ))
            )}
          </Row>
        </Container>
        <Navbar fixed='bottom' className='borderBottom' fluid='true'>
          <Navbar.Brand className='t'></Navbar.Brand>
        </Navbar>
      </body>
    );
  }
}
