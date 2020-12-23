import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ActionButton,
  Checkbox,
  Dropdown,
  Label,
  Stack,
  TextField,
} from 'office-ui-fabric-react';
import * as actions from '../../actions/patients';

import './forms.css';

const Patient = () => {
  const { patientId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const patient = useSelector((state) => state.vetClinic.currentPatient) || {};
  const [state, setState] = useState(patient);
  const genderOptions = [
    { key: 'M', text: 'Male' },
    { key: 'F', text: 'Female' },
  ];

  useEffect(() => {
    if (patientId) {
      dispatch(actions.fetchPatientById(patientId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setState(patient);
  }, [patient]);

  const onChange = (name, value) => {
    setState({ ...state, [name]: value });

    if (name === 'patientGender') onBlur(name, value);
  };

  const onBlur = (name, value) => {
    setState({ ...state, [name]: value });

    dispatch(actions.updatePatientById(patientId, name, value));
  };

  const onBackToOwnerClick = () => {
    if (state.ownerId) {
      history.push(`/owner/${state.ownerId}`);
    }
  };

  const toggleCheckbox = (name, value) => {
    setState({ ...state, [name]: value });

    dispatch(actions.updatePatientById(patientId, name, value));
  };

  return (
    <div style={{ backgroundColor: '#ffffff' }}>
      <ActionButton
        iconProps={{ iconName: 'Back' }}
        text='Back to Owner'
        onClick={onBackToOwnerClick}
      />
      {state && (
        <Stack className='form-container'>
          <Label style={{ fontSize: 'xx-large' }}>Patient Info</Label>
          {`Patient Id: ${state.patientId}`}
          <Label>Is Patient Active</Label>
          <Stack horizontal>
            <Checkbox
              className='checkbox'
              name='isActive'
              label='Yes'
              checked={state.isActive}
              onChange={(e) => toggleCheckbox(e.target.name, e.target.checked)}
            />
            <Checkbox
              className='checkbox'
              name='isActive'
              label='No'
              checked={!state.isActive}
              onChange={(e) => toggleCheckbox(e.target.name, !e.target.checked)}
            />
          </Stack>
          <Stack horizontal>
            <TextField
              className='input-field'
              name='patientName'
              type='text'
              value={state.patientName || ''}
              label="Patient's Name"
              placeholder="Enter Patient's Name"
              onChange={(e) => onChange(e.target.name, e.target.value)}
              onBlur={(e) => onBlur(e.target.name, e.target.value)}
            />
            <TextField
              className='input-field'
              name='patientSpecies'
              type='text'
              value={state.patientSpecies || ''}
              label="Patient's Species"
              placeholder="Enter Patient's Species"
              onChange={(e) => onChange(e.target.name, e.target.value)}
              onBlur={(e) => onBlur(e.target.name, e.target.value)}
            />
          </Stack>
          <Stack horizontal>
            <Dropdown
              className='input-field'
              name='patientGender'
              selectedKey={state.patientGender}
              label="Patient's Gender"
              placeholder="Enter Patient's Gender"
              options={genderOptions}
              onChange={(e, opt) => onChange('patientGender', opt.key)}
            />
            <TextField
              className='input-field'
              name='patientBirthDate'
              type='text'
              value={
                new Date(state.patientBirthDate).toLocaleDateString('en-US') ||
                ''
              }
              label="Patient's Birth Date"
              placeholder="Enter Patient's Birth Date"
              onChange={(e) => onChange(e.target.name, e.target.value)}
              onBlur={(e) => onBlur(e.target.name, e.target.value)}
            />
          </Stack>
          <TextField
            name='patientNotes'
            type='text'
            value={state.patientNotes || ''}
            label='Patient Notes'
            placeholder="Enter Patient's Notes"
            onChange={(e) => onChange(e.target.name, e.target.value)}
            onBlur={(e) => onBlur(e.target.name, e.target.value)}
            rows={3}
            multiline
          />
        </Stack>
      )}
    </div>
  );
};

export default Patient;
