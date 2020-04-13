import React, { Component } from 'react';
import { FormGroup, Row, Col, FormLabel } from 'react-bootstrap';
import Input from '../Input/Input';
import TextArea from '../TextArea/TextArea';
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
      isActive: this.props.patient.isActive,
    };
  }

  onBlur = (name, value) => {
    this.setState({ [name]: value });
  };

  onChange = (name, value) => {
    this.setState({ [name]: value });
  };

  toggleCheckbox = (e) => {
    this.setState({ [e.target.name]: !this.state.isActive });
  };

  render() {
    return (
      <div className='App' style={{ backgroundColor: '#f0f8ff' }}>
        <FormGroup key={this.state.patientId}>
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
                  checked={this.state.isActive}
                  onChange={this.toggleCheckbox}
                />
                <label>{'Yes'}</label>
              </Col>
              <Col md={1}>
                <input
                  type='checkbox'
                  id='isActive'
                  name='isActive'
                  checked={!this.state.isActive}
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
                  value={this.state.patientName}
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
                  value={this.state.patientSpecies}
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
                  value={this.state.patientGender}
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
                  value={this.state.patientBirthDate}
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
                  value={this.state.patientNotes}
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
        </FormGroup>
      </div>
    );
  }
}

export default Patient;
