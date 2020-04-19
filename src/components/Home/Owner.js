import React, { Component } from 'react';
import OwnerForm from '../Forms/Owner';
import Container from 'react-bootstrap/Container';
import { connect } from 'react-redux';
import { fetchOwners } from '../../actions/owners';
import NavBar from '../NavBar/NavBar';
import PropTypes from 'prop-types';

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

Owner.propTypes = {
  fetchOwners: PropTypes.func.isRequired,
  owners: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    owners: state.vetClinic.owners,
  };
};

export default connect(mapStateToProps, { fetchOwners })(Owner);
