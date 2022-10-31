import React from "react";
import HomeCardsComponent from '../Components/HomeCardsComponent';

import {
    Typography,
    Paper,
    Link,
    Grid,
    Box,
    Button,
    CssBaseline,
    RadioGroup,
    FormLabel,
    MenuItem,
    FormGroup,
    CardMedia,
    FormControl,
    Divider,
    FormControlLabel,
  } from '@mui/material';

//Importando imagenes
import aparadorImage from '../media/aparadorImage.jpg';
import lotesImage from '../media/lotesImage.jpg';
import inyeccionImage from '../media/inyeccionImage.jpg';
import coverVideo from '../media/coverVideo.mp4';
import './HomePage.css'

export default function HomePage(props){
    return(
        <>
        <div style={{padding:16, margin:'auto', maxWidth:1000}}>
            {/* Portada Inicial */}
            <Paper  style ={{padding:10, margin:10,borderRadius:20 }} >
                <video id="vid"   className="video" src={ coverVideo } autoPlay loop muted   />
                
            </Paper>    
            
            {/* Botones de accion */}
            <Grid  container flexWrap='wrap' justifyContent="center" >
                <Grid item > 
                    <HomeCardsComponent action='Aparadores' image={aparadorImage}/> 
                </Grid>
                <Grid item>
                    <HomeCardsComponent action='Lotes' image={lotesImage} linkTo='/InsertNewLotePage'/> 
                </Grid>    
                <Grid item>
                    <HomeCardsComponent action='Inyección' image={inyeccionImage} /> 
                </Grid>    
                <Grid item>
                    <HomeCardsComponent action='Seriados' image={inyeccionImage} /> 
                </Grid>    
                <Grid item>
                    <HomeCardsComponent action='Insertos' image={inyeccionImage} linkTo='/InsertInsertosPage' /> 
                </Grid>    
            </Grid>    

        </div>
        </>
    )
}

