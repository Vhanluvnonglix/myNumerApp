import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function ButtonAppBar() {

  return (

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#00BFFF' }} >
        <Toolbar>

          <Typography variant="h3" component="div" sx={{ flexGrow: 2, 
            textAlign: 'center', 
            display: 'flex', 
            justifyContent: 'center', 
            padding: '0px',    
            width: '100%',      
            height: '50px',
            color: 'white',
            }}>

            Numerical Methods

          </Typography>

        </Toolbar>
      </AppBar>
    </Box>

  );
}
