import React, { useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Label } from 'office-ui-fabric-react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../actions/owners';

const OwnerDashboard = () => {
  const dispatch = useDispatch();
  const owners = useSelector((state) => state.vetClinic.owners) || [];

  useEffect(() => {
    dispatch(actions.fetchOwners());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Container className='p-3 my-3 border'>
        <Label style={{ fontSize: 'xx-large' }}>Owners</Label>
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
            {owners.map((owner) => (
              <tr key={owner.ownerId}>
                <td>
                  <Link
                    to={`/owner/${owner.ownerId}`}
                    onClick={() =>
                      dispatch(actions.fetchOwnerById(owner.ownerId))
                    }
                  >
                    {owner.ownerId}
                  </Link>
                </td>
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
};

OwnerDashboard.propTypes = {};

export default OwnerDashboard;
