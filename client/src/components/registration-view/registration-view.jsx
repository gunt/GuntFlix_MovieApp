//imports
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './registration-view.scss';

export function RegistrationView(props) {
  const [username, createUsername] = useState('');
  const [password, createPassword] = useState('');
  const [email, createEmail] = useState('');
  const [birthday, createDob] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log(username, password, birthday, email);
    props.onLoggedIn(username);
  };

  return (
    <Container className='regContainer'>
      <Form className='registrationForm'>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={e => createEmail(e.target.value)}
          />
          <Form.Text className='emailShare'>
            We never share your information.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId='formBasicUsername'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Username'
            value={username}
            onChange={e => createUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password}
            onChange={e => createPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='formBasicDob'>
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type='date'
            placeholder='07/07/1977'
            value={birthday}
            onChange={e => createDob(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='formBasicCheckbox'>
          <Form.Check type='checkbox' label='Accept Terms and Conditions' />
        </Form.Group>
        <Button variant='primary' type='submit' onClick={handleSubmit}>
          Create Account
        </Button>
        <Form.Text>
          Already registered? Click{' '}
          <Button
            style={{ padding: 0 }}
            variant='link'
            onClick={() => props.userRegistered()}
          >
            {' '}
            here{' '}
          </Button>{' '}
          to login
        </Form.Text>
      </Form>
    </Container>
  );
}

RegistrationView.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  userRegistered: PropTypes.func.isRequired,
  onLoggedIn: PropTypes.func.isRequired
};
