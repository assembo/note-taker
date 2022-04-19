import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SNACKBAR_EXPIRATION_TIMER = 6000;

export default function SnackbarNotification({
  open,
  handleClose,
}) {
  return (
    <div>
      <Snackbar
        open={open} 
        autoHideDuration={SNACKBAR_EXPIRATION_TIMER} 
      >
        <Alert onClose={handleClose}  severity="success" sx={{ width: '100%' }}>
          Note added
        </Alert>
      </Snackbar>
    </div>
  );
};
