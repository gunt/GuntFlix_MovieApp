import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    // Use relative path for API (same server on Render)
    axios.post('/login', {
      Username: this.state.username,
      Password: this.state.password
    })
    .then(response => {
      const { data } = response;
      this.props.onLoggedIn(data);
    })
    .catch(error => {
      console.log("Please Register First");
      // Handle error appropriately
    });
  }

  render() {
    const { username, password } = this.state;
    
    return (
      <div className="login-view">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter username"
              name="username"
              value={username}
              onChange={this.handleChange} 
            />
          </Form.Group>
          
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password"
              name="password"
              value={password}
              onChange={this.handleChange} 
            />
          </Form.Group>
          
          <Button 
            id="loginButton" 
            size="m" 
            variant="dark" 
            type="submit"
          >
            Log in
          </Button>
          
          <Form.Group controlId="formNewUser">
            <Form.Text className="newUsers">
              New user? click 
              <Link to="/register">Here</Link> 
              to sign up
            </Form.Text>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default LoginView;