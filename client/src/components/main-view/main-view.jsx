// client/src/components/main-view/main-view.jsx
import React from 'react';
import axios from 'axios';
//import PropTypes from 'prop-types'; // Not at the moment

// views imports
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

//react-bootstrap imports // not now
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';

export class MainView extends React.Component {
  constructor() {
    //Call the superclass constructor
    // so React can initialize it
    super();

    // Initialize the state to an empty object so we can destructure it later
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      userAction: null
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
      selectedMovie: movie,
      userAction: null
    });
  }

  onLoggedIn(user) {
    this.setState({
      user,
      userAction: null
    });
  }

  onNewUserRegistered(user) {
    this.setState({
      user,
      userAction: null
    });
  }

  onBackClick(_movie) {
    this.setState({
      selectedMovie: null
    });
  }

  render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies, selectedMovie, user } = this.state;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (!movies) return <body className='main-view' />;

    return (
      <body className='moview'>
        <Navbar className='title' fluid='true'>
          <Navbar.Brand> MovieFlix App</Navbar.Brand>
        </Navbar>
        <Container className='main-view'>
          <Row>
            {selectedMovie ? (
              <Col>
                <MovieView
                  movie={selectedMovie}
                  onClick={() => this.onBackClick()}
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
          <Navbar.Brand href='#'>Navbar</Navbar.Brand>
        </Navbar>
      </body>
    );
  }
}
