import React from 'react';
import {useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {
    Grid,
    Accordion,AccordionDetails,AccordionSummary,
    TextField,Divider,Button,
    Avatar,Typography} from "@mui/material";

import {tallasDamaJson,tallasNinoJson,tallasVaronJson} from '../Elements/TallasGeneralJson';
import agujaImage from '../media/agujaImage.png';

const AcordionForLotesPorContarComponent =(props)=>{
  let navigateToAparadorPage = useNavigate();
  const [talla,setTallas]= useState({});
  const [conteoActual,setConteoActual]= useState(0);
  
  const validarTalla1= props.talla1Props;
  const validarTalla2= props.talla2Props;
  const validarTalla3= props.talla3Props;
  const validarTalla4= props.talla4Props;
  const validarTalla5= props.talla5Props;


  console.log('validando si hay talla 1',validarTalla1);
  const [formSeriadoRestante, setFormSeriadoRestante] = useState({
    talla1:'0',
    talla2:'0',
    talla3:'0',
    talla4:'0',
    talla5:'0',
    estado_tabla_watch_aparado:'Contado',
    descripcion_contador:'',
    idlote: props.idLoteProps,
    idseriadorestante:props.idSeriadoRestanteProps
  });
  
  const  handleSubmit= async(e)=>{
    e.preventDefault();
    alert('Estas seguro de enviar la informacion?');
    //Validando que el aparador entregue completo
    const totalCortes = parseInt(formSeriadoRestante.talla1)+parseInt(formSeriadoRestante.talla2)+parseInt(formSeriadoRestante.talla3)+parseInt(formSeriadoRestante.talla4)+parseInt(formSeriadoRestante.talla5);
    
      await fetch('https://backendkayoga-production-fa5a.up.railway.app/updateWatchAparado',{
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
              navigateToAparadorPage(0);
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
    //fetch('https://backendkayoga-production-fa5a.up.railway.app/createSeriadoRestante',{
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
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
                <Typography variant="h6" color='primary' sx={{mb:2}}>
                  {props.infomodeloProps.toUpperCase()}

                </Typography>
          </Grid>
          <Grid container >
                <Typography variant="h6" color='primary' sx={{mb:2}}>
                   {'Conteo Según Aparador: '+ props.conteoAparadorProps}
                </Typography>
                <Typography variant="h6" color='primary' sx={{mb:2,ml:2}}>
                   {'Tu Conteo Actual: '+ conteoActual}
                </Typography>
          </Grid>
            
          {/* Formulario de Tallas */}
          <form onSubmit={handleSubmit}>
            <Grid container  spacing={1}>
              { validarTalla1>0 &&
              <Grid item sx={{flexGrow:1, display:'flex'}}>
                <TextField  
                  name="talla1"
                  value={formSeriadoRestante.talla1}
                  onChange={handleChange}
                  required 
                  type="number"
                  label={talla.talla1}
                  />
              </Grid>
              }
              { validarTalla2>0 &&
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
              }
              { validarTalla3>0 &&
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
              }
              { validarTalla4>0 &&
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
              }
              { validarTalla5>0 &&
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
export default AcordionForLotesPorContarComponent;
