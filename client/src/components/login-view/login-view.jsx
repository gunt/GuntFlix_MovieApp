import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post('https://movie-flix-777.herokuapp.com/login', {
        username: username,
        password: password
      })
      .then(res => {
        const data = res.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        alert('Incorrect info, please try again.');
      });
  };

  return (
    <Container className='logContainer'>
      <h1>Welcome to MovieFlix</h1>
      <form>
        <Form.Group controlId='formUsername'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter username'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button id='loginButton' onClick={handleSubmit}>
          Log in
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

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};
