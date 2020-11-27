import React, { useState } from 'react';
import Input from '../Input/Input';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  const onBlur = (name, value) => {
    setSearchValue(value);
  };

  const onChange = (name, value) => {
    setSearchValue(value);
    if (value) {
      fetch('https://localhost:44368/api/v1/owner/search-owner/' + value)
        .then((response) =>
          response.json())
        .then((owners) => setSearchResults(owners));
    }
    else {
      setSearchResults([]);
    }
  };

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
                    <td>{owner.ownerPets.length > 0 ? (owner.ownerPets.map((x) => (<div key={x.patientId}>{<Link to={`/patient/${x.id}`}>{x.patientName}</Link>}</div>))) : ('NF') }</td>
                    <td>{owner.ownerPhone}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        }
      </div>
    );
}

export default Home;
