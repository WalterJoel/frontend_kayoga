import {BottomNavigation, 
    Grid,
    Avatar,  
    BottomNavigationAction,Container, Typography, CardContent, CssBaseline } from "@mui/material";
import { useState } from "react";
import {React,useEffect, useRef} from 'react';
import TablaLotesPorEditar from './TablaLotesPorEditar'

import useToken from '../../Hooks/useToken';

//Uso un ref para usar el scroll del React Dom

function ListaLotesPorEditar(props) {

    const {token, setToken} = useToken() 
    //En el front se pone on Focused la opcion aparado
    const [lotes,setLotes]  = useState([]); 
    async function getLotesPorEditar(){
        //    const url = 'https://backendkayoga-production-fa5a.up.railway.app/getLotesByIdAparadorAndEstado/'+idAparador+'/'+estadoLote;
        const url = 'https://backendkayoga-production-fa5a.up.railway.app/getLotesPorEditar';
        await fetch(url,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,

            },
        })
        .then(function(response) {
        if(response.ok) {
            const promesa = response.json();
            promesa.then(function(lotes) {
                setLotes(lotes.reverse());
            });
        } else {
            console.log('Respuesta de red OK pero respuesta HTTP no OK');
        }
        })
        .catch(function(error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
        });     
    }

    useEffect(() => {
        getLotesPorEditar();
    }, []);

    return (
    <>
    {/* Contenedor General del body */}
    <Grid container sx={{zIndex:2,position:'absolute',padding:3, borderRadius:5,
                display:'flex',alignItems:'center',justifyContent:'center'}}>

        <Grid sx={{backgroundColor:'#dfe3e9',p:2,borderRadius:5}}>
            <Grid item container >
                {/* Info Title */}
                <Grid item container sx={{ backgroundColor:'',flexDirection:'row',justifyContent:'space-between',alignItems:'center',m:1}} >                
                    <Grid item container sx={{p:2}} xs={7}  >
                        <Grid >
                            <Avatar  sx={{width:70,height:70}}/>
                        </Grid>
                        <Grid >
                            <Typography variant='h4' sx={{p:1}}>
                                Seleccione un Lote
                            </Typography>
                        </Grid>   
                    </Grid> 
                </Grid>
                
        
        {/* Contenedor de los Acordiones  */}
                <Grid item container sx={{display:'flex',justifyContent:'center',p:1}}>
                    <TablaLotesPorEditar rowsProps={lotes}/>
                </Grid>
            </Grid>
        </Grid>         
    </Grid>
    </>
    );
}

export default ListaLotesPorEditar;