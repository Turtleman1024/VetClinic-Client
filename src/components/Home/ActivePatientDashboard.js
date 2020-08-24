import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchActivePatients } from '../../actions/patients';
import PropTypes from 'prop-types';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class ActivePatientDashboard extends Component {
  componentDidMount() {
    this.props.fetchActivePatients();
  }

  render() {
    return (
      <div>
        <Container className='p-3 my-3 border'>
          <Table striped bordered hover variant='light'>
            <thead style={{ backgroundColor: '#0984e3' }}>
              <tr style={{ backgroundColor: '#ffffff' }}>
                <th>
                  {this.props.isHomePage
                    ? 'Patients being cared for'
                    : 'Patients'}
                </th>
              </tr>
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
                  <td>
                    <Link to={'/patient/' + patient.patientId}>
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
  }
}

ActivePatientDashboard.propTypes = {
  fetchActivePatients: PropTypes.func.isRequired,
  patients: PropTypes.array.isRequired,
  isHomePage: PropTypes.bool,
};

const maptStateToProps = (state) => {
  return {
    patients: state.vetClinic.patients,
  };
};

export default connect(maptStateToProps, { fetchActivePatients })(
  ActivePatientDashboard
);
