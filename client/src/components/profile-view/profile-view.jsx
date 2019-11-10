import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './profile-view.scss';
// import { response } from 'express';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      userData: null,
      FavoritesMovies: []
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    const username = localStorage.getItem('user');
    axios
      .get(`https://movie-flix-777.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        this.setState({
          userData: response.data,
          Username: res.data.Username,
          Password: res.data.Password,
          Email: res.data.Email,
          Birthday: res.data.Birthday,
          FavoritesMovies: res.data.FavoritesMovies
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteMovieFromFavs(event, FavoritesMovies) {
    event.preventDefault();
    console.log(FavoritesMovie);
    axios
      .delete(
        `https://movie-flix-777.herokuapp.com/users/${localStorage.getItem(
          'user'
        )}/Favourites/${FavoritesMovies}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      )
      .then(res => {
        this.getUser(localStorage.getItem('token'));
      })
      .catch(event => {
        alert('Something went wrong');
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  //   render() {
  //     const FavoritesMovieList = this.props.movies.filter(m =>
  //       this.state.FavoritesMovies.includes(m._id)
  //     );

  render() {
    const { Username, Email, Birthday, FavoritesMovies } = this.state;

    return (
      <div>
        <Container>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>{this.state.username}</Card.Title>
                <Card.Text>Email: {this.state.email}</Card.Text>
                <Card.Text>Birthday {this.state.birthday}</Card.Text>
                {FavoriteMovies.map(m => (
                  <div key={m._id} className='fav-movies-button'>
                    <Link to={`/movies/${m._id}`}>
                      <Button variant='link'>{m.title}</Button>
                    </Link>
                    <Button
                      size='sm'
                      onClick={e => this.deleteFavoriteMovie(m._id)}
                    >
                      Remove Favorite
                    </Button>
                  </div>
                ))}
                <Link to={`/`}>
                  <Button variant='primary'>Go back</Button>
                </Link>
                <Link to={'/user/update'}>
                  <Button variant='primary'>Update ALL your profile.</Button>
                </Link>
                <Button onClick={() => this.deleteUser()}>
                  Delete account
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Container>
      </div>
    );
  }
}
