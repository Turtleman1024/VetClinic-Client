import React, { useState, useEffect } from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { Stack } from '@fluentui/react/lib/Stack';
import { TextField } from '@fluentui/react/lib/TextField';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { useParams } from "react-router-dom";

import './patient.css';

const Patient = () => {  
  const { patientId } = useParams();
  const [state, setState] = useState(null);
  const genderOptions = [{ key: 'M', text: 'Male' }, { key: 'F', text: 'Female' }];

  useEffect(() => {
    if (patientId) {
      fetch('https://localhost:44368/api/v1/patient/id/' + patientId)
        .then((response) => response.json())
        .then((patient) => setState(patient))
        .catch(err => console.log(err));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (name, value) => {
    setState((prev) => ({
      ...prev,
      [name]: value
    }));
    
    if (name === 'patientGender') onBlur(name, value);
  };
  
  const onBlur = (name, value) => {
    setState((prev) => ({
      ...prev,
      [name]: value
    }));

    patchData(state.patientId, [{ op: 'replace', path: `/${name}`, value: value }]);
  };

  const patchData = async (id, data) => {
    try {
      const res = await fetch('https://localhost:44368/api/v1/patient/' + id, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return res;
    } catch (err) {
      return console.log(err);
    }
  };

  const toggleCheckbox = (name, value) => {
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));

    patchData(state.patientId, [{ op: 'replace', path: `/${name}`, value: value }]);
  };

    return (
      <div className='App' style={{ backgroundColor: '#ffffff' }}>
        {state &&
          <Stack style={{margin: '50px'}}>
              {`Patient Id: ${state.patientId}`}
            <Label>Is Patient Active</Label>
            <Stack horizontal >
                <Checkbox className='checkbox' name='isActive' label='Yes' checked={state.isActive} onChange={(e) => toggleCheckbox(e.target.name, e.target.checked)}/>             
                <Checkbox className='checkbox' name='isActive' label='No' checked={!state.isActive} onChange={(e) => toggleCheckbox(e.target.name, !e.target.checked)}/>
            </Stack>
            <Stack horizontal>
            <TextField
                  className='input-field'
                  name='patientName'
                  type='text'
                  value={state.patientName}
                  label="Patient's Name"
                  placeholderText="Enter Patient's Name"
                  onChange={(e) => onChange(e.target.name, e.target.value)}
                  onBlur={(e) => onBlur(e.target.name, e.target.value)}
                />
                <TextField
                  className='input-field'
                  name='patientSpecies'
                  type='text'
                  value={state.patientSpecies}
                  label="Patient's Species"
                  placeholderText="Enter Patient's Species"
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
                  placeholderText="Enter Patient's Gender"
                  options={genderOptions}
                  onChange={(e, opt) => onChange('patientGender', opt.key)}
                />
                <TextField
                  className='input-field'
                  name='patientBirthDate'
                  type='text'
                  value={new Date(state.patientBirthDate).toLocaleDateString(
                    'en-US'
                  )}
                  label="Patient's Birth Date"
                  placeholderText="Enter Patient's Birth Date"
                  onChange={(e) => onChange(e.target.name, e.target.value)}
                  onBlur={(e) => onBlur(e.target.name, e.target.value)}
                />
            </Stack>
            <TextField
              name='patientNotes'
              type='text'
              value={state.patientNotes}
              label='Patient Notes'
              placeholderText="Enter Patient's Notes"
              onChange={(e) => onChange(e.target.name, e.target.value)}
              onBlur={(e) => onBlur(e.target.name, e.target.value)}
              rows={3}
              multiline
            />
          </Stack>
        }
      </div>
    );
}

export default Patient;
