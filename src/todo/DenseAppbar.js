import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';



export default function DenseAppBar() {

  return (
    <div >
      <AppBar position="static" color="inherit">
        <Toolbar variant="dense">
          <Typography variant="h5" color="primary">
            My Tasks
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}