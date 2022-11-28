import React from 'react';
import {useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {
    Grid,List,ListItem,ListItemText,
    Accordion,AccordionDetails,AccordionSummary,
    TextField,Divider,Button,
    Avatar,Typography} from "@mui/material";

import {tallasDamaDivision,tallasNinoDivision,tallasVaronJson} from '../Elements/TallasGeneralJson';
import agujaImage from '../media/agujaImage.png';

const AcordionForSepararLoteComponent =(props)=>{
  let navigateToAparadorPage = useNavigate();
  const [talla,setTallas]= useState({});
  const [conteoActual,setConteoActual]= useState(0);
  const validarTalla1= props.talla1Props;
  console.log('validando si hay talla 1',validarTalla1);
  const [formSeriadoRestante, setFormSeriadoRestante] = useState({
    //talla1:'', No hay talla1 xq esos no se separan
    talla2:'',
    talla21:'0',
    talla3:'',
    talla31:'0',
    talla4:'',
    talla41:'0',
    talla5:'',
    talla51:'0',
    idseriadorestante:props.idSeriadoRestanteProps
  });
  
  const  handleSubmit= async(e)=>{
    e.preventDefault();
    alert('Estas seguro de enviar la informacion?');
    //Validando que el aparador entregue completo
    
      await fetch('https://backendkayoga-production.up.railway.app/updateSeriadoRestanteAlSeparar',{
        headers: {
            'Content-Type': 'application/json'
          },
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(formSeriadoRestante),
        })
        .then(function(response) {
            if(response.ok) {
              //Navego a la misma pagina porq cuando renderiza manda a los lotes aparados
              console.log(response.json()); 
              navigateToAparadorPage('/');
            } else {
            //setLoading(false)
            alert('No se pudo guardar, algo ha fallado revisa los campos')
            console.log('Respuesta de red OK pero respuesta HTTP no OK');
          }
        })
      .catch(function(error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
      }); 
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
    console.log('en use effect')
    if(props.serieLoteProps==='nino'){
        setTallas(tallasNinoDivision);  
    }
    else if(props.serieLoteProps==='dama'){
        setTallas(tallasDamaDivision);
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
          <Grid container sx={{display:'flex', flexDirection:'row',alignItems:'center'}} >
            <Avatar src={agujaImage} sx={{pr:2}}/>
            <Typography  color='primary'>Lote # {props.idLoteProps}</Typography>
          </Grid>
        </AccordionSummary>

        <AccordionDetails >
          <Grid container >
            <Grid item>
              <Typography variant="h6" color='primary' sx={{mb:2}}>
                {props.infomodeloProps.toUpperCase()}
              </Typography>
            </Grid>
            <Grid item container sx={{borderRadius:5,backgroundColor:'#dfe3e9',flexGrow:1,m:2,justifyContent:'center'}}>
              <Grid item sx={{justifyContent:'center'}}>
                <Typography variant="h6" color='primary' sx={{mt:2}}>
                  Seriado Contado
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
                  <ListItem sx={{display:'flex',flexDirection:'row',justifyContent:'space-around'}} >
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
          </Grid>
          <Grid container >
                <Typography variant="h6" color='primary' sx={{mb:2}}>
                   {'Conteo Según Aparador: '+ props.conteoAparadorProps}
                </Typography>
                <Typography variant="h6" color='primary' sx={{mb:2,ml:2}}>
                   {'Conteo Según Contador: '+ props.conteoContadorProps}
                </Typography>
          </Grid>
            
          {/* Formulario de Tallas */}

          <form onSubmit={handleSubmit}>
            <Grid container  spacing={1}>
              
              { (props.serieLoteProps==='dama') && //Caso vans cuando validartalla1 es cero
              <Grid item sx={{flexGrow:1, display:'flex'}}>
                <TextField  
                  name="talla21"
                  value={formSeriadoRestante.talla21}
                  onChange={handleChange}
                  required 
                  type="number"
                  label={talla.talla21}
                  />
              </Grid>
              }

              <Grid item sx={{flexGrow:1}}>
                  <TextField
                    name="talla2"
                    required
                    value={formSeriadoRestante.talla2}
                    onChange={handleChange}
                    color='textfield_kayoga'                       
                    type="number"
                    label={talla.talla2}
                  />
              </Grid>
              { props.serieLoteProps==='nino' &&
              <Grid item sx={{flexGrow:1, display:'flex'}}>
                <TextField  
                  name="talla21"
                  value={formSeriadoRestante.talla21}
                  onChange={handleChange}
                  required 
                  type="number"
                  label={talla.talla21}
                  />
              </Grid>
              }
              <Grid item sx={{flexGrow:1}}>
                  <TextField
                    name="talla3"
                    value={formSeriadoRestante.talla3}
                    onChange={handleChange}
                    color='textfield_kayoga'                       
                    required
                    type="number"
                    label={talla.talla3}
                  />
              </Grid>
              { props.serieLoteProps==='nino' &&
              <Grid item sx={{flexGrow:1, display:'flex'}}>
                <TextField  
                  name="talla31"
                  value={formSeriadoRestante.talla31}
                  onChange={handleChange}
                  required 
                  type="number"
                  label={talla.talla31}
                  />
              </Grid>
              }
              <Grid item sx={{flexGrow:1}}>
                  <TextField
                    name="talla4"
                    value={formSeriadoRestante.talla4}
                    onChange={handleChange}                        
                    color='textfield_kayoga'                       
                    required
                    sx={{mr:1}}
                    type="number"
                    label={talla.talla4}
                  />  
              </Grid>
              { props.serieLoteProps==='nino' &&
              <Grid item sx={{flexGrow:1, display:'flex'}}>
                <TextField  
                  name="talla41"
                  value={formSeriadoRestante.talla41}
                  onChange={handleChange}
                  required 
                  type="number"
                  label={talla.talla41}
                  />
              </Grid>
              }
              <Grid item sx={{flexGrow:1}}>
                  <TextField
                    name="talla5"
                    value={formSeriadoRestante.talla5}
                    onChange={handleChange}                        
                    color='textfield_kayoga'                       
                    required
                    type="number"
                    sx={{mb:1}}
                    label={talla.talla5}
                  />  
              </Grid>
              { props.serieLoteProps==='nino' &&
              <Grid item sx={{flexGrow:1, display:'flex'}}>
                <TextField  
                  name="talla51"
                  value={formSeriadoRestante.talla51}
                  onChange={handleChange}
                  required 
                  type="number"
                  label={talla.talla51}
                  />
              </Grid>
              }
              <Grid item sx={{flexGrow:1}}>
                  <TextField
                    name="descripcion_contador"
                    value={formSeriadoRestante.descripcion_contador}
                    onChange={handleChange}                        
                    multiline
                    fullWidth
                    required
                    color='textfield_kayoga'                       
                    sx={{mb:1}}
                    label='Descripción'
                  />  
              </Grid>
            </Grid>
            <Divider />                
            <Grid item container sx={{m:1, justifyContent:'center'}}>
              <Button size="small" variant='contained' type="submit" >Entregar</Button>
            </Grid>
          </form>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
}
export default AcordionForSepararLoteComponent;
