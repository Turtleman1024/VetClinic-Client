import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ActivityItem, Label, Stack, TextField } from 'office-ui-fabric-react';
import * as actions from '../../actions/owners';

import './forms.css';

const Owner = () => {
  const { ownerId } = useParams();
  const dispatch = useDispatch();
  const owner = useSelector((state) => state.vetClinic.currentOwner) || {};
  const [state, setState] = useState(owner);

  useEffect(() => {
    if (ownerId) {
      dispatch(actions.fetchOwnerById(ownerId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setState(owner);
  }, [owner]);

  const onBlur = (name, value) => {
    setState({ ...state, [name]: value });

    dispatch(actions.updateOwnerById(ownerId, name, value));
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
        <Stack className='form-container'>
          <Label style={{ fontSize: 'xx-large' }}>Owner Info</Label>
          <Stack horizontal>
            <TextField
              className='input-field'
              name='ownerFirstName'
              type='text'
              value={state.ownerFirstName || ''}
              label="Owner's First Name"
              placeholder="Enter Owner's First Name"
              onChange={(e) => onChange(e.target.name, e.target.value)}
              onBlur={(e) => onBlur(e.target.name, e.target.value)}
            />
            <TextField
              className='input-field'
              name='ownerLastName'
              type='text'
              value={state.ownerLastName || ''}
              label="Owner's Last Name"
              placeholder="Enter Owner's Last Name"
              onChange={(e) => onChange(e.target.name, e.target.value)}
              onBlur={(e) => onBlur(e.target.name, e.target.value)}
            />
          </Stack>
          <Stack horizontal>
            <TextField
              className='address-field'
              name='ownerAddress'
              type='text'
              value={state.ownerAddress || ''}
              label="Owner's Address"
              placeholder="Enter Owner's Address"
              onChange={(e) => onChange(e.target.name, e.target.value)}
              onBlur={(e) => onBlur(e.target.name, e.target.value)}
            />
          </Stack>
          <Stack horizontal>
            <TextField
              className='input-field'
              name='ownerCity'
              type='text'
              value={state.ownerCity || ''}
              label="Owner's City"
              placeholder="Enter Owner's City"
              onChange={(e) => onChange(e.target.name, e.target.value)}
              onBlur={(e) => onBlur(e.target.name, e.target.value)}
            />
            <TextField
              className='input-field'
              name='ownerZip'
              type='number'
              value={state.ownerZip || ''}
              label="Owner's Zip"
              placeholder="Enter Owner's Zip"
              onChange={(e) => onChange(e.target.name, e.target.value)}
              onBlur={(e) => onBlur(e.target.name, e.target.value)}
            />
          </Stack>
          <Label>Owner's Pets</Label>
          {state.ownerPets && state.ownerPets.length > 0 ? (
            <>
              {createActivityItems().map((items) => (
                <ActivityItem key={items.key} {...items} />
              ))}
            </>
          ) : (
            <div>
              <strong>No Pets Found</strong>
            </div>
          )}
        </Stack>
      )}
    </div>
  );
};

export default Owner;
