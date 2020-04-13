import React, { Component } from 'react';
import './VetClinic.css'; //Global css
import Header from './components/Header/Header';
import Owner from './components/Forms/Owner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

export class VetClinic extends Component {
  render() {
    return (
      <Container className='p-3'>
        <Jumbotron>
          <Header />
        </Jumbotron>
        <Owner />
      </Container>
    );
  }
}

export default VetClinic;
