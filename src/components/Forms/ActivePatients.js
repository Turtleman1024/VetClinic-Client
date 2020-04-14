import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';

export class ActivePatients extends Component {
  state = {};
  render() {
    return (
      <Container className='p-3'>
        <h1>Welcome to Active Patients Page</h1>
      </Container>
    );
  }
}

export default ActivePatients;
