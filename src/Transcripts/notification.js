import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SNACKBAR_EXPIRATION_TIMER = 6000;

export default function SnackbarNotification({
  open,
  handleClose,
}) {
  const action = (
    <React.Fragment>
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
      <Snackbar
        open={open} 
        autoHideDuration={SNACKBAR_EXPIRATION_TIMER} 
        onClose={handleClose} 
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Note added
        </Alert>
      </Snackbar>
    </div>
  );
};
