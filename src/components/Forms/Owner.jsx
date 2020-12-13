import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Input from '../Input/Input';
import Patient from './Patient';
import { useParams } from "react-router-dom";

const Owner = () => {
  const { ownerId } = useParams();
  const [state, setState] = useState(null);

  useEffect(() => {
    if (ownerId) {
      fetch('https://localhost:44368/api/v1/owner/id/' + + ownerId)
        .then((response) => response.json())
        .then((owner) => setState(owner))
        .catch(err => console.log(err));
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

    return (
      <div>
        {state &&
          <Container
            className='p-3 my-3 border'
            style={{ backgroundColor: '#3498db' }}
          >
            <Row>
              <Col>
                <Input
                  name='ownerFirstName'
                  type='text'
                  value={state.ownerFirstName}
                  label="Owner's First Name"
                  placeholderText="Enter Owner's First Name"
                  onChange={onChange}
                  onBlur={onBlur}
                />
              </Col>
              <Col>
                <Input
                  name='ownerLastName'
                  type='text'
                  value={state.ownerLastName}
                  label="Owner's Last Name"
                  placeholderText="Enter Owner's Last Name"
                  onChange={onChange}
                  onBlur={onBlur}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Input
                  name='ownerAddress'
                  type='text'
                  value={state.ownerAddress}
                  label="Owner's Address"
                  placeholderText="Enter Owner's Address"
                  onChange={onChange}
                  onBlur={onBlur}
                />                
              </Col>
            </Row>
            <Row>
              <Col>
                <Input
                  name='ownerCity'
                  type='text'
                  value={state.ownerCity}
                  label="Owner's City"
                  placeholderText="Enter Owner's City"
                  onChange={onChange}
                  onBlur={onBlur}
                />
              </Col>
              <Col>
                <Input
                  name='ownerZip'
                  type='number'
                  value={state.ownerZip}
                  label="Owner's Zip"
                  placeholderText="Enter Owner's Zip"
                  onChange={onChange}
                  onBlur={onBlur}
                />
              </Col>
            </Row>
            {state.ownerPets.map((patient) => (
                <Patient
                  key={patient.patientId}
                  patient={patient}
                  readOnly={false}
                />
            ))}
          </Container>
        }
      </div>
    );
}

export default Owner;
