import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ToastifyNotification from '../core/ToastifyNotification';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DefaultButton, TextField } from 'office-ui-fabric-react';
import * as actions from '../../actions/owners';

const Home = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const onBlur = (name, value) => {
    setSearchValue(value);
  };

  const onChange = (name, value) => {
    if (!value || !/\S/.test(value)) {
      notify('warning', 'Invalid Input', 'Value must be entered!');
      setSearchResults([]);
    } else {
      fetch('https://localhost:44368/api/v1/owner/search-owner/' + value)
        .then((response) => response.json())
        .then((owners) => setSearchResults(owners))
        .catch((err) => console.log(err));
    }
    setSearchValue(value);
  };

  const notify = (type, title, body) => {
    toast[type](<ToastifyNotification title={title} notificationBody={body} />);
  };

  return (
    <div>
      <h1 className='home-title'>Welcome to Home Page</h1>
      <DefaultButton className="add-owner-btn" href={`/owner/0`} text="Create New Owner" />
      <TextField
        className='search-owner'
        name='searchForOwner'
        type='text'
        value={searchValue}
        label="Search for Owner's"
        placeholder='Search by first name, last name, or phone number '
        onChange={(e) => onChange(e.target.name, e.target.value)}
        onBlur={(e) => onBlur(e.target.name, e.target.value)}
      />
      {searchResults.length > 0 && (
        <Container className='p-3 my-3 border'>
          <Table striped bordered hover variant='light'>
            <thead style={{ backgroundColor: '#0984e3' }}>
              <tr style={{ backgroundColor: '#ffffff' }}>
                <th>Owners</th>
              </tr>
              <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Pets Names</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((owner) => (
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
                  <td>
                    {owner.ownerPets.length > 0
                      ? owner.ownerPets.map((x) => (
                          <div key={x.patientId}>
                            {
                              <Link
                                to={`/owner/${x.ownerId}/patient/${x.patientId}`}
                              >
                                {x.patientName}
                              </Link>
                            }
                          </div>
                        ))
                      : 'NF'}
                  </td>
                  <td>{owner.ownerPhone}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      )}
    </div>
  );
};

export default Home;
