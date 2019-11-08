import React from 'react';
import axios from 'axios';
// import { MovieCard } from '../movie-card/movie-card';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
// import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';

import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      email: null,
      birthday: null,
      favoriteMovies: []
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo() {
    axios
      .get(`https://movie-flix-777.herokuapp.com/users/${localStorage.user}`, {
        headers: { Authorization: `Bearer ${localStorage.token}` }
      })
      .then(response => {
        this.setState({
          username: response.data.Username,
          email: response.data.Email,
          birthday: response.data.Birthday,
          favoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  //   removeMovie(movieId) {
  //     axios
  //       .delete(
  //         `https://movie-flix-777.herokuapp.com/users/${this.state.username}/movies/${movieId}`,
  //         {
  //           headers: { Authorization: `Bearer ${localStorage.token}` }
  //         }
  //       )
  //       .then(response => {
  //         this.setState({
  //           favoriteMovies: response.data.FavoriteMovies
  //         });
  //       })
  //       .catch(err => {
  //         console.error(err);
  //       });
  //   }

  render() {
    if (!localStorage.user) {
      return <Redirect to='/' />;
    } else {
      console.log(this.props.movies);
      return (
        <Container className='profile-view'>
          <Row>
            <Col>
              <h2>User profile</h2>
              <div className='user-username'>
                <h3 className='label'>Username</h3>
                <p className='value'>
                  {this.state.username} <EditProfile type={'username'} />
                </p>
              </div>
              <div className='user-email'>
                <h3 className='label'>Email</h3>
                <p className='value'>
                  {this.state.email} <EditProfile type={'email'} />
                </p>
              </div>
              <div className='user-birthday'>
                <h3 className='label'>Birthday</h3>
                <p className='value'>
                  {this.state.birthday} <EditProfile type={'date'} />
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <h3 className='label'>Favorite Movies</h3>
              <ListGroup className='user-favorite-movies'>
                {this.props.movies.map(mov => {
                  if (
                    mov._id ===
                    this.state.favoriteMovies.find(favMov => favMov === mov._id)
                  ) {
                    return (
                      <ListGroup.Item>
                        {mov.Title}
                        <Link to={`/movies/${mov._id}`}>
                          <Button variant='primary' size='sm'>
                            View
                          </Button>
                        </Link>
                        <Button
                          variant='danger'
                          size='sm'
                          onClick={() => this.removeMovie(mov._id)}
                        >
                          Remove
                        </Button>
                      </ListGroup.Item>
                    );
                  } else {
                    return null;
                  }
                })}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

class EditProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      userInput: null
    };
  }

//   render() {
//     const { open } = this.state;
//     return (
//       <div className='profile-view'>
//         <h1 className='director'>User Profile</h1>
//         <div className='username'>
//           <div className='label'>Name</div>
//           <div className='value'>{user.Username}</div>
//         </div>
//         <div className='password'>
//           <div className='label'>Password</div>
//           <div className='value'>********</div>
//         </div>
//         <div className='birthday'>
//           <div className='label'>Birthday</div>
//           <div className='value'>{user.Birthday}</div>
//         </div>
//         <div className='email'>
//           <div className='label'>Email</div>
//           <div className='value'>{user.Email}</div>
//         </div>
//         <div className='favoritemovies'>
//           <div className='label'>Favorite Movies</div>
//           <div className='value'>{user.FavoriteMovies}</div>
//         </div>
//         <Link to={'/'}>
//           <Button className='view-btn' variant='outline-dark' type='button'>
//             Back
//           </Button>
//         </Link>
//         <Button
//           className='view-btn'
//           variant='outline-dark'
//           type='button'
//           onClick={event => this.deleteUser(event)}
//         >
//           Delete
//         </Button>
//         <Button
//           id='toggleButton'
//           className='vuew-btn'
//           variant='outline-dark'
//           type='button'
//           onClick={() => this.toggleForm()}
//         >
//           Change Data
//         </Button>

//         <Form className='changeDataForm'>
//           <h2>Change Data</h2>
//           <Form.Group controlId='formBasicUsername'>
//             <Form.Label>Your Username</Form.Label>
//             <Form.Control
//               type='text'
//               name='username'
//               onChange={event => this.handleChange(event)}
//               Placeholder='Enter Username'
//             />
//             <Form.Text className='text-muted'>Type username here.</Form.Text>
//           </Form.Group>

//           <Form.Group controlId='formBasicPassword'>
//             <Form.Label>Your Password</Form.Label>
//             <Form.Control
//               type='text'
//               name='password'
//               onChange={event => this.handleChange(event)}
//               Placeholder='Password'
//             />
//           </Form.Group>

//           <Form.Group controlId='formBasicEmail'>
//             <Form.Label>Your Email</Form.Label>
//             <Form.Control
//               type='text'
//               name='Email'
//               onChange={event => this.handleChange(event)}
//               Placeholder='example@email.com'
//             />
//           </Form.Group>

//           <Form.Group controlId='formBasicBirthday'>
//             <Form.Label>Your Birthday</Form.Label>
//             <Form.Control
//               type='text'
//               name='birthday'
//               onChange={event => this.handleChange(event)}
//               Placeholder='Birthday'
//             />
//           </Form.Group>

//           <Button
//             variant='outline-dark'
//             type='button'
//             onClick={event => this.handleSubmit(event)}
//           >
//             Change
//           </Button>
//         </Form>
//       </div>
//     );
//   }
// }
