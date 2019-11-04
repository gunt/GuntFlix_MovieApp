import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios
      .post('https://movie-flix-777.herokuapp.com/login', {
        Username: username,
        Password: password
      })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user');
      });
  };

  return (
    <Container className='logContainer'>
      <h1>Welcome to Movies</h1>
      <form>
        <Form.Group controlId='formUsername'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter username'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant='info' type='submit' onClick={handleSubmit}>
          Login
        </Button>

        <Form.Group controlId='formNewUser'>
          <Form.Text>
            New user? Click{' '}
            <Button
              id='login-view__register'
              style={{ padding: 0 }}
              variant='link'
              onClick={() => props.newUser()}
            >
              {' '}
              here{' '}
            </Button>{' '}
            to register
          </Form.Text>
        </Form.Group>
      </form>
    </Container>
  );
}

// LoginView.propTypes = {
//   username: PropTypes.string.isRequired,
//   password: PropTypes.string.isRequired,
//   handleSubmit: PropTypes.func.isRequired,
//   onLoggedIn: PropTypes.func.isRequired
//   // onClick: PropTypes.func.isRequired
// };
