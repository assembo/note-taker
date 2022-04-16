import * as React from 'react';
import Typography from '@mui/material/Typography';
import Popper from '@mui/material/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import { BaseIconButton } from "../BaseComponents/BaseIconButton";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

export default function PopperPopupState() {
  return (
    <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState) => (
        <div>
          <BaseIconButton 
            styleOverride={ { margin: "50px 95px 15px auto" } }
            icon={<QuestionMarkIcon style={{ width: "30px", height: "30px", margin: "0 0 0 12px"}}/>}
            callback={()=>{}}
          />
          <Popper {...bindPopper(popupState)} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                  <Typography sx={{ p: 2 }}>The content of the Popper.</Typography>
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
  );
}