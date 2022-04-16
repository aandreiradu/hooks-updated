import React from 'react';

import classes from './ErrorModal.module.css';

const ErrorModal = React.memo(props => {
    return (
        <React.Fragment>
            <div className={classes.backdrop} onClick={props.onClose} />
            <div className={classes["error-modal"]}>
                <h2>An Error Occurred!</h2>
                <p>{props.children}</p>
                <div className={classes["error-modal__actions"]}>
                    <button type="button" onClick={props.onClose}>
                        Okay
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
});

export default ErrorModal;