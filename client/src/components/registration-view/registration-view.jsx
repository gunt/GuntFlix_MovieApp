// client/src/components/main-view/registration-view.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = () => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <Form>
      <Form.Group controlId='formBasicUsername'>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type='username'
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder='Enter Username'
        />
      </Form.Group>

      <Form.Group controlId='formBasicPassword'>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='Enter Password'
        />
      </Form.Group>

      <Form.Group controlId='formBasicEmail'>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='Enter Email'
        />
      </Form.Group>

      <Form.Group controlId='formBasicBirthday'>
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type='birthday'
          value={birthday}
          onChange={e => setBirthday(e.target.value)}
          placeholder='Enter Birthday'
        />
      </Form.Group>
      <Button variant='outline-dark' type='submit' onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}

RegistrationView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired
};
