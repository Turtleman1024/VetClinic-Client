import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchActivePatients } from '../../actions/patients';
import NavBar from '../NavBar/NavBar';
import PropTypes from 'prop-types';
import { Container, Table } from 'react-bootstrap';

export class ActivePatientDashboard extends Component {
  componentDidMount() {
    this.props.fetchActivePatients();
  }

  render() {
    return (
      <div>
        <NavBar />
        <Container className='p-3 my-3 border'>
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
              {this.props.patients.map((patient) => (
                <tr key={patient.patientId}>
                  <td>{patient.patientId}</td>
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
  }
}

ActivePatientDashboard.propTypes = {
  fetchActivePatients: PropTypes.func.isRequired,
  patients: PropTypes.array.isRequired,
};

const maptStateToProps = (state) => {
  return {
    patients: state.vetClinic.patients,
  };
};

export default connect(maptStateToProps, { fetchActivePatients })(
  ActivePatientDashboard
);
