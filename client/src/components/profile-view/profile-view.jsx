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
import Collapse from 'react-bootstrap/Collapse';
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

  removeMovie(movieId) {
    axios
      .delete(
        `https://movie-flix-777.herokuapp.com/users/${this.state.username}/movies/${movieId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` }
        }
      )
      .then(response => {
        this.setState({
          favoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

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

  render() {
    const { open } = this.state;
    return (
      <>
        <Button
          onClick={() => this.setState({ open: !open })}
          variant='secondary'
          size='sm'
        >
          Edit
        </Button>
        <Collapse in={this.state.open}>
          <div>
            <Form.Control
              type={this.props.type}
              placeholder={`Enter ${this.props.type}`}
              onChange={e => this.setState({ userInput: e.target.value })}
            />
            <Button
              variant='primary'
              size='sm'
              onClick={() => console.log('teste=', this.state.userInput)}
            >
              Submit
            </Button>
          </div>
        </Collapse>
      </>
    );
  }
}
