import * as React from 'react';
import { Button } from '@mui/material';
import { ASSEMBO_COLORS } from '../constants';

export function BaseIconButton({ styleOverride, icon, callback }) {
  const style = {
    borderRadius: 45,
    fontWeight: "bold",
    boxShadow: "none",
    width: "64px", height: "64px",
    background: ASSEMBO_COLORS.primary
  };
  Object.assign(style, styleOverride);
  return (
    <Button
        variant="contained"
        style={style}
        startIcon={ icon }
        onClick={callback}
      >
    </Button>
  )
};
