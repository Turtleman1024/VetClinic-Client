import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ActionButton,
  DefaultButton,
  Checkbox,
  Dropdown,
  DatePicker,
  Icon,
  Label,
  Stack,
  Spinner,
  SpinnerSize,
  TextField,
} from 'office-ui-fabric-react';
import { useDropzone } from 'react-dropzone';
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
  const [attachedFiles, setAttachedFiles] = useState([]);
  const genderOptions = [
    { key: 'M', text: 'Male' },
    { key: 'F', text: 'Female' },
  ];

  const onDrop = useCallback((acceptedFiles) => {
    debugger;
    setAttachedFiles(acceptedFiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(attachedFiles);

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    onDrop,
  });

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

  const files = acceptedFiles.map((file) => (
    <li key={file.path} style={{ listStyleType: 'none' }}>
      {file.path}
    </li>
  ));

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
            <Stack>
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
              <div
                style={{
                  border: '1px dashed black',
                  width: '600px',
                  height: '150px',
                  textAlign: 'center',
                  paddingTop: '15px',
                  marginTop: '20px',
                }}
                {...getRootProps({ className: 'dropzone' })}
              >
                <Stack>
                  <input {...getInputProps()} />
                  <Icon iconName='cloud' />
                  <Icon iconName='upload' />
                  <p>Drag 'n' drop some files to attach here</p>
                  <a href='#0' onClick={open}>
                    Browse for file to attach...
                  </a>
                </Stack>
              </div>
              <aside>
                <ul>{files}</ul>
              </aside>
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
