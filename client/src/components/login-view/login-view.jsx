import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
    <Container className='logContainer '>
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
        <Button id='loginButton' onClick={handleSubmit}>
          Log in
        </Button>

        <Form.Group controlId='newUser'>
          <Form.Text>
            New User? Click
            <Link to={`/register`}>
              <Button size='sm' id='registerButton'>
                here
              </Button>
            </Link>
          </Form.Text>
        </Form.Group>
      </form>
    </Container>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};
