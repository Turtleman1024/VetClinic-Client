import React, { Component } from 'react';
import { FormGroup, Row, Col } from 'react-bootstrap';
import Input from '../Input/Input';
import 'bootstrap/dist/css/bootstrap.min.css';

export class Patient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientId: this.props.patient.patientId,
      patientName: this.props.patient.patientName,
      patientSpecies: this.props.patient.patientSpecies,
      patientGender: this.props.patient.patientGender,
      patientBirthDate: this.props.patient.patientBirthDate,
      patientNotes: this.props.patient.patientNotes,
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
      <div className='App' style={{ backgroundColor: '#f0f8ff' }}>
        <FormGroup key={this.state.patientId}>
          <Row>
            <Col md={1} />
            <Col className='field-area'>
              <Input
                name='patientName'
                type='text'
                value={this.state.patientName}
                label='Patient Name'
                placeholderText='Patient Name'
                onChange={this.onChange}
                onBlue={this.onBlur}
              />
            </Col>
            <Col md={1} />
            <Col className='field-area'>
              <Input
                name='patientSpecies'
                type='text'
                value={this.state.patientSpecies}
                label="Patient's Species"
                placeholderText="Patient's Species"
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
                name='patientGender'
                type='text'
                value={this.state.patientGender}
                label="Patient's Gender"
                placeholderText="Patient's Gender"
                onChange={this.onChange}
                onBlue={this.onBlur}
              />
            </Col>
            <Col md={1} />
            <Col className='field-area'>
              <Input
                name='patientBirthDate'
                type='text'
                value={this.state.patientBirthDate}
                label="Patient's Birth Date"
                placeholderText="Patient's Birth Date"
                onChange={this.onChange}
                onBlue={this.onBlur}
              />
            </Col>
            <Col md={1} />
          </Row>
          <Row>
            <Col md={1} />
            <Col md={1} />
            <Col className='field-area'>
              <label>{'Patient Notes'}</label>
              <textarea
                value={this.state.patientNotes}
                onChange={this.onChange}
              />
            </Col>
            <Col md={1} />
          </Row>
        </FormGroup>
      </div>
    );
  }
}

export default Patient;
