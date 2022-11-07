import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';

export interface ConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  open: boolean;
  onClose: (value: boolean) => void;
}

export function CDialog({ onClose,  open, ...other }: ConfirmationDialogRawProps) {
  const radioGroupRef = React.useRef<HTMLElement>(null);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose(false);
  };

  const handleOk = () => {
    onClose(true);
  };

  return <Dialog
    sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
    maxWidth="xs"
    TransitionProps={{ onEntering: handleEntering }}
    open={open}
    {...other}
  >
    <DialogTitle>Remover Cliente</DialogTitle>
    <DialogContent>
      Deseja realmente remover o cliente?
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={handleCancel}>
        Cancel
      </Button>
      <Button onClick={handleOk}>Ok</Button>
    </DialogActions>
  </Dialog>
}