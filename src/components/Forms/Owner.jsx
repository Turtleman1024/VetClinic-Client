import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ActionButton, DefaultButton, Label, Stack, Spinner, SpinnerSize, TextField } from 'office-ui-fabric-react';
import * as actions from '../../actions/owners';

import './forms.css';

const Owner = () => {
  const { ownerId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const owner = useSelector((state) => state.vetClinic.currentOwner);
  const [isNewOwner, setIsNewOwner] = useState(false);
  const [state, setState] = useState(null);

  useEffect(() => {
    if (ownerId !== "0") {
      dispatch(actions.fetchOwnerById(ownerId));
      setIsNewOwner(false);
    } else {
      setIsNewOwner(true);
    }
  }, []);

  useEffect(() => {
    setState({
      ...owner,
      ...(ownerId === '0' && { isAvtive: true})
    });
  }, [owner]);

  const onBlur = (name, value) => {
    let newValue = value;
    if (name === 'ownerPhone') {
      newValue = cleanPhoneNumber(value);
    }

    setState({ ...state, [name]: newValue });

    if (!isNewOwner && newValue) {
      dispatch(actions.updateOwnerById(ownerId, name, newValue));
    }
  };

  const onChange = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const onCreateOwnerClick = () => {
    dispatch(actions.createOwner(state, (id) => history.push(`/owner/${id}`)));
    setIsNewOwner(false);
  }

  const cleanPhoneNumber = (phoneNumber) => {
    return ('' + phoneNumber).replace(/\D/g, '').slice(0, 10);
  }

  const onPhoneNumberChange = (name, value) => {
    // Remove all non-digit characters
    let cleaned = cleanPhoneNumber(value);
    
    setState({ ...state, [name]: cleaned });
  };

  const formatPhoneNumber = (value) => {
    // Format the number as (555)-555-5555
    let match = value.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]})-${match[2]}-${match[3]}`;
    }

    return value;
  };

  return (
    <div>
      <ActionButton
        iconProps={{ iconName: "Back" }}
        text="Back to Home"
        onClick={() => history.push("/")}
      />
      {!state ? (
        <Spinner label="Loading Owner Info..." size={SpinnerSize.large} />
      ) : (
        <>
          <Stack className="form-container">
            <Label style={{ fontSize: "xx-large" }}>Owner Info</Label>
            <Stack horizontal>
              <TextField
                className="input-field"
                name="ownerFirstName"
                type="text"
                value={state.ownerFirstName || ""}
                label="Owner's First Name"
                onChange={(e) => onChange(e.target.name, e.target.value)}
                onBlur={(e) => onBlur(e.target.name, e.target.value)}
              />
              <TextField
                className="input-field"
                name="ownerLastName"
                type="text"
                value={state.ownerLastName || ""}
                label="Owner's Last Name"
                onChange={(e) => onChange(e.target.name, e.target.value)}
                onBlur={(e) => onBlur(e.target.name, e.target.value)}
              />
              <TextField
                className="input-field"
                name="ownerPhone"
                type="text"
                value={formatPhoneNumber(state.ownerPhone || "")}
                label="Owner's Phone Number"
                onChange={(e) => onPhoneNumberChange(e.target.name, e.target.value)}
                onBlur={(e) => onBlur(e.target.name, e.target.value)}
              />
            </Stack>
            <Stack horizontal>
              <TextField
                className="address-field"
                name="ownerAddress"
                type="text"
                value={state.ownerAddress || ""}
                label="Owner's Address"
                onChange={(e) => onChange(e.target.name, e.target.value)}
                onBlur={(e) => onBlur(e.target.name, e.target.value)}
              />
            </Stack>
            <Stack horizontal>
              <TextField
                className="input-field"
                name="ownerCity"
                type="text"
                value={state.ownerCity || ""}
                label="Owner's City"
                onChange={(e) => onChange(e.target.name, e.target.value)}
                onBlur={(e) => onBlur(e.target.name, e.target.value)}
              />
              <TextField
                className="input-field"
                name="ownerState"
                type="text"
                value={state.ownerState || ""}
                label="Owner's State"
                onChange={(e) => onChange(e.target.name, e.target.value.slice(0, 2))}
                onBlur={(e) => onBlur(e.target.name, e.target.value)}
              />
              <TextField
                className="input-field"
                name="ownerZip"
                type="number"
                value={state.ownerZip || ""}
                label="Owner's Zip"
                onChange={(e) => onChange(e.target.name, e.target.value)}
                onBlur={(e) => onBlur(e.target.name, e.target.value)}
              />
            </Stack>
            {!isNewOwner && (
              <>
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
                              iconProps={{ iconName: "trash" }}
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
                  className="add-btn"
                  href={`/owner/${state.ownerId}/patient/0`}
                  text="Add New Pet"
                />
              </>
            )}
            {isNewOwner &&
            <DefaultButton
              className="add-btn"
              text="Create Owner"
              onClick={onCreateOwnerClick}
            />}
          </Stack>
        </>
      )}
    </div>
  );
};

export default Owner;
