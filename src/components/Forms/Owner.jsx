import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  ActionButton,
  DefaultButton,
  Label,
  Stack,
  Spinner,
  SpinnerSize,
  TextField,
} from 'office-ui-fabric-react';
import * as actions from '../../actions/owners';

import './forms.css';

const Owner = () => {
  const { ownerId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const owner = useSelector((state) => state.vetClinic.currentOwner);
  const [state, setState] = useState(null);

  useEffect(() => {
    if (!owner) {
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

  return (
    <div>
      <ActionButton
        iconProps={{ iconName: 'Back' }}
        text='Back to Home'
        onClick={() => history.push('/')}
      />
      {!state ? (
        <Spinner label='Loading Owner Info...' size={SpinnerSize.large} />
      ) : (
        <>
          <Stack className='form-container'>
            <Label style={{ fontSize: 'xx-large' }}>Owner Info</Label>
            <Stack horizontal>
              <TextField
                className='input-field'
                name='ownerFirstName'
                type='text'
                value={state.ownerFirstName || ''}
                label="Owner's First Name"
                onChange={(e) => onChange(e.target.name, e.target.value)}
                onBlur={(e) => onBlur(e.target.name, e.target.value)}
              />
              <TextField
                className='input-field'
                name='ownerLastName'
                type='text'
                value={state.ownerLastName || ''}
                label="Owner's Last Name"
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
                onChange={(e) => onChange(e.target.name, e.target.value)}
                onBlur={(e) => onBlur(e.target.name, e.target.value)}
              />
              <TextField
                className='input-field'
                name='ownerZip'
                type='number'
                value={state.ownerZip || ''}
                label="Owner's Zip"
                onChange={(e) => onChange(e.target.name, e.target.value)}
                onBlur={(e) => onBlur(e.target.name, e.target.value)}
              />
            </Stack>
            <table>
              <thead>
                <tr>
                  <th>
                    <Label>Owner's Pets</Label>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {state.ownerPets && state.ownerPets.length > 0 ? (
                  state.ownerPets.map((x) => (
                    <tr key={x.patientId}>
                      <td>
                        <Link
                          key={x.patientId}
                          to={`/owner/${x.ownerId}/patient/${x.patientId}`}
                        >
                          {x.patientName}
                        </Link>
                      </td>
                      <td>
                        <ActionButton
                          iconProps={{ iconName: 'trash' }}
                          onClick={() =>
                            dispatch(actions.deleteOwnerPet(x.patientId))
                          }
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>No Pets Found</td>
                  </tr>
                )}
              </tbody>
            </table>
            <DefaultButton
              className='add-pet-btn'
              href={`/owner/${owner.ownerId}/patient/0`}
              text='Add New Pet'
            />
          </Stack>
        </>
      )}
    </div>
  );
};

export default Owner;
