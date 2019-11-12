import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from 'react';
import { Link } from 'react-router-dom';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
import './director-view';

export class DirectorView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favoriteMovies: [],
      movies: [],
      favorite: [],
      director: []
    };
  }

  getdirector(token) {
    console.log(this.props);
    axios
      .get(
        `https://movie-flix-777.herokuapp.com/movies/directors/${this.props.director.name}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .then(res => {
        this.setState({
          date: res.data,
          name: res.data.name,
          bio: res.data.bio,
          birth: res.data.birth,
          death: res.data.death
        });
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { director } = this.props;

    return (
      <Card>
        <Card.Img variant='top' />
        <Card.Body>
          <Card.Title>{console.log(this.props)}</Card.Title>
          <Card.Text>Director: {director.name}</Card.Text>
          <Card.Text>Director Bio: {director.bio}</Card.Text>
          <Card.Text>Birth: {director.birth}</Card.Text>
          <Card.Text>Year of death or alive: {director.death}</Card.Text>
          <Link to={`/`}>
            <Button variant='primary'>Go back</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}
