import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormGroup, FormControl, FormLabel, InputGroup } from 'react-bootstrap';

export class TextArea extends PureComponent {
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
        as='textarea'
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
            <InputGroup.Addon>{this.props.addon}</InputGroup.Addon>
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
TextArea.propType = {
  name: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
  additionalProps: PropTypes.object,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  type: PropTypes.string,
  label: PropTypes.node,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  addon: PropTypes.node,
};

//Default PropTypes
TextArea.defaultProps = {
  label: undefined,
  placeholder: '',
  readOnly: false,
  addon: null,
  additionalProps: {},
  onChange: null,
  onBlur: null,
};

export default TextArea;
