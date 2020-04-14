import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

class Header extends Component {
  render() {
    return (
      <Container className='p-3'>
        <Jumbotron>
          <header className='App-header'>
            <h1 align='center'>Turtleman's VetClinic</h1>
          </header>
          <hr className='line' />
        </Jumbotron>
      </Container>
    );
  }
}

export default Header;
