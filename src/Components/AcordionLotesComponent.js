import React from 'react';
import {useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {
    Grid,
    Accordion,AccordionDetails,AccordionSummary,ListItem,ListItemText,
    List, Avatar,Typography} from "@mui/material";

import {tallasDamaJson,tallasNinoJson,tallasVaronJson} from '../Elements/TallasGeneralJson';
import agujaImage from '../media/agujaImage.png';

const AcordionLotesComponent=(props)=>{
  let navigateToAparadorPage = useNavigate();
  const [talla,setTallas]= useState({});

  const [formSeriadoRestante, setFormSeriadoRestante] = useState({
    talla1:'',
    talla2:'',
    talla3:'',
    talla4:'',
    talla5:'',
    estado_tabla_lote:'Resuelto',
    estado_tabla_watch_aparado:'Por Contar',
    descripcion_aparador:'',
    idlote: props.idLoteProps
  });
  
  const  handleSubmit= async(e)=>{
    e.preventDefault();
    alert('Estas seguro de enviar la informacion?');
    //Validando que el aparador entregue completo
    const totalCortes = parseInt(formSeriadoRestante.talla1)+parseInt(formSeriadoRestante.talla2)+parseInt(formSeriadoRestante.talla3)+parseInt(formSeriadoRestante.talla4)+parseInt(formSeriadoRestante.talla5);
    let diferenciaCortes = (props.totalSeriadoInicialProps-totalCortes);
    if(diferenciaCortes<0){
      diferenciaCortes = diferenciaCortes*(-1);
    }
    if(diferenciaCortes<5){
      await fetch('https://backendkayoga-production.up.railway.app/createSeriadoRestante',{
        headers: {
            'Content-Type': 'application/json'
          },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(formSeriadoRestante),
        })
        .then(function(response) {
            if(response.ok) {
              //Navego a la misma pagina porq cuando renderiza manda a los lotes aparados
              console.log(response.json()); 
              navigateToAparadorPage('/AparadorPage');
            } else {
            //setLoading(false)
            console.log('Respuesta de red OK pero respuesta HTTP no OK');
          }
        })
      .catch(function(error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
      }); 
    }
    else{
      alert('Las cantidades ingresadas difieren demasiado de la orden inicial, intenta de nuevo')
    }
    //setLoading(!loading);   
    //For Production
    //fetch('https://backendkayoga-production.up.railway.app/createSeriadoRestante',{
  }

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
    if(props.serieLoteProps==='nino'){
        setTallas(tallasNinoJson);  
    }
    else if(props.serieLoteProps==='dama'){
        setTallas(tallasDamaJson);
    }
    else{
        setTallas(tallasVaronJson);  
    }
  },[]);
  
  return (
    <Grid item  sx={{borderRadius:3}} >
      <Accordion sx={{m:2}} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
          >
          <Grid container sx={{display:'flex', flexDirection:'row',alignItems:'center'}} >
            <Avatar src={agujaImage} sx={{pr:2}}/>
            <Typography  color='primary'>Lote # {props.idLoteProps}</Typography>
          </Grid>
          
        </AccordionSummary>

        <AccordionDetails >
          <Grid xs={12} container sx={{backgroundColor:''}}>
            {props.infomodeloProps ?(
                <Typography variant="h6" color='primary' sx={{mb:2}}>
                  {props.infomodeloProps.toUpperCase()}
                </Typography>
            ):(
              <Typography variant="h6" color='primary' sx={{mb:2}}>
                  Los lotes cortados aun no tienen un modelo definido, asignale uno
              </Typography>
            )}

          </Grid>
    {/* Informacion del Lote*/}
        <Grid container sx={{backgroundColor:'rgb(242, 243, 244)',p:1,borderRadius:5,mt:2,justifyContent:'space-between'}}>
        {/* Info 1 */}
          <Grid container xs={5.8} sx={{backgroundColor:'#ffffff',p:4,borderRadius:5,display:'flex',flexWrap:'wrap',m:0}} >
            <Grid  item sx={{display:'flex',justifyContent:'center',flexDirection:'column',alignItemns:'center',m:1}}>
              <Grid item>
                <Typography variant="subtitle2" color='primary' sx={{fontWeight: 'bold'}}>
                  Metraje
                </Typography>
              </Grid> 
              <Grid item>
                <Typography variant="body2" color='primary'>
                  {props.metrajeProps}
                </Typography>
              </Grid>
            </Grid>

            <Grid  item sx={{display:'flex',justifyContent:'center',flexDirection:'column',alignItemns:'center',m:1}}>
              <Grid item>
                <Typography variant="subtitle2" color='primary' sx={{fontWeight: 'bold'}}>
                  Color de Lona
                </Typography>
              </Grid> 
              <Grid item>
                <Typography variant="body2" color='primary'>
                  {props.colorLonaProps}
                </Typography>
              </Grid>
            </Grid>

            <Grid  item sx={{display:'flex',justifyContent:'center',flexDirection:'column',alignItemns:'center',m:1}}>
              <Grid item>
                <Typography variant="subtitle2" color='primary' sx={{fontWeight: 'bold'}}>
                  Aparador
                </Typography>
              </Grid> 
              <Grid item>
                <Typography variant="body2" color='primary'>
                  {props.nombreAparadorProps}
                </Typography>
              </Grid>
            </Grid>

            <Grid  item sx={{display:'flex',justifyContent:'center',flexDirection:'column',alignItemns:'center',m:1}}>
              <Grid item>
                <Typography variant="subtitle2" color='primary' sx={{fontWeight: 'bold'}}>
                  Fecha de Corte
                </Typography>
              </Grid> 
              <Grid item>
                <Typography variant="body2" color='primary'>
                  {props.fechaCorteProps}
                </Typography>
              </Grid>
            </Grid>

            <Grid  item sx={{display:'flex',justifyContent:'center',flexDirection:'column',alignItemns:'center',m:1}}>
              <Grid item>
                <Typography variant="subtitle2" color='primary' sx={{fontWeight: 'bold'}}>
                  Garibaldi
                </Typography>
              </Grid> 
              <Grid item>
                <Typography variant="body2" color='primary'>
                  {props.garibaldiProps}
                </Typography>
              </Grid>
            </Grid>

            <Grid  item sx={{display:'flex',justifyContent:'center',flexDirection:'column',alignItemns:'center',m:1}}>
              <Grid item>
                <Typography variant="subtitle2" color='primary' sx={{fontWeight: 'bold'}}>
                  Contrafuerte
                </Typography>
              </Grid> 
              <Grid item>
                <Typography variant="body2" color='primary'>
                {props.contrafuerteProps}
                </Typography>
              </Grid>
            </Grid>

            <Grid  item sx={{display:'flex',justifyContent:'center',flexDirection:'column',alignItemns:'center',m:1}}>
              <Grid item>
                <Typography variant="subtitle2" color='primary' sx={{fontWeight: 'bold'}}>
                  Estado Lote
                </Typography>
              </Grid> 
              <Grid item>
                <Typography variant="body2" color='primary'>
                {props.estadoLoteProps}
                </Typography>
              </Grid>
            </Grid>

            <Grid  item sx={{display:'flex',justifyContent:'center',flexDirection:'column',alignItemns:'center',m:1}}>
              <Grid item>
                <Typography variant="subtitle2" color='primary' sx={{fontWeight: 'bold'}}>
                  Fecha Entrega Aparador
                </Typography>
              </Grid> 
              <Grid item>
                <Typography variant="body2" color='primary'>
                  {props.fechaEntregaAparadoProps}
                </Typography>
              </Grid>
            </Grid>

            <Grid  item sx={{display:'flex',justifyContent:'center',flexDirection:'column',alignItemns:'center',m:1}}>
              <Grid item>
                <Typography variant="subtitle2" color='primary' sx={{fontWeight: 'bold'}}>
                  Fecha Conteo
                </Typography>
              </Grid> 
              <Grid item>
                <Typography variant="body2" color='primary'>
                  {props.fechaConteoProps}
                </Typography>
              </Grid>
            </Grid>

            <Grid  item sx={{display:'flex',justifyContent:'center',flexDirection:'column',alignItemns:'center',m:1}}>
              <Grid item>
                <Typography variant="subtitle2" color='primary' sx={{fontWeight: 'bold'}}>
                 Total Pares Cortados
                </Typography>
              </Grid> 
              <Grid item>
                <Typography variant="body2" color='primary'>
                  {props.totalSeriadoInicialProps}
                </Typography>
              </Grid>
            </Grid>
            
            
            <Grid  item sx={{display:'flex',justifyContent:'center',flexDirection:'column',alignItemns:'center',m:1}}>
              <Grid item>
                <Typography variant="subtitle2" color='primary' sx={{fontWeight: 'bold'}}>
                  Total Pares Aparado
                </Typography>
              </Grid> 
              <Grid item>
                <Typography variant="body2" color='primary'>
                  {props.totalParesSegunAparadorProps}
                </Typography>
              </Grid>
            </Grid>

            <Grid  item sx={{display:'flex',justifyContent:'center',flexDirection:'column',alignItemns:'center',m:1}}>
              <Grid item>
                <Typography variant="subtitle2" color='primary' sx={{fontWeight: 'bold'}}>
                  Total Pares Contado
                </Typography>
              </Grid> 
              <Grid item>
                <Typography variant="body2" color='primary'>
                  {props.totalParesSegunContadorProps}
                </Typography>
              </Grid>
            </Grid>



          </Grid>
          
        {/* Info 2 */}
          <Grid container xs={5.8} sx={{backgroundColor:'#ffffff',p:4,borderRadius:5,display:'flex',flexWrap:'wrap',m:0}} >

            <Grid  item sx={{display:'flex',justifyContent:'center',flexDirection:'column',alignItemns:'center',m:1}}>
              <Grid item>
                <Typography variant="subtitle2" color='primary' sx={{fontWeight: 'bold'}}>
                  Descripción Cortador
                </Typography>
              </Grid> 
              <Grid item>
                <Typography variant="body2" color='primary'>
                {props.descripcionCortadorProps}
                </Typography>
              </Grid>
            </Grid>

            <Grid  item sx={{display:'flex',justifyContent:'center',flexDirection:'column',alignItemns:'center',m:1}}>
              <Grid item>
                <Typography variant="subtitle2" color='primary' sx={{fontWeight: 'bold'}}>
                Descripción Aparador
                </Typography>
              </Grid> 
              <Grid item>
                <Typography variant="body2" color='primary'>
                  {props.descripcionAparadorProps}
                </Typography>
              </Grid>
            </Grid>

            <Grid  item sx={{display:'flex',justifyContent:'center',flexDirection:'column',alignItemns:'center',m:1}}>
              <Grid item>
                <Typography variant="subtitle2" color='primary' sx={{fontWeight: 'bold'}}>
                Descripción Contador
                </Typography>
              </Grid> 
              <Grid item>
                <Typography variant="body2" color='primary'>
                  {props.descripcionContadorProps}
                </Typography>
              </Grid>
            </Grid>

          </Grid>
        {/* Info 3 Seriado de Corte y Conteo*/}
          <Grid container xs={5.8} sx={{backgroundColor:'#ffffff',p:4,borderRadius:5,display:'flex',flexWrap:'wrap',mt:2}} >
            <Grid  item sx={{display:'flex',justifyContent:'center',flexDirection:'column',alignItemns:'center',m:1}}>
              <Grid container sx={{justifyContent:'center'}}>
                <Typography variant="subtitle2" color='primary' sx={{fontWeight: 'bold'}}>
                  Seriado de Corte
                </Typography>
              </Grid> 
              <Grid item container sx={{display:'flex',justifyContent:'space-around'}}>
                <List  sx={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <ListItem>
                      {/* Muestro la talla 1 que es o 34 star o 38 adulto solo si tiene datos */}
                      {props.talla1Props>0&&(
                          <ListItemText primary={talla.talla1} secondary={props.talla1Props} />
                      )}                                                                
                  </ListItem>
                  <ListItem >
                      <ListItemText primary={talla.talla2} secondary={props.talla2Props} />
                  </ListItem>
                  <ListItem  >
                      <ListItemText primary={talla.talla3} secondary={props.talla3Props} />
                  </ListItem>
                  {props.serieLoteProps==='nino'&&
                    <ListItem  >
                        <ListItemText primary={talla.talla31} secondary={props.talla31Props} />
                    </ListItem>
                  }
                  <ListItem >
                      <ListItemText primary={talla.talla4} secondary={props.talla4Props} />
                  </ListItem>
                  {props.serieLoteProps==='nino'&&
                    <ListItem  >
                        <ListItemText primary={talla.talla41} secondary={props.talla41Props} />
                    </ListItem>
                  }
                  <ListItem  >
                      <ListItemText primary={talla.talla5} secondary={props.talla5Props} />
                  </ListItem>
                  {props.serieLoteProps==='nino'&&
                    <ListItem  >
                        <ListItemText primary={talla.talla51} secondary={props.talla51Props} />
                    </ListItem>
                  }
                </List>
              </Grid>
            </Grid>
            <Grid  item sx={{display:'flex',justifyContent:'center',flexDirection:'column',m:1}}>
              <Grid container sx={{justifyContent:'center'}}>
                <Typography variant="subtitle2" color='primary' sx={{fontWeight: 'bold'}}>
                  Seriado Restante
                </Typography>
              </Grid> 
              <Grid container  sx={{display:'flex',justifyContent:'space-around'}}>
                <List  sx={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <ListItem>
                      {/* Muestro la talla 1 que es o 34 star o 38 adulto solo si tiene datos */}
                      {props.talla1ResProps>0&&(
                          <ListItemText primary={talla.talla1} secondary={props.talla1Props} />
                      )}                                                                
                  </ListItem>
                  <ListItem sx={{display:'flex',flexDirection:'row',justifyContent:'space-around'}} >
                      {/* Muestro la talla 1 que es o 34 star o 38 adulto solo si tiene datos */}
                      {props.talla21ResProps>0&&(
                          <ListItemText primary={talla.talla1} secondary={props.talla1ResProps} />
                      )}
                  </ListItem>
                  <ListItem >
                      <ListItemText primary={talla.talla2} secondary={props.talla2ResProps} />
                  </ListItem>
                  <ListItem  >
                      <ListItemText primary={talla.talla3} secondary={props.talla3ResProps} />
                  </ListItem>
                  {props.serieLoteProps==='nino'&&
                    <ListItem  >
                        <ListItemText primary={talla.talla31} secondary={props.talla31ResProps} />
                    </ListItem>
                  }
                  <ListItem >
                      <ListItemText primary={talla.talla4} secondary={props.talla4ResProps} />
                  </ListItem>
                  {props.serieLoteProps==='nino'&&
                    <ListItem  >
                        <ListItemText primary={talla.talla41} secondary={props.talla41ResProps} />
                    </ListItem>
                  }
                  <ListItem  >
                      <ListItemText primary={talla.talla5} secondary={props.talla5ResProps} />
                  </ListItem>
                  {props.serieLoteProps==='nino'&&
                    <ListItem  >
                        <ListItemText primary={talla.talla51} secondary={props.talla51ResProps} />
                    </ListItem>
                  }
                </List>
              </Grid>
            </Grid>
          </Grid>
          
           {/* Info 5 Insumos Aparado*/}
           <Grid container xs={5.8} sx={{backgroundColor:'#ffffff',p:4,borderRadius:5,display:'flex',flexWrap:'wrap',mt:2}} >
            <Grid  item sx={{display:'flex',justifyContent:'center',flexDirection:'column',alignItemns:'center',m:2}}>
              <Grid item>
                <Typography variant="subtitle2" color='primary' sx={{fontWeight: 'bold'}}>
                  Insumos de Aparado
                </Typography>
              </Grid> 
              <Grid item>
                <Typography variant="body2" color='primary'>
                {props.detalleInsumosAparadoProps}
                </Typography>
              </Grid>
            </Grid>
            </Grid>
          

          


        </Grid> 
            
  {/* Fin Informacion del Lote*/}
          
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
}
export default AcordionLotesComponent;
