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
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      register: false
    };
  }

  //One fot the "hooks" available in a react component
  componentDidMount() {
    axios
      .get('https://movie-flix-777.herokuapp.com/movies')
      .then(response => {
        console.log(response);
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  //go to movie view
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  // resetMainView() {
  //   this.setState({
  //     selectedMovie: null
  //   });
  // }

  // onLoggedIn(user) {
  //   this.setState({
  //     user
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

  // registerUser() {
  //   this.setState({
  //     newUser: true
  //   });
  // }

  // userRegistered() {
  //   this.setState({
  //     newUser: null
  //   });
  // }

  onButtonClick() {
    this.setState({
      selectedMovie: null
    });
  }

  //testing
  onSignedIn(user) {
    this.setState({
      user: user,
      register: false
    });
  }
  //testing
  register() {
    this.setState({
      register: true
    });
  }

  //testing
  alreadyMember() {
    this.setState({
      register: false
    });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    if (!user && register === false)
      return (
        <LoginView
          onClick={() => this.register()}
          onLoggedIn={user => this.onLoggedIn(user)}
        />
      );

    if (register)
      return (
        <RegistrationView
          onClick={() => this.alreadyMember()}
          onSignedIn={user => this.onSignedIn(user)}
        />
      );

    if (!movies) return <div className='main-view' />;
    return (
      <div className='main-view'>
        <Container>
          <Row>
            {selectedMovie ? (
              <MovieView
                movie={selectedMovie}
                onClick={() => this.onButtonClick()}
              />
            ) : (
              movies.map(movie => (
                <Col key={movie._id} xs={12} sm={6} md={4}>
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
      </div>
    );
  }
}

//   render() {
//     const { movies, selectedMovie, user, newUser } = this.state;

//     if (!user) {
//       if (newUser)
//         return (
//           <RegistrationView
//             userRegistered={() => this.userRegistered()}
//             onLoggedIn={user => this.onLoggedIn(user)}
//           />
//         );
//       else
//         return (
//           <LoginView
//             onLoggedIn={user => this.onLoggedIn(user)}
//             newUser={() => this.registerUser()}
//             userRegistered={() => this.userRegistered()}
//           />
//         );
//     }

//     if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
//     if (!movies) return <div className='main-view' />;

//     return (
//       <Container className='main-view' fluid='true'>
//         <Row>
//           {selectedMovie ? (
//             <Col>
//               <MovieView
//                 returnCallback={() => this.resetMainView()}
//                 movie={selectedMovie}
//               />
//             </Col>
//           ) : (
//             movies.map(movie => {
//               return (
//                 <Col xl={3} sm={6} md={4} xs={12}>
//                   <MovieCard
//                     key={movie._id}
//                     movie={movie}
//                     onClick={movie => this.onMovieClick(movie)}
//                   />
//                 </Col>
//               );
//             })
//           )}
//         </Row>
//       </Container>
//     );
//   }
// }
