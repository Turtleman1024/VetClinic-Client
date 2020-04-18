import React, { Component } from 'react';
import OwnerForm from '../Forms/Owner';
import Container from 'react-bootstrap/Container';
import { connect } from 'react-redux';
import { fetchOwners } from '../../actions/owners';
import NavBar from '../NavBar/NavBar';

export class Owner extends Component {
  componentDidMount() {
    this.props.fetchOwners();
  }

  render() {
    return (
      <div>
        <NavBar />
        <Container className='p-3 my-3 border'>
          {this.props.owners.map((owner) => (
            <OwnerForm key={owner.ownerId} owner={owner} />
          ))}
        </Container>
      </div>
    );
  }
}

const maptStateToProps = (state) => {
  return {
    owners: state.vetClinic.owners,
  };
};

export default connect(maptStateToProps, { fetchOwners })(Owner);
