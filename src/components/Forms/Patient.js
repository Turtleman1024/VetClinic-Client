import React, { Component } from 'react';
import { Container, Row, Col, FormLabel } from 'react-bootstrap';
import Input from '../Input/Input';
import TextArea from '../TextArea/TextArea';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';

export class Patient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientId: this.props.patient.patientId,
      ownerId: this.props.patient.ownerId,
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
      <div className='App' style={{ backgroundColor: '#74b9ff' }}>
        <Container>
          <Row>
            <Col>{`Patient Id: ${this.state.patientId}`}</Col>
          </Row>
          <Row>
            <Col>
              <FormLabel>Is Patient Active</FormLabel>
            </Col>
          </Row>
          <Row>
            <Col md={1}>
              <input
                type='checkbox'
                id='isActive'
                name='isActive'
                checked={this.state.isActive}
                onChange={this.toggleCheckbox}
                disabled={this.props.readOnly}
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
                disabled={this.props.readOnly}
              />
              <label>{'No'}</label>
            </Col>
            <Col md={1} />
          </Row>
          <Row>
            <Col>
              <Input
                name='patientName'
                type='text'
                value={this.state.patientName}
                label="Patient's Name"
                placeholderText="Enter Patient's Name"
                onChange={this.onChange}
                onBlur={this.onBlur}
              />
            </Col>
            <Col>
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
          </Row>
          <Row>
            <Col>
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
            <Col>
              <Input
                name='patientBirthDate'
                type='text'
                value={new Date(this.state.patientBirthDate).toLocaleDateString(
                  'en-US'
                )}
                label="Patient's Birth Date"
                placeholderText="Enter Patient's Birth Date"
                onChange={this.onChange}
                onBlur={this.onBlur}
              />
            </Col>
          </Row>
          <Row>
            <Col>
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
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  if (ownProps.patient) {
    return {
      patient: ownProps.patient,
    };
  }
  let id = ownProps.match.params.patientId;
  return {
    patient: state.vetClinic.patients.find(
      (patient) => patient.patientId.toString() === id
    ),
  };
};

export default connect(mapStateToProps)(Patient);
