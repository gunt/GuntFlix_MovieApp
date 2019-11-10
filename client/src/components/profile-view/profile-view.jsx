import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import './profile-view.scss';

// import React from 'react';
// import axios from 'axios';
// // import { withRouter } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// // import Route from 'react-router-dom/Route';
// import { LoginView } from '../login-view/login-view';
// import { MovieCard } from '../movie-card/movie-card';
// import { MovieView } from '../movie-view/movie-view';
// import { RegistrationView } from '../registration-view/registration-view';
// //to update user profile page first import component
// import { ProfileView } from '../profile-view/profile-view';
// import { UpdateProfile } from '../update-profile/update-profile';
// import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button';

class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoritesMovies: [],
      Movies: []
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  getUser(token) {
    const username = localStorage.getItem('user');
    axios
      .get(`https://movie-flix-777.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        this.setState({
          Username: res.data.username,
          Password: res.data.password,
          Email: res.data.email,
          Birthday: res.data.birthday,
          FavoritesMovies: res.data.favoriteMovies
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const favoriteMovieList = this.props.movies.filter(m =>
      this.state.favoriteMovies.includes(m._id)
    );

    return (
      <div>
        <Container>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>{this.state.username}</Card.Title>
                <Card.Text>Email: {this.state.email}</Card.Text>
                <Card.Text>Birthday {this.state.birthday}</Card.Text>
                Favorite Movies:
                {favoriteMovieList.map(m => (
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
