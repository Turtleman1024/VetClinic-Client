import React, { Component } from 'react';
import Header from '../Header/Header';
import Container from 'react-bootstrap/Container';

export class Home extends Component {
  state = {};
  render() {
    return (
      <Container className='p-3'>
        <Header />
        <h1>Welcome to Home Page</h1>
      </Container>
    );
  }
}

export default Home;
