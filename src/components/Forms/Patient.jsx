import React, { useState, useEffect } from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { Stack } from '@fluentui/react/lib/Stack';
import { TextField } from '@fluentui/react/lib/TextField';
import { useParams } from "react-router-dom";

const Patient = () => {  
  const { patientId } = useParams();
  const [state, setState] = useState(null);

  useEffect(() => {
    if (patientId) {
      fetch('https://localhost:44368/api/v1/patient/id/' + patientId)
        .then((response) => response.json())
        .then((patient) => setState(patient))
        .catch(err => console.log(err));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const onBlur = (name, value) => {
    setState((prev) => ({
      ...prev,
      [name]: value
    }));

    patchData(state.patientId, [{ op: 'replace', path: `/${name}`, value: value }]);

  };

  const patchData = (id, data) => {
    return fetch('https://localhost:44368/api/v1/patient/' + id, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res;
    }).catch(err => console.log(err));
  };

  const onChange = (name, value) => {
    setState((prev) => ({
      ...prev,
      [name]: value
    }));
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
                <Checkbox name='isActive' label='Yes' checked={state.isActive} onChange={(e) => toggleCheckbox(e.target.name, e.target.checked)}/>             
                <Checkbox name='isActive' label='No' checked={!state.isActive} onChange={(e) => toggleCheckbox(e.target.name, !e.target.checked)}/>
            </Stack>
            <Stack horizontal>
                <TextField
                  name='patientName'
                  type='text'
                  value={state.patientName}
                  label="Patient's Name"
                  placeholderText="Enter Patient's Name"
                  onChange={(e) => onChange(e.target.name, e.target.value)}
                  onBlur={(e) => onBlur(e.target.name, e.target.value)}
                />
                <TextField
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
                <TextField
                  name='patientGender'
                  type='text'
                  value={state.patientGender}
                  label="Patient's Gender"
                  placeholderText="Enter Patient's Gender"
                  onChange={(e) => onChange(e.target.name, e.target.value)}
                  onBlur={(e) => onBlur(e.target.name, e.target.value)}
                />
                <TextField
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
