import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormGroup, FormControl, FormLabel, InputGroup } from 'react-bootstrap';

export class Input extends PureComponent {
  onLocalChange = (e) => {
    if (this.props.onChange) {
      this.props.onChange(this.props.name, e.target.value);
    }
  };

  onLocalBlur = (e) => {
    if (this.props.onBlur) {
      this.props.onBlur(this.props.name, e.target.value);
    }
  };

  render() {
    const inputControl = (
      <FormControl
        type={this.props.type}
        name={this.props.name}
        value={this.props.value}
        onChange={this.onLocalChange}
        onBlur={this.onLocalBlur}
        placeholder={this.props.placeholderText}
        disabled={this.props.readOnly}
        autoComplete='off'
        {...this.props.additionalProps}
      />
    );
    return (
      <FormGroup>
        {this.props.label && (
          <React.Fragment>
            <FormLabel>{this.props.label}</FormLabel>
          </React.Fragment>
        )}
        {this.props.addon ? (
          <InputGroup className='mb-3'>
            <InputGroup.Prepend>
              <InputGroup.Text>
                {this.props.addon}
              </InputGroup.Text>
            </InputGroup.Prepend>
            {inputControl}
          </InputGroup>
        ) : (
          inputControl
        )}
        <FormControl.Feedback />
      </FormGroup>
    );
  }
}

//PropTypes
Input.propType = {
  name: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
  additionalProps: PropTypes.object,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  type: PropTypes.string,
  label: PropTypes.node,
  placeholderText: PropTypes.string,
  readOnly: PropTypes.bool,
  addon: PropTypes.node,
};

//Default PropTypes
Input.defaultProps = {
  label: undefined,
  placeholderText: undefined,
  readOnly: false,
  addon: null,
  additionalProps: {},
  onChange: null,
  onBlur: null,
};

export default Input;
