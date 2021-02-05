import React, { useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Label } from 'office-ui-fabric-react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../actions/patients';

const ActivePatientDashboard = () => {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.vetClinic.patients) || [];

  useEffect(() => {
    dispatch(actions.fetchActivePatients());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Container className='p-3 my-3 border'>
        <Label style={{ fontSize: 'xx-large' }}>Active Patients</Label>
        <Table striped bordered hover variant='light'>
          <thead style={{ backgroundColor: '#0984e3' }}>
            <tr>
              <th>Id</th>
              <th>Patient Name</th>
              <th>Patient Species</th>
              <th>Patient Gender</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.patientId}>
                <td>
                  <Link
                    to={`/owner/${patient.ownerId}/patient/${patient.patientId}`}
                  >
                    {patient.patientId}
                  </Link>
                </td>
                <td>{patient.patientName}</td>
                <td>{patient.patientSpecies}</td>
                <td>{patient.patientGender}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

ActivePatientDashboard.propTypes = {};

export default ActivePatientDashboard;
