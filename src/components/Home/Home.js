import React, { useState } from 'react';
import Input from '../Input/Input';
import ToastifyNotification from '../core/ToastifyNotification';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Home = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  const onBlur = (name, value) => {
    setSearchValue(value);
  };

  const onChange = (name, value) => {
    if (!value || !/\S/.test(value)) {
      notify('warning', 'Invalid Input', 'Value must be entered!')
      setSearchResults([]);
    }
    else {
      fetch('https://localhost:44368/api/v1/owner/search-owner/' + value)
        .then((response) =>
          response.json())
        .then((owners) => setSearchResults(owners));
    }
    setSearchValue(value);
  };

  const notify = (type, title, body) => toast[type](<ToastifyNotification title={title} notificationBody={body}/>);

    return (
      <div>
        <h1>Welcome to Home Page</h1>
        <Input
          name='searchForOwner'
          type='text'
          value={searchValue}
          label="Search for Owner's"
          placeholderText="Start typing to find owner"
          onChange={onChange}
          onBlur={onBlur}
        />
        {searchResults.length > 0 &&
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
                      <Link to={`/owner/${owner.ownerId}`}>{owner.ownerId}</Link>
                    </td>
                    <td>{owner.ownerFirstName}</td>
                    <td>{owner.ownerLastName}</td>
                    <td>{owner.ownerPets.length > 0 ? (owner.ownerPets.map((x) => (<div key={x.patientId}>{<Link to={`/patient/${x.patientId}`}>{x.patientName}</Link>}</div>))) : ('NF') }</td>
                    <td>{owner.ownerPhone}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        }
        <ToastContainer/>
      </div>
    );
}

export default Home;
