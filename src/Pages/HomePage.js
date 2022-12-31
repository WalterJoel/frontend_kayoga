import React from "react";
import HomeCardsComponent from '../Components/HomeCardsComponent';

import {
    Typography,
    Paper,
    Link,
    Grid,

  } from '@mui/material';

//Importando imagenes
import aparadorImage from '../media/aparadorImage.jpg';
import lotesImage from '../media/lotesImage.jpg';
import inyeccionImage from '../media/inyeccionImage.jpg';
import coverVideo from '../media/coverVideo.mp4';
import contarImage from '../media/contarImage.jpg';
import entregarLoteImage from '../media/entregarLoteImage.jpg';
import './HomePage.css'

export default function HomePage(props){
    return(
        <>
        <Grid sx={{position:'absolute',padding:1,mt:'0em',display:'flex',justifyContent:'center'}}>
            <Grid container  sx={{display:'flex',justifyContent:'center'}}>
            {/* Portada Inicial */}
            {/* <Paper  style ={{padding:10, margin:10,borderRadius:20 }} >
                <video id="vid"   className="video" src={ coverVideo } autoPlay loop muted   />
                
            </Paper>     */}
            
            {/* Botones de accion */}
            <Grid  container sx={{justifyContent:"center"}} >
                <Grid item > 
                    <HomeCardsComponent action='Información de Aparadores' image={inyeccionImage} linkTo='/InfoAparadoresPage' /> 
                </Grid>
                <Grid item>
                    <HomeCardsComponent action='Nuevo Lote' image={inyeccionImage} linkTo='/InsertNewLotePage'/> 
                </Grid>    
                <Grid item>
                    <HomeCardsComponent action='Editar Lote' image={inyeccionImage} linkTo='/ListaLotesPorEditar'/> 
                </Grid>    
                <Grid item>
                    <HomeCardsComponent action='Lotes' image={inyeccionImage} linkTo='/ListAllLotesByState' /> 
                </Grid>    
                <Grid item>
                    <HomeCardsComponent action='Enviar Lote Aparado' image={inyeccionImage} linkTo='ListLotesPage'/> 
                </Grid>    
                <Grid item>
                    <HomeCardsComponent action='Enviar Lote Estampado' image={inyeccionImage} linkTo='ListLotesCortadosPorEstampar'/> 
                </Grid>    
                <Grid
                 item>
                    <HomeCardsComponent action='Stock Insertos' image={inyeccionImage} linkTo='/InsertInsertosPage' /> 
                </Grid>
                <Grid
                 item>
                    <HomeCardsComponent action='Stock Zapatillas' image={inyeccionImage} linkTo='/InsertZapatillasPage' /> 
                </Grid>
                <Grid
                 item>
                    <HomeCardsComponent action='Generar Orden Inyección' image={inyeccionImage} linkTo='/OrdenInyeccionPage' /> 
                </Grid>    
                <Grid
                 item>
                    <HomeCardsComponent action='Aparador' image={inyeccionImage} linkTo='/AparadorPage' /> 
                </Grid>   
                <Grid
                 item>
                    <HomeCardsComponent action='Separar Lote'  image={inyeccionImage} linkTo='/SepararLotePage' /> 
                </Grid>    
                <Grid
                 item>
                    <HomeCardsComponent action='Lotes Por Contar'  image={inyeccionImage} linkTo='/LotesPorContarPage' /> 
                </Grid>    
                <Grid
                 item>
                    <HomeCardsComponent action='Orden Inyección Generada'  image={inyeccionImage} linkTo='/OrdenInyeccionGenerada' /> 
                </Grid>    
                <Grid
                 item>
                    <HomeCardsComponent action='Orden Inyección Generada Mini'  image={inyeccionImage} linkTo='/OrdenInyeccionGeneradaVistaSimple' /> 
                </Grid>   
                <Grid
                 item>
                    <HomeCardsComponent action='Para Gorlesban'  image={inyeccionImage} linkTo='/Elesban547' /> 
                </Grid>    
            </Grid>    
            </Grid>
        </Grid>
        </>
    )
}

