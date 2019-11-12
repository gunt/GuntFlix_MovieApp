// import React from 'react';
// import PropTypes from 'prop-types';
// import Button from 'react-bootstrap/Button';
// import { Link } from 'react-router-dom';

// import './movie-view.scss';

// export class MovieView extends React.Component {
//   // constructor() {
//   //   super();
//   //   this.state = {};
//   // }
//   render() {
//     if (!this.props.movie) return null;
//     return (
//       <div className='movie-view'>
//         <div className='movie-title'>
//           <h2 className='label'>Title</h2>
//           <p className='value'>{this.props.movie.Title}</p>
//         </div>
//         <div className='movie-description'>
//           <h3 className='label'>Description</h3>
//           <p className='value'>{this.props.movie.Description}</p>
//         </div>
//         <div className='movie-genre'>
//           <h3 className='label'>Genre</h3>
//           <p className='value'>{this.props.movie.Genre.Name}</p>
//         </div>
//         <div className='movie-director'>
//           <h3 className='label'>Director</h3>
//           <p className='value'>{this.props.movie.Director.Name}</p>
//         </div>
//         <div className='return-button'>
//           <Link to={'/'}>
//             <Button variant='light'>Return</Button>
//           </Link>
//         </div>
//       </div>
//     );
//   }
// }

// // MovieView.propTypes = {
// //   movie: PropTypes.shape({
// //     Title: PropTypes.string,
// //     ImageUrl: PropTypes.string,
// //     Description: PropTypes.string,
// //     Genre: PropTypes.exact({
// //       _id: PropTypes.string,
// //       Name: PropTypes.string,
// //       Description: PropTypes.string
// //     }),
// //     Director: PropTypes.shape({
// //       Name: PropTypes.string
// //     })
// //   }).isRequired
// // };

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './movie-view.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  // /users/:username/movies/:MovieID
  submitLike(event) {
    event.preventDefault();
    console.log(this.state.username);
    axios
      .post(
        `https://movie-flix-777.herokuapp.com/users/${localStorage.getItem(
          'user'
        )}/movies/${this.props.movie._id}`,
        {
          Username: localStorage.getItem('user')
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      )
      .then(response => {
        console.log(response);
        alert('Movie has been added to your Favorite List!');
        //update localStorage
        localStorage.setItem('user', this.state.username);
      })
      .catch(event => {
        console.log('error adding movie to list');
        alert('Something went wrong!');
      });
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div className='movie-view'>
        <div className='movie-title'>
          <h2 className='label'>Title</h2>
          <p className='value'>{movie.Title}</p>
        </div>
        <div className='movie-description'>
          <h3 className='label'>Description</h3>
          <p className='value'>{movie.Description}</p>
        </div>
        <img alt='' className='movie-poster' src={movie.ImageURL} />
        <div className='movie-genre'>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <h3 className='label'>Genre</h3>
            <Button variant='dark'>
              <p className='value'>{movie.Genre.Name}</p>
            </Button>
          </Link>
        </div>
        <div className='movie-director'>
          <Link to={`/movies/directors/${movie.Director.Name}`}>
            <h3 className='label'>Director</h3>
          </Link>
          <h4>{movie.Director.Name}</h4>
        </div>

        <Link to={'/'}>
          <Button variant='dark'>Back</Button>
        </Link>

        <Button variant='dark' onClick={event => this.submitLike(event)}>
          Add to Favorites Movies
        </Button>
      </div>
    );
  }
}
// MovieView.propTypes = {
//   movie: PropTypes.shape({
//     Title: PropTypes.string
//   }).isRequired
// };
