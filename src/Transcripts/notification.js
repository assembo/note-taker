import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export function SnackbarNotification(notesToAdd) {
    const [open, setOpen] = React.useState(false);

    // TODO: set this handleClick as message.text in Transcript
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            {/* UNDO button is optional */}
            {/* <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button> */}
            <IconButton 
              size="small" 
              aria-label="close" 
              color="inherit" 
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>
            {/* TODO: Modify to push notification when clicking on a message.text */}
            <Button onClick={handleClick}>{notesToAdd}</Button>
            <Snackbar
              open={open} 
              autoHideDuration={6000} 
              onClose={handleClose} 
              message="Note added" 
              action={action}
            />
        </div>
    );
}