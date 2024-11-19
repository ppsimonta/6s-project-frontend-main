import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import QrReader from 'react-qr-scanner';
import { useNavigate } from 'react-router-dom';

export default function ScannerModal({ open, close }) {

  const navigateTo = useNavigate();

  const handleScan = (result) => {
    if (result != null) {
      const splitText = result.text.split("/");
      const id = splitText[splitText.length - 1];
      console.log(`Scanned room id ${id}`);
      navigateTo(`/audit/fill/${id}`);
    }
  }

  const handleError = (result) => {
    console.log(result);
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Scan a room with a QR code"}
        </DialogTitle>
        <div style={{display: "flex", justifyContent: "center"}}>
          <div style={{width: "95%", aspectRatio: "1/1", display: "flex", alignItems: "center"}}>
            <QrReader
              style={{height: "100%", overflowX: "hidden", objectFit: "cover"}}
              delay={250}
              onError={handleError}
              onScan={handleScan}
            />
          </div>
        </div>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Point the camera at a QR code posted on the room's door. 
            You will be automatically directed to the auditing view
            once a valid QR is detected.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}