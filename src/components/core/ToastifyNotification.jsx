import React from 'react';
import PropTypes from 'prop-types';

const ToastifyNotification = (props) => {
    return (
        <>
            {props.title &&
                <div style={{ textAlign: 'center', color: 'black' }}>{props.title}</div>
            }
            <div>{props.notificationBody}</div>
        </>
    )
};

ToastifyNotification.prototype = {
    title: PropTypes.string,
    notificationBody: PropTypes.node.isRequired,
};

ToastifyNotification.defaultProps = {};

export default ToastifyNotification;
