import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { connect } from 'react-redux';
import Patient from '../Forms/Patient';
import NavBar from '../NavBar/NavBar';
import PropTypes from 'prop-types';
import { fetchActivePatients } from '../../actions/patients';

export class ActivePatients extends Component {
  componentDidMount() {
    this.props.fetchActivePatients();
  }

  onBlur = (name, value) => {
    this.setState({ [name]: value });
  };

  onChange = (name, value) => {
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <NavBar />
        <Container
          className='p-3 my-3 border'
          style={{ backgroundColor: '#f0f8ff' }}
        >
          {this.props.patients.map((patient) => (
            <Patient
              key={patient.patientId}
              patient={patient}
              readOnly={false}
            />
          ))}
        </Container>
      </div>
    );
  }
}

ActivePatients.propTypes = {
  fetchActivePatients: PropTypes.func.isRequired,
  patients: PropTypes.array.isRequired,
};

const maptStateToProps = (state) => {
  return {
    patients: state.vetClinic.patients,
  };
};

export default connect(maptStateToProps, { fetchActivePatients })(
  ActivePatients
);
