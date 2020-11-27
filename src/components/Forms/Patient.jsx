import React, { useState, useEffect } from 'react';
import { Container, Row, Col, FormLabel } from 'react-bootstrap';
import Input from '../Input/Input';
import TextArea from '../TextArea/TextArea';
import 'bootstrap/dist/css/bootstrap.css';
import { useParams } from "react-router-dom";

const Patient = () => {  
  const { patientId } = useParams();
  const [state, setState] = useState(null);

  useEffect(() => {
    if (patientId) {
      fetch('https://localhost:44368/api/v1/patient/id/' + patientId)
        .then((response) => response.json())
        .then((patient) => setState(patient));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const onBlur = (name, value) => {
    setState((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onChange = (name, value) => {
    setState((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleCheckbox = (name, value) => {
    setState((prev) => ({
      ...prev,
      [name]: !value,
    }));
  };

    return (
      <div className='App' style={{ backgroundColor: '#74b9ff' }}>
        {state &&
          <Container>
            <Row>
              <Col>{`Patient Id: ${state.patientId}`}</Col>
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
                  checked={state.isActive}
                  onChange={(e) => toggleCheckbox(e.target.name, e.target.checked)}
                  //disabled={this.props.readOnly}
                />
                <label>{'Yes'}</label>
              </Col>
              <Col md={1}>
                <input
                  type='checkbox'
                  id='isActive'
                  name='isActive'
                  checked={!state.isActive}
                  onChange={(e) => toggleCheckbox(e.target.name, e.target.checked)}
                  //disabled={this.props.readOnly}
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
                  value={state.patientName}
                  label="Patient's Name"
                  placeholderText="Enter Patient's Name"
                  onChange={onChange}
                  onBlur={onBlur}
                />
              </Col>
              <Col>
                <Input
                  name='patientSpecies'
                  type='text'
                  value={state.patientSpecies}
                  label="Patient's Species"
                  placeholderText="Enter Patient's Species"
                  onChange={onChange}
                  onBlur={onBlur}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Input
                  name='patientGender'
                  type='text'
                  value={state.patientGender}
                  label="Patient's Gender"
                  placeholderText="Enter Patient's Gender"
                  onChange={onChange}
                  onBlur={onBlur}
                />
              </Col>
              <Col>
                <Input
                  name='patientBirthDate'
                  type='text'
                  value={new Date(state.patientBirthDate).toLocaleDateString(
                    'en-US'
                  )}
                  label="Patient's Birth Date"
                  placeholderText="Enter Patient's Birth Date"
                  onChange={onChange}
                  onBlur={onBlur}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <TextArea
                  name='patientNotes'
                  type='text'
                  value={state.patientNotes}
                  label='Patient Notes'
                  placeholderText="Enter Patient's Notes"
                  onChange={onChange}
                  onBlur={onBlur}
                />
              </Col>
            </Row>
          </Container>
        }
      </div>
    );
}

export default Patient;
