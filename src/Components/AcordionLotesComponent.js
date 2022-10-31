import React from 'react';

import clsx from 'clsx';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {BottomNavigation, 
    Grid,
    Accordion,AccordionActions,AccordionDetails,AccordionSummary,
    Chip,Divider,Button,
    Card, 
    Avatar,  
    BottomNavigationAction,Container, Typography, CardContent, CssBaseline } from "@mui/material";
import ListAltIcon from '@mui/icons-material/ListAlt';

const AcordionLotesComponent=()=>{
  //const classes = useStyles();

  return (
    <div >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div >
            <Typography >Location</Typography>
          </div>
          <div >
            <Typography >Select trip destination</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails >
          <div />
          
          <div >
            <Typography variant="caption">
              Select your destination of choice
              <br />
              <a href="#secondary-heading-and-columns" >
                Learn more
              </a>
            </Typography>
          </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size="small">Cancel</Button>
          <Button size="small" color="primary">
            Save
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}

export default AcordionLotesComponent;
