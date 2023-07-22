// import React from 'react';
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

function App() {
  return (
    <div>
      <Button variant="contained" color="primary">
        Click Me
      </Button>
      <TextField label="Enter something" variant="outlined" />
      <Dialog open>
        <DialogTitle>Hello Dialog</DialogTitle>
        <DialogContent>
          <p>This is a Material-UI dialog.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => alert('You clicked OK')}>OK</Button>
          <Button onClick={() => alert('You clicked Cancel')}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
