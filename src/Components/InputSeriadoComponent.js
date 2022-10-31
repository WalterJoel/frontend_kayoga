import React from "react";
import {TextField,Card,CardContent,Typography,Grid} from '@mui/material';



const InputSeriadoComponent=()=>{
    return(
            <Grid container > 
                        <Grid item xs={4}>
                        <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        defaultValue="Hello World"
                        size='small'
                        />
                        </Grid>
                        <Grid item xs={4}>
                        <TextField
                        disabled
                        id="outlined-disabled"
                        label="Disabled"
                        defaultValue="Hello World"
                        />
                        </Grid>
                        <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        />
                        <TextField
                        id="outlined-read-only-input"
                        label="Read Only"
                        defaultValue="Hello World"
                        InputProps={{
                            readOnly: true,
                        }}
                        />
            </Grid>
    )
}
export default InputSeriadoComponent;