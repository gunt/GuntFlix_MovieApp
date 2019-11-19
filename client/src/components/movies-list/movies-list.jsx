import React from 'react';
import { connect } from 'react-redux';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

// import './movies-list.scss';

const mapStateToProps = state => {
  const { movies, visibilityFilter, sortColumn } = state;

  let moviesToShow = movies.concat().sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return -1;
    if (a[sortColumn] > b[sortColumn]) return 1;
    return 0;
  });

  if (visibilityFilter !== '') {
    moviesToShow = moviesToShow.filter(m =>
      m.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  return { movies: moviesToShow };
};

function MoviesList(props) {
  const { movies } = props;

  if (!movies) return <div className='main-view' />;

  return (
    <div className='movie-list'>
      <VisibilityFilterInput />
      <Container>
        <Row>
          {movies.map(m => (
            // <Col key={m._id} xs={8} sm={8} md={6} lg={'auto'}>
            //   <MovieCard key={m.id} movie={m} />
            // </Col>
            <Col key={m._id} xl={4} sm={6} md={4} xs={10}>
              <MovieCard key={m._id} movie={m} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default connect(mapStateToProps)(MoviesList);
