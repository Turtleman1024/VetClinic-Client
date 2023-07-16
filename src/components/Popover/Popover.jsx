import React, { Component } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import PropTypes from 'prop-types';

export class Popover extends Component {
  tooltip = (hoverText) => (
    <Tooltip id='asset-dialog-info-tooltip' className='info-tooltip'>
      {hoverText}
    </Tooltip>
  );

  render() {
    return (
      <div>
        <React.Fragment>
          {`${this.props.label}`}
          <OverlayTrigger
            placement={this.props.placement}
            overlay={this.tooltip(this.props.overlay)}
            container={this}
          >
            {/* <small>
              <i className='fa fa-question-circle' aria-hidden='true' />
            </small> */}
          </OverlayTrigger>
        </React.Fragment>
      </div>
    );
  }
}

//PropTypes
Popover.propType = {
  label: PropTypes.string,
  placement: PropTypes.string,
  overlay: PropTypes.string,
};

//Default PropTypes
Popover.defaultProps = {
  label: 'Empty',
  placement: 'top',
  overlay: 'Example Help Text',
};

export default Popover;
