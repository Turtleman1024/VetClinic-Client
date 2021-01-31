import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ActionButton,
  DefaultButton,
  Checkbox,
  Dropdown,
  DatePicker,
  Label,
  Stack,
  Spinner,
  SpinnerSize,
  TextField,
} from 'office-ui-fabric-react';
import * as actions from '../../actions/patients';

import './forms.css';

const Patient = () => {
  const { patientId } = useParams();
  const { ownerId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const patient = useSelector((state) => state.vetClinic.currentPatient);
  const [state, setState] = useState(null);
  const [isNewPatient, setIsNewPatient] = useState(true);
  const genderOptions = [
    { key: 'M', text: 'Male' },
    { key: 'F', text: 'Female' },
  ];

  useEffect(() => {
    if (patientId !== '0') {
      dispatch(actions.fetchPatientById(patientId));
      setIsNewPatient(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setState({ ...patient, ownerId: ownerId });
  }, [patient, ownerId]);

  const onChange = (name, value) => {
    setState({ ...state, [name]: value });

    if (name === 'patientGender') onBlur(name, value);
  };

  const onBlur = (name, value) => {
    setState({ ...state, [name]: value });
    if (!isNewPatient) {
      dispatch(actions.updatePatientById(patientId, name, value));
    }
  };

  const onBackToOwnerClick = () => {
    if (ownerId) {
      history.push(`/owner/${ownerId}`);
    }
  };

  const toggleCheckbox = (name, value) => {
    setState({ ...state, [name]: value });
    if (!isNewPatient) {
      dispatch(actions.updatePatientById(patientId, name, value));
    }
  };

  const onAddPatientClick = () => {
    //TODO: Add Field Validation
    dispatch(actions.createNewPatient(state));
    history.push(`/owner/${ownerId}`);
  };

  return (
    <div>
      <ActionButton
        iconProps={{ iconName: 'Back' }}
        text='Back to Owner'
        onClick={onBackToOwnerClick}
      />
      {!state ? (
        <Spinner label='Loading Patient Info...' size={SpinnerSize.large} />
      ) : (
        <>
          <Stack className='form-container'>
            <Label style={{ fontSize: 'xx-large' }}>
              {patientId === '0' ? 'New Patient Info' : 'Patient Info'}
            </Label>
            <Label>Is Patient Active</Label>
            <Stack horizontal>
              <Checkbox
                className='checkbox'
                name='isActive'
                label='Yes'
                checked={state.isActive}
                onChange={(e) =>
                  toggleCheckbox(e.target.name, e.target.checked)
                }
              />
              <Checkbox
                className='checkbox'
                name='isActive'
                label='No'
                checked={!state.isActive}
                onChange={(e) =>
                  toggleCheckbox(e.target.name, !e.target.checked)
                }
              />
            </Stack>
            <Stack horizontal>
              <TextField
                className='input-field'
                name='patientName'
                type='text'
                value={state.patientName || ''}
                label="Patient's Name"
                onChange={(e) => onChange(e.target.name, e.target.value)}
                onBlur={(e) => onBlur(e.target.name, e.target.value)}
              />
              <TextField
                className='input-field'
                name='patientSpecies'
                type='text'
                value={state.patientSpecies || ''}
                label="Patient's Species"
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
                options={genderOptions}
                onChange={(e, opt) => onChange('patientGender', opt.key)}
              />
              <DatePicker
                className='input-field'
                name='patientBirthDate'
                label="Patient's Birth Date"
                onSelectDate={(date) => onBlur('patientBirthDate', date)}
                highlightCurrentMonth
                highlightSelectedMonth
                showGoToToday={false}
                textField={{
                  value: state.patientBirthDate
                    ? new Date(state.patientBirthDate).toLocaleDateString(
                        'en-US'
                      )
                    : '',
                }}
              />
            </Stack>
            <Stack horizontal>
              <TextField
                className='patient-notes-field'
                name='patientNotes'
                type='text'
                value={state.patientNotes || ''}
                label='Patient Notes'
                onChange={(e) => onChange(e.target.name, e.target.value)}
                onBlur={(e) => onBlur(e.target.name, e.target.value)}
                rows={3}
                multiline
              />
            </Stack>
            {patientId === '0' && (
              <DefaultButton
                className='add-pet-btn'
                text='Add Patient'
                onClick={onAddPatientClick}
              />
            )}
          </Stack>{' '}
        </>
      )}
    </div>
  );
};

export default Patient;
