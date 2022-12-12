import {BottomNavigation, 
    Grid,Select,
    MenuItem,
    Card, Button,
    Avatar,  
    BottomNavigationAction,Container, Typography, CardContent, CssBaseline } from "@mui/material";
import ListAltIcon from '@mui/icons-material/ListAlt';
import DoneIcon from '@mui/icons-material/ListAltSharp';
import { useState } from "react";
import {React,useEffect, useRef} from 'react';
import AcordionForLotesPorContarComponent from '../Components/AcordionForLotesPorContarComponent';
import contarImage from '../media/contarImage.jpg';
//Uso un ref para usar el scroll del React Dom

function LotesPorContarPage(props) {

    //En el front se pone on Focused la opcion aparado
    const [selected, setSelected] = useState('Cortado');
    const [lotes,setLotes]  = useState([]); 
    //La pantalla me obliga a traer solamente los Aparado
    const [estadoLote,setEstadoLote] = useState('Cortado');


    function handleChange(e,newValue){
        setEstadoLote(newValue);
        setSelected(newValue);
    }
    async function getLotesPorContar(){
        //    const url = 'https://backendkayoga-production-fa5a.up.railway.app/getLotesByIdAparadorAndEstado/'+idAparador+'/'+estadoLote;
        const url = 'https://backendkayoga-production-fa5a.up.railway.app/getLotesPorContar';
        await fetch(url,{
        headers: {
            'Content-Type': 'application/json'
            },
        })
        .then(function(response) {
        if(response.ok) {
            const promesa = response.json();
            promesa.then(function(lotes) {
                setLotes(lotes.reverse());
            });
            console.log('all good',lotes)
        } else {
            console.log('Respuesta de red OK pero respuesta HTTP no OK');
        }
        })
        .catch(function(error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
        });  
    }

    useEffect(() => {
    //console.log('selected',selected);
        getLotesPorContar();
    }, [selected]);

    return (
    <>
    {/* Contenedor General del body */}
    <Grid container sx={{zIndex:2,position:'absolute',padding:5, borderRadius:5,
                mt:'',display:'flex',alignItems:'center',justifyContent:'center'}}>

        <Grid sx={{backgroundColor:'#dfe3e9',p:2,borderRadius:5}}>
            <Grid item container >
                {/* Info Title */}
                <Grid item container sx={{ backgroundColor:'',flexDirection:'row',justifyContent:'space-between',alignItems:'center',m:1}} >                
                    <Grid item container sx={{p:2}} xs={7}  >
                        <Grid >
                            <Avatar src={contarImage} sx={{width:70,height:70}}/>
                        </Grid>
                        <Grid >
                            <Typography variant='h4' sx={{p:1}}>
                                Lotes por Contar
                            </Typography>
                        </Grid>   
                    </Grid> 
                </Grid>
        
        {/* Contenedor de los Acordiones  */}
        <Grid container sx={{display:'flex',mt:2,justifyContent:'center',p:1}}>
            {
            lotes.map((lote,i)=>(
                /*Envio los props necesarios:
                - talla1Props: es el campo que me permite validar si la serie tiene
                            la talla 1 , es decir 34 28 38*/
                <AcordionForLotesPorContarComponent key={i} idLoteProps={lote.idlote} 
                                        infomodeloProps={lote.infomodelo}
                                        serieLoteProps={lote.serieLote} 

                                        talla1Props={lote.talla1Seriado}
                                        talla2Props={lote.talla2Seriado}
                                        talla3Props={lote.talla3Seriado}
                                        talla4Props={lote.talla4Seriado}
                                        talla5Props={lote.talla5Seriado}
                                        
                                        idSeriadoRestanteProps={lote.idseriadorestante}
                                        conteoAparadorProps={lote.conteoAparador}
                                        //totalSeriadoInicialProps={lote.total_pares_seriado_inicial}
                />
                ))
            }
            
        </Grid>
        </Grid>
        </Grid>         
    </Grid>
    </>
    );
}

export default LotesPorContarPage;