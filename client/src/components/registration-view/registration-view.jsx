// client/src/components/registration-view/registration-view.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './registration-view.scss';

export function RegistrationView(props) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [validated, setValidated] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();

    // handles form validation
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      console.log('new registration', username, 'with password', password);

      props.onNewUserRegistered(username);
    }

    setValidated(true);
  };

  return (
    <div className='registration-view'>
      <Row className='justify-content-center'>
        <Col xs={11} sm={8} md={6} className='form-container'>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {formField('Name', name, setName)}
            {formField('Username', username, setUsername)}
            {formField('Password', password, setPassword, 'password')}
            {formField(
              'Email',
              email,
              setEmail,
              'email',
              'Please provide a valid email address.'
            )}
            {formField(
              'Birthday',
              birthday,
              setBirthday,
              'date',
              'Please provide a valid date.'
            )}

            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
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
