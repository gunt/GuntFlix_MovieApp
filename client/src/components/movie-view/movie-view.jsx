// import React from 'react';
// import PropTypes from 'prop-types';
// import Button from 'react-bootstrap/Button';
// import './movie-view.scss';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// export class MovieView extends React.Component {
//   constructor() {
//     super();

//     this.state = {};
//   }

//   // /users/:username/movies/:MovieID
//   submitLike(event) {
//     event.preventDefault();
//     console.log(this.state.username);
//     axios
//       .post(
//         `https://movie-flix-777.herokuapp.com/users/${localStorage.getItem(
//           'user'
//         )}/movies/${this.props.movie._id}`,
//         {
//           Username: localStorage.getItem('user')
//         },
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//         }
//       )
//       .then(response => {
//         console.log(response);
//         alert('Movie has been added to your Favorite List!');
//         //update localStorage
//         localStorage.setItem('user', this.state.username);
//       })
//       .catch(event => {
//         console.log('error adding movie to list');
//         alert('Something went wrong!');
//       });
//   }

//   render() {
//     const { movie } = this.props;

//     if (!movie) return null;

//     return (
//       <div className='movie-view'>
//         <div className='movie-title'>
//           <h2 className='label'>Title</h2>
//           <p className='value'>{movie.Title}</p>
//         </div>
//         <div className='movie-description'>
//           <h3 className='label'>Description</h3>
//           <p className='value'>{movie.Description}</p>
//         </div>
//         <img alt='' className='movie-poster' src={movie.ImageURL} />
//         <div className='movie-genre'>
//           <Link to={`/genres/${movie.Genre.Name}`}>
//             <h3 className='label'>Genre</h3>
//             <Button variant='dark'>
//               <p className='value'>{movie.Genre.Name}</p>
//             </Button>
//           </Link>
//         </div>
//         <div className='movie-director'>
//           <Link to={`/directors/${movie.Director.Name}`}>
//             <h3 className='label'>Director</h3>
//           </Link>
//           <h4>{movie.Director.Name}</h4>
//         </div>

//         <Link to={'/'}>
//           <Button variant='dark'>Back</Button>
//         </Link>

//         <Button variant='dark' onClick={event => this.submitLike(event)}>
//           Add to Favorites Movies
//         </Button>
//       </div>
//     );
//   }
// }
// // MovieView.propTypes = {
// //   movie: PropTypes.shape({
// //     Title: PropTypes.string
// //   }).isRequired
// // };

import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './movie-view.scss';
import { Link } from 'react-router-dom';

export function MovieView(props) {
  const { movie } = props;
  if (!movie) return null;

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(
        `https://movie-flix-777.herokuapp.com/users/${localStorage.getItem(
          'username'
        )}/movies/${movie._id}`,
        {
          Username: localStorage.getItem('username')
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      )
      .then(response => {
        console.log(response);
        alert('Movie has been added to your Favorite List!');
      })
      .catch(event => {
        console.log('error adding movie to list');
        alert('Something went wrong!');
      });
  }

  // app.post('/users/:username/movies/:MovieID', function (req, res) {
  //   Users.findOneAndUpdate({
  //       Username: req.params.Username
  //     }, {
  //       $push: {
  //         Favorites: req.params.MovieID
  //       }
  //     }, {
  //       new: true
  //     },
  //     function (err, updatedUser) {
  //       if (err) {
  //         console.error(err);
  //         res.status(500).send('Error: ' + err);
  //       } else {
  //         res.json(updatedUser)
  //       }
  //     })
  // });

  return (
    <Card className='movie-view' style={{ width: '45rem' }}>
      <span>
        {' '}
        <img className='movie-poster' src={movie.ImageUrl} />
        <Card.Body>
          <Card.Title className='movie-title'>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <ListGroup className='list-group-flush' variant='flush'>
            <ListGroup.Item>
              {' '}
              <p className='movie-info'>Genre: {movie.Genre.Name}</p>
              <Link className='text-center' to={`/genres/${movie.Genre.Name}`}>
                <Button variant='outline-secondary' size='sm'>
                  Learn more
                </Button>
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              {' '}
              <p className='movie-info'>Director: {movie.Director.Name}</p>
              <Link
                className='text-center'
                to={`/directors/${movie.Director.Name}`}
              >
                <Button variant='outline-secondary' size='sm'>
                  Learn more
                </Button>
              </Link>
            </ListGroup.Item>
          </ListGroup>
          <div className='text-center'>
            <Button
              variant='outline-success'
              onClick={event => handleSubmit(event)}
            >
              {' '}
              Add to Favorite{' '}
            </Button>
            <Link to={`/`}>
              <Button className='button-back' variant='outline-info'>
                More Movies
              </Button>
            </Link>
          </div>
        </Card.Body>
      </span>
    </Card>
  );
}
