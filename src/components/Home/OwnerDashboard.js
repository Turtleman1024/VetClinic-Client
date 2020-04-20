import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOwners } from '../../actions/owners';
import NavBar from '../NavBar/NavBar';
import PropTypes from 'prop-types';
import { Container, Table } from 'react-bootstrap';

export class OwnerDashboard extends Component {
  componentDidMount() {
    this.props.fetchOwners();
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
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {this.props.owners.map((owner) => (
                <tr key={owner.ownerId}>
                  <td>{owner.ownerId}</td>
                  <td>{owner.ownerFirstName}</td>
                  <td>{owner.ownerLastName}</td>
                  <td>{owner.ownerPhone}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

OwnerDashboard.propTypes = {
  fetchOwners: PropTypes.func.isRequired,
  owners: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    owners: state.vetClinic.owners,
  };
};

export default connect(mapStateToProps, { fetchOwners })(OwnerDashboard);