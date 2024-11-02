import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';


export default function BasicSelect() {

  const [Selectchoice, setSelect] = React.useState('');
  const navigate = useNavigate();

  const ClickSelect_ = (event) => {
    const value = event.target.value;
    setSelect(value);

    if(value){
      navigate(`/${value}`);
    }
  };

  return (

    <Box sx={{ minWidth: 120,
      marginTop: '15px', marginBottom: '20px'
    }}>
      <FormControl fullWidth>

        <InputLabel id="demo-simple-select-label">Methods</InputLabel>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Selectchoice}
          label="Root"
          onChange={ClickSelect_}
        >
          <MenuItem value="Graphical">Graphical Method</MenuItem>
          <MenuItem value="Bisection">Bisection Method</MenuItem>
          <MenuItem value="Falseposition">False Position Method</MenuItem>
          <MenuItem value="Secant">Secant Method</MenuItem>
          <MenuItem value="OnepointIteration">Onepoint Iteration Method</MenuItem>
          <MenuItem value="NewtonRaph">Newton Rapshon Method</MenuItem>
          <MenuItem value="CramersRule">Cramer's Rule</MenuItem>
          <MenuItem value="LinearSpline">Linear Spline</MenuItem>

        </Select>

      </FormControl>
    </Box>

  );
}
