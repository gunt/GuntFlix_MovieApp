// import React from 'react';

// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import './director-view.scss';

// import { Link } from 'react-router-dom';

// export class DirectorView extends React.Component {
//   constructor() {
//     super();

//     this.state = {};
//   }

//   render() {
//     const { director } = this.props;

//     if (!director) return null;

//     return (
//       <Card className='director-info' style={{ width: '18rem' }}>
//         <Card.Body>
//           <Card.Title className='director-name'>{director.Name}</Card.Title>
//           <Card.Text>
//             Biography: <br />
//             <br />
//             {director.Bio}
//             <br />
//             <br />
//             Birth Year: {director.BirthYear}
//           </Card.Text>
//           <div className='text-center'>
//             <Link to={`/`}>
//               <Button className='button-card' variant='info'>
//                 Back
//               </Button>
//             </Link>
//           </div>
//         </Card.Body>
//       </Card>
//     );
//   }
// }

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './director-view.scss';
import { Link } from 'react-router-dom';

function DirectorView(props) {
  const { movies, directorName } = props;

  if (!movies || !movies.length) return null;

  const director = movies.find(movie => movie.Director.Name === directorName)
    .Director;

  return (
    <div className='director-view'>
      <h1 className='director'>{director.Name}</h1>
      <hr></hr>
      <h2 id='info'>Biography</h2>
      <div className='bio'>{director.Bio}</div>
      <h2 id='info'>Born</h2>
      <div className='birth'>{director.Birth}</div>
      <h2 id='info'>Died</h2>
      <div className='death'>{director.Death}</div>
      <Link to={'/'}>
        <Button className='backbutton' variant='outline-dark'>
          Back
        </Button>
      </Link>
    </div>
  );
}

DirectorView.propTypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string,
    Bio: PropTypes.string,
    Death: PropTypes.string
  }).isRequired
};
