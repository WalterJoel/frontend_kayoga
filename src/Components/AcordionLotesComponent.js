import React from 'react';
import {useEffect, useState } from "react";

import clsx from 'clsx';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {BottomNavigation, 
    Grid,
    Accordion,AccordionActions,AccordionDetails,AccordionSummary,
    TextField,Divider,Button,
    Card, 
    Avatar,  
    BottomNavigationAction,Container, Typography, CardContent, CssBaseline } from "@mui/material";

import {tallasDamaJson,tallasNinoJson,tallasVaronJson} from '../Elements/TallasGeneralJson';


const AcordionLotesComponent=(props)=>{
  //const classes = useStyles();
  const [talla,setTallas]= useState({});
  const [formSeriadoRestante, setFormSeriadoRestante] = useState({
    talla1:'0',
    talla2:'',
    talla3:'',
    talla4:'',
    talla5:'',
    metraje: '',
    color:'',
    descripcion:'',
    serie:'',
    garibaldi:false,
    contrafuerte:false,
    etiquetas:false,
    estado: 'Cortado',
  });

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    console.log(e.target.value);
    setFormSeriadoRestante((prev)=>{
        return {...prev, [name]:value};
    });
  }

    //Apenas renderiza debo setear las tallas
  useEffect(() =>{
    if(props.serieLote==='nino'){
        setTallas(tallasNinoJson);  
    }
    else if(props.serieLote==='dama'){
        setTallas(tallasDamaJson);
    }
    else{
        setTallas(tallasVaronJson);  
    }
  },[]);
  
  return (
    <Grid item sx={{borderRadius:3}} >
      <Accordion sx={{m:2}} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
          >
          <Typography  >Lote # {props.idLote}</Typography>
        </AccordionSummary>

        <AccordionDetails >
            <Typography variant="caption">
                  {props.infomodelo}
            </Typography>
          {/* Formulario de Tallas */}
          <Grid item sx={{flexGrow:1}}>
                            <TextField  
                                name="talla1"
                                value={formSeriadoRestante.talla1}
                                onChange={handleChange}
                                fullWidth
                                required    
                                type="number"
                                sx={{mb:1}}
                                label={talla.talla1}
                            />
                        </Grid>
                     
                    <Grid item sx={{flexGrow:1}}>
                        <TextField
                            name="talla2"
                            required
                            value={formSeriadoRestante.talla2}
                            onChange={handleChange}
                            fullWidth
                            type="number"
                            sx={{mb:1}}
                            label={talla.talla2}
                        />
                    </Grid>
                    <Grid item sx={{flexGrow:1}}>
                        <TextField
                            name="talla3"
                            value={formSeriadoRestante.talla3}
                            onChange={handleChange}
                            fullWidth
                            required
                            type="number"
                            sx={{mb:1}}
                            label={talla.talla3}
                        />
                    </Grid>
                    <Grid item sx={{flexGrow:1}}>
                        <TextField
                            name="talla4"
                            value={formSeriadoRestante.talla4}
                            onChange={handleChange}                        
                            fullWidth
                            required
                            type="number"
                            sx={{mb:1}}
                            label={talla.talla4}
                        />  
                    </Grid>

                    <Grid item sx={{flexGrow:1}}>
                        <TextField
                            name="talla5"
                            value={formSeriadoRestante.talla5}
                            onChange={handleChange}                        
                            fullWidth
                            required
                            type="number"
                            sx={{mb:1}}
                            label={talla.talla5}
                        />  
                    </Grid>

        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size="small" variant='outlined'>Entregar</Button>
          
        </AccordionActions>
      </Accordion>
    </Grid>
  );
}

export default AcordionLotesComponent;
