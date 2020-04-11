import React, { Component } from 'react';
import { FormGroup, Row, Col } from 'react-bootstrap';
import Input from '../Input/Input';
import Patient from './Patient';
import 'bootstrap/dist/css/bootstrap.min.css';

export class Owner extends Component {
  constructor(props) {
    super(props);
    this.state = { owners: [] };
  }

  componentDidMount() {
    this.fetchOwners().then((owners) => this.setState({ owners }));
  }

  async fetchOwners() {
    let response = await fetch('https://localhost:44368/api/v1/owners');
    let data = await response.json();
    return data;
  }

  onBlur = (name, value) => {
    this.setState({ [name]: value });
  };

  onChange = (name, value) => {
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className='App' style={{ backgroundColor: '#DCDCDC' }}>
        {this.state.owners.map((owner, i) => (
          <FormGroup key={owner.ownerId}>
            <Row>
              <Col md={1} />
              <Col className='field-area'>
                <Input
                  name='ownerFirstName'
                  type='text'
                  value={owner.ownerFirstName}
                  label="Owner's First Name"
                  placeholderText="Owner's First Name"
                  onChange={this.onChange}
                  onBlue={this.onBlur}
                />
              </Col>
              <Col md={1} />
              <Col className='field-area'>
                <Input
                  name='ownerLastName'
                  type='text'
                  value={owner.ownerLastName}
                  label="Owner's Last Name"
                  placeholderText="Owner's Last Name"
                  onChange={this.onChange}
                  onBlue={this.onBlur}
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
                  value={owner.ownerAddress}
                  label="Owner's Address"
                  placeholderText="Owner's Address"
                  onChange={this.onChange}
                  onBlue={this.onBlur}
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
                  value={owner.ownerCity}
                  label="Owner's City"
                  placeholderText="Owner's City"
                  onChange={this.onChange}
                  onBlue={this.onBlur}
                />
              </Col>
              <Col md={1} />
              <Col className='field-area'>
                <Input
                  name='ownerZip'
                  type='number'
                  value={owner.ownerZip}
                  label="Owner's Zip"
                  placeholderText="Owner's Zip"
                  onChange={this.onChange}
                  onBlue={this.onBlur}
                />
              </Col>
              <Col md={1} />
            </Row>
            {owner.ownerPets &&
              owner.ownerPets.map((patient, i) => (
                <Patient key={patient.patientId} patient={patient} />
              ))}
            <hr className='line' />
          </FormGroup>
        ))}
      </div>
    );
  }
}

export default Owner;
