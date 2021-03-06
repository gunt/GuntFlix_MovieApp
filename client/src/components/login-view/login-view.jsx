import React, { useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

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
        console.log('Please Register First');
      });
  };

  return (
    <Container className='logContainer'>
      <form>
        <Form.Group controlId='formBasicUsername'>
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
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button id='loginButton' size='m' variant='dark' onClick={handleSubmit}>
          Log in
        </Button>
        <Form.Group controlId='formNewUser'>
          <Form.Text className='newUsers'>
            New user? click{' '}
            <Link to={'/register'}>
              {' '}
              <Button variant='dark'>Here</Button>
            </Link>{' '}
            to sign up{' '}
          </Form.Text>
        </Form.Group>
      </form>
    </Container>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};
