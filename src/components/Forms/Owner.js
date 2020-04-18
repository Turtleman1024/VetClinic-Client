import React, { Component } from 'react';
import { FormGroup, Row, Col, Container } from 'react-bootstrap';
import Input from '../Input/Input';
import Patient from './Patient';

export class Owner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownerId: this.props.owner.ownerId,
      ownerFirstName: this.props.owner.ownerFirstName,
      ownerLastName: this.props.owner.ownerLastName,
      ownerAddress: this.props.owner.ownerAddress,
      ownerCity: this.props.owner.ownerCity,
      ownerZip: this.props.owner.ownerZip,
      ownerPets: this.props.owner.ownerPets,
    };
  }

  onBlur = (name, value) => {
    this.setState({ [name]: value });
  };

  onChange = (name, value) => {
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Container style={{ backgroundColor: '#3498db' }}>
        <FormGroup key={this.state.ownerId}>
          <Row>
            <Col md={1} />
            <Col className='field-area'>
              <Input
                name='ownerFirstName'
                type='text'
                value={this.state.ownerFirstName}
                label="Owner's First Name"
                placeholderText="Enter Owner's First Name"
                onChange={this.onChange}
                onBlur={this.onBlur}
              />
            </Col>
            <Col md={1} />
            <Col className='field-area'>
              <Input
                name='ownerLastName'
                type='text'
                value={this.state.ownerLastName}
                label="Owner's Last Name"
                placeholderText="Enter Owner's Last Name"
                onChange={this.onChange}
                onBlur={this.onBlur}
              />
            </Col>
            <Col md={1} />
          </Row>
          <Row>
            <Col md={1} />
            <Col md={10} className='field-address'>
              <Input
                name='ownerAddress'
                type='text'
                value={this.state.ownerAddress}
                label="Owner's Address"
                placeholderText="Enter Owner's Address"
                onChange={this.onChange}
                onBlur={this.onBlur}
              />
            </Col>
            <Col md={1} />
          </Row>
          <Row>
            <Col md={1} />
            <Col className='field-area'>
              <Input
                name='ownerCity'
                type='text'
                value={this.state.ownerCity}
                label="Owner's City"
                placeholderText="Enter Owner's City"
                onChange={this.onChange}
                onBlur={this.onBlur}
              />
            </Col>
            <Col md={1} />
            <Col className='field-area'>
              <Input
                name='ownerZip'
                type='number'
                value={this.state.ownerZip}
                label="Owner's Zip"
                placeholderText="Enter Owner's Zip"
                onChange={this.onChange}
                onBlur={this.onBlur}
              />
            </Col>
            <Col md={1} />
          </Row>
          {this.state.ownerPets &&
            this.state.ownerPets.map((patient) => (
              <Patient
                key={patient.patientId}
                patient={patient}
                readOnly={true}
              />
            ))}
          <hr className='line' />
        </FormGroup>
      </Container>
    );
  }
}

export default Owner;
