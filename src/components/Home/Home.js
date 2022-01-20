import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ToastifyNotification from '../core/ToastifyNotification';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ActionButton, TextField, ComboBox } from 'office-ui-fabric-react';
import * as actions from '../../actions/owners';

const Home = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [propsOptions, setPropsOptions] = useState([
    { id: 500, text: 'Building' },
    { id: 550, text: 'Electronic' },
  ]);
  const [optionsSelected, setOptionsSelected] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions([
      ...propsOptions.map((x) => ({ key: x.id, text: `${x.id} - ${x.text}` })),
    ]);
  }, [propsOptions]);

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

  const onComboxChange = (opt) => {
    setOptionsSelected([...optionsSelected, opt.key]);
    setOptions([...options.filter((x) => x.key !== opt.key)]);
  };

  const onAssetTypeChoiseDelete = (key) => {
    setOptionsSelected(optionsSelected.filter((x) => x !== key));
    const temp = propsOptions.find((x) => x.id === key);
    setOptions(
      [...options, { key: key, text: `${temp.id} - ${temp.text}` }].sort(
        (a, b) => a.key - b.key
      )
    );
  };

  return (
    <div>
      <h1 className='home-title'>Welcome to Home Page</h1>
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
      <ComboBox
        className='combo-box-container'
        placeholder='Search for Asset'
        label='Asset Type'
        autoComplete='on'
        allowFreeform={true}
        options={options}
        onChange={(e, opt) => onComboxChange(opt)}
      />
      {optionsSelected.length > 0 &&
        optionsSelected.map((x) => (
          <div>
            {x}
            <ActionButton
              iconProps={{ iconName: 'Delete' }}
              onClick={() => onAssetTypeChoiseDelete(x)}
            />
          </div>
        ))}
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
