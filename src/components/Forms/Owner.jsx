import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ActivityItem, Label, Stack, TextField } from 'office-ui-fabric-react';

import './forms.css';

const Owner = () => {
  const { ownerId } = useParams();
  const [state, setState] = useState(null);

  useEffect(() => {
    if (ownerId) {
      fetch('https://localhost:44368/api/v1/owner/id/' + +ownerId)
        .then((response) => response.json())
        .then((owner) => setState(owner))
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const patchData = async (id, data) => {
    try {
      const res = await fetch('https://localhost:44368/api/v1/owner/' + id, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return res;
    } catch (err) {
      return console.log(err);
    }
  };

  const onBlur = (name, value) => {
    setState({ ...state, [name]: value });

    patchData(state.ownerId, [
      { op: 'replace', path: `/${name}`, value: value },
    ]);
  };

  const onChange = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const createActivityItems = () => {
    let activityItems = [];
    if (state.ownerPets.length > 0) {
      state.ownerPets.map((x) =>
        activityItems.push({
          key: x.patientId,
          activityDescription: [
            <Link key={x.patientId} to={`/patient/${x.patientId}`}>
              {x.patientName}
            </Link>,
          ],
        })
      );
      return activityItems;
    }

    return activityItems;
  };

  return (
    <div>
      {state && (
        <Stack style={{ margin: '50px' }}>
          <Stack horizontal>
            <TextField
              className='input-field'
              name='ownerFirstName'
              type='text'
              value={state.ownerFirstName}
              label="Owner's First Name"
              placeholderText="Enter Owner's First Name"
              onChange={(e) => onChange(e.target.name, e.target.value)}
              onBlur={(e) => onBlur(e.target.name, e.target.value)}
            />
            <TextField
              className='input-field'
              name='ownerLastName'
              type='text'
              value={state.ownerLastName}
              label="Owner's Last Name"
              placeholderText="Enter Owner's Last Name"
              onChange={(e) => onChange(e.target.name, e.target.value)}
              onBlur={(e) => onBlur(e.target.name, e.target.value)}
            />
          </Stack>
          <Stack horizontal>
            <TextField
              className='address-field'
              name='ownerAddress'
              type='text'
              value={state.ownerAddress}
              label="Owner's Address"
              placeholderText="Enter Owner's Address"
              onChange={(e) => onChange(e.target.name, e.target.value)}
              onBlur={(e) => onBlur(e.target.name, e.target.value)}
            />
          </Stack>
          <Stack horizontal>
            <TextField
              className='input-field'
              name='ownerCity'
              type='text'
              value={state.ownerCity}
              label="Owner's City"
              placeholderText="Enter Owner's City"
              onChange={(e) => onChange(e.target.name, e.target.value)}
              onBlur={(e) => onBlur(e.target.name, e.target.value)}
            />
            <TextField
              className='input-field'
              name='ownerZip'
              type='number'
              value={state.ownerZip}
              label="Owner's Zip"
              placeholderText="Enter Owner's Zip"
              onChange={(e) => onChange(e.target.name, e.target.value)}
              onBlur={(e) => onBlur(e.target.name, e.target.value)}
            />
          </Stack>
          <Label>Owner's Pets</Label>
          {createActivityItems().map((items) => (
            <ActivityItem key={items.key} {...items} />
          ))}
        </Stack>
      )}
    </div>
  );
};

export default Owner;
