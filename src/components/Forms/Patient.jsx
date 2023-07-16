import React, { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ActionButton, DefaultButton, Checkbox, Dropdown, DatePicker, Label, Stack, Spinner, SpinnerSize, TextField } from 'office-ui-fabric-react';
import * as actions from '../../actions/patients';
import * as ownerActions from '../../actions/owners';

import './forms.css';

const Patient = () => {
  const { patientId } = useParams();
  const { ownerId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const isMounted = useRef(false);
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
      dispatch(ownerActions.fetchOwnerById(ownerId));
      setIsNewPatient(false);
      isMounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setState({
      ...patient,
      ...(patientId === '0' && { isActive: true }),
      ownerId: ownerId,
    });
  }, [patient, ownerId, patientId]);

  const onChange = (name, value) => {
    setState({ ...state, [name]: value });

    if (name === 'patientGender') onBlur(name, value);
  };

  const onBlur = (name, value) => {
    setState({ ...state, [name]: value });
    if (!isNewPatient && value) {
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
    const isValid = validateNewPatientFields();
    if (isValid) {
      dispatch(actions.createNewPatient(state));
      history.push(`/owner/${ownerId}`);
    }
  };

  const validateNewPatientFields = () => {
    const invalidFields = [];
    Object.keys(state).forEach((key) => {
      if (!state[key] && key !== 'isActive') {
        invalidFields.push(key);
      }
    });

    if (Object.keys(state).length === 7 && invalidFields.length === 0) {
      return true;
    }
    return false;
  };

  const getErrorMessage = (fieldName, errorMessage) => {
    if (isMounted.current && Object.keys(state).some((key) => key === fieldName && state[key])) {
      return '';
    } else {
      return errorMessage;
    }
  };

  return (
    <div>
      <ActionButton iconProps={{ iconName: 'Back' }} text="Back to Owner" onClick={onBackToOwnerClick} />
      {!state ? (
        <Spinner label="Loading Patient Info..." size={SpinnerSize.large} />
      ) : (
        <>
          <Stack className="form-container">
            <Label style={{ fontSize: 'xx-large' }}>{patientId === '0' ? 'New Patient Info' : 'Patient Info'}</Label>
            <Label>Is Patient Active</Label>
            <Stack horizontal>
              <Checkbox className="checkbox" name="isActive" label="Yes" checked={state.isActive} onChange={(e) => toggleCheckbox(e.target.name, e.target.checked)} />
              <Checkbox className="checkbox" name="isActive" label="No" checked={!state.isActive} onChange={(e) => toggleCheckbox(e.target.name, !e.target.checked)} />
            </Stack>
            <Stack horizontal>
              <TextField
                className="input-field"
                name="patientName"
                type="text"
                value={state.patientName || ''}
                label="Patient's Name"
                onChange={(e) => onChange(e.target.name, e.target.value)}
                onBlur={(e) => onBlur(e.target.name, e.target.value)}
                errorMessage={getErrorMessage('patientName', 'Name must be provided')}
                required
              />
              <TextField
                className="input-field"
                name="patientSpecies"
                type="text"
                value={state.patientSpecies || ''}
                label="Patient's Species"
                onChange={(e) => onChange(e.target.name, e.target.value)}
                onBlur={(e) => onBlur(e.target.name, e.target.value)}
                errorMessage={getErrorMessage('patientSpecies', 'Species must be provided')}
                required
              />
            </Stack>
            <Stack horizontal>
              <Dropdown
                className="input-field"
                name="patientGender"
                selectedKey={state.patientGender}
                label="Patient's Gender"
                placeholder="Select a gender"
                options={genderOptions}
                onChange={(e, opt) => onChange('patientGender', opt.key)}
                errorMessage={getErrorMessage('patientGender', 'Gender must be provided')}
                required
              />
              <DatePicker
                className="input-field"
                name="patientBirthDate"
                label="Patient's Birth Date"
                onSelectDate={(date) => onBlur('patientBirthDate', date)}
                highlightCurrentMonth
                highlightSelectedMonth
                showGoToToday={false}
                textField={{
                  value: state.patientBirthDate ? new Date(state.patientBirthDate).toLocaleDateString('en-US') : '',
                }}
                isRequired
              />
            </Stack>
            <Stack horizontal>
              <TextField
                className="patient-notes-field"
                name="patientNotes"
                type="text"
                value={state.patientNotes || ''}
                label="Patient Notes"
                placeholder="Please enter pertinent patient info"
                onChange={(e) => onChange(e.target.name, e.target.value)}
                onBlur={(e) => onBlur(e.target.name, e.target.value)}
                rows={3}
                errorMessage={getErrorMessage('patientNotes', 'Patient Notes must be provided')}
                multiline
                required
              />
            </Stack>
            {patientId === '0' && (
              <Stack horizontal>
                <DefaultButton className="add-pet-btn" text="Add Patient" onClick={onAddPatientClick} />
                <DefaultButton className="cancel-btn" text="Cancel" onClick={onBackToOwnerClick} />
              </Stack>
            )}
          </Stack>{' '}
        </>
      )}
    </div>
  );
};

export default Patient;
