import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// import style
import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  // updating handle submit //https://movie-flix-777.herokuapp.com
  const handleSubmit = e => {
    e.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      console.log('new login', username, 'with password', password);
      /* Send a request to the server for authentication */
      /* then call props.onLoggedIn(username) */
      props.onLoggedIn(username);
    }
    setValidated(true);
  };

  // https://react-bootstrap.github.io/components/forms/
  // React-bootstrap components form
  // React-bootstrap container // https://stackoverflow.com/questions/44872273/how-to-replace-container-class-in-react-bootstrap
  return (
    <div className='login-view'>
      <Row className='justify-content-center'>
        <Col xs={11} sm={8} md={6} className='form-container'>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId='formBasicUsername'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                placeholder='Enter username'
              />
              <Form.Control.Feedback type='invalid'>
                Choose a Username.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder='Password'
              />
              <Form.Control.Feedback type='invalid'>
                Insert password.
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};
