import React from 'react';
import Button from 'react-bootstrap/Button';
import './genre-view.scss';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function GenreView(props) {
  const { movies, genreName } = props;

  if (!movies || !movies.length) return null;
  const genre = movies.find(movie => movie.Genre.Name === genreName);

  return (
    <div className='genre-view'>
      <h1 className='genre'>{genre.Genre.Name}</h1>
      <div className='description'>{genre.Genre.Description}</div>
      <Link to={'/'}>
        <Button variant='dark'>Back</Button>
      </Link>
    </div>
  );
}

export default connect(({ movies }) => ({ movies }))(GenreView);
