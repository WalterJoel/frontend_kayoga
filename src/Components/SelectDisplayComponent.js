import React from 'react';
import {FormControl,InputLabel,Select,MenuItem} from '@mui/material';

const SelectDisplayComponent=() =>  {
    const [aparador, setAparador] = React.useState('');

    const handleChange = (event) => {
      setAparador(event.target.value);
    };
    return(
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Aparador</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={aparador}
            onChange={handleChange}
        >
            <MenuItem value={10}>Alex</MenuItem>
            <MenuItem value={20}>Elesban</MenuItem>
            <MenuItem value={30}>Tato</MenuItem>
        </Select>
        </FormControl>
    );

}
export default SelectDisplayComponent;