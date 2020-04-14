import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { FormGroup, FormLabel, Row, Col } from 'react-bootstrap';
import Input from '../Input/Input';
import TextArea from '../TextArea/TextArea';

export class ActivePatients extends Component {
  constructor(props) {
    super(props);
    this.state = { patients: [] };
  }

  componentDidMount() {
    this.fetchOwners().then((patients) => this.setState({ patients }));
  }

  async fetchOwners() {
    let response = await fetch(
      'https://localhost:44368/api/v1/patients/active'
    );
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
      <Container style={{ backgroundColor: '#f0f8ff' }}>
        {this.state.patients.map((patient, i) => (
          <FormGroup key={patient.patientId}>
            <Col md={1} />
            <Col md={10}>
              <Row>
                <Col md={1} />
                <Col>
                  <FormLabel>Is Patient Active</FormLabel>
                </Col>
                <Col md={1} />
              </Row>
              <Row>
                <Col md={1} />
                <Col md={1}>
                  <input
                    type='checkbox'
                    id='isActive'
                    name='isActive'
                    checked={patient.isActive}
                    onChange={this.toggleCheckbox}
                  />
                  <label>{'Yes'}</label>
                </Col>
                <Col md={1}>
                  <input
                    type='checkbox'
                    id='isActive'
                    name='isActive'
                    checked={!patient.isActive}
                    onChange={this.toggleCheckbox}
                  />
                  <label>{'No'}</label>
                </Col>
                <Col md={1} />
              </Row>
              <Row>
                <Col md={1} />
                <Col className='field-area'>
                  <Input
                    name='patientName'
                    type='text'
                    value={patient.patientName}
                    label='Patient Name'
                    placeholderText="Enter Patient's Name"
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                  />
                </Col>
                <Col md={1} />
                <Col className='field-area'>
                  <Input
                    name='patientSpecies'
                    type='text'
                    value={patient.patientSpecies}
                    label="Patient's Species"
                    placeholderText="Enter Patient's Species"
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
                    name='patientGender'
                    type='text'
                    value={patient.patientGender}
                    label="Patient's Gender"
                    placeholderText="Enter Patient's Gender"
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                  />
                </Col>
                <Col md={1} />
                <Col className='field-area'>
                  <Input
                    name='patientBirthDate'
                    type='text'
                    value={patient.patientBirthDate}
                    label="Patient's Birth Date"
                    placeholderText="Enter Patient's Birth Date"
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                  />
                </Col>
                <Col md={1} />
              </Row>
              <Row>
                <Col md={1} />
                <Col className='field-area'>
                  <TextArea
                    name='patientNotes'
                    type='text'
                    value={patient.patientNotes}
                    label='Patient Notes'
                    placeholderText="Enter Patient's Notes"
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                  />
                </Col>
                <Col md={1} />
              </Row>
            </Col>
            <Col md={1} />
            <hr className='line' />
          </FormGroup>
        ))}
      </Container>
    );
  }
}

export default ActivePatients;
