import {useState,useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";
import { useNavigate,useParams } from 'react-router-dom';
import WarningIcon from '@mui/icons-material/Warning';
import React from "react";
import { positions } from '@mui/system';
import { IconButton,TextField, Checkbox, Select } from '@mui/material';
import {
  Typography,
  Paper,
  Divider,
  Grid,
  Button,
  Avatar,
  MenuItem,
  FormControlLabel,
} from '@mui/material';

import NewLoteIcon from '../../media/NewLoteIcon.png';
//Netamente informativo los JSON que traigo
import {tallasDamaJson,tallasNinoJson,tallasVaronJson} from '../../Elements/TallasGeneralJson';

const InsertNewLotePage=(props)=> {
    let { idLote } = useParams();
    let navigate = useNavigate();
    const [lote,setLote] = useState();
    const [talla,setTallas]=useState({});
    
    //Funcion para cambiar el valor del Select
    const asignarTalla = (value) => {
        //Valido que serie se va insertar
        if(value==='nino'){
            setTallas(tallasNinoJson);  
        }
        else if(value==='dama'){
            setTallas(tallasDamaJson);
        }
        else{
            setTallas(tallasVaronJson);  
        }
    };    
    //Para los cambios en campos que tienen el valor en el .checked
    function handleChangeCheckBox(e){
        const name = e.target.name;
        let value = e.target.checked;
        if(value===true){
            value = 1;
        }
        else{
            value = 0;
        }
        setLote((prev)=>{
            return {...prev, [name]:value};
        });
    }
    //Para los cambios de campos normales
    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setLote((prev)=>{
            return {...prev, [name]:value};
        });
    }
    async function getLoteById(){
        await fetch('https://backendkayoga-production.up.railway.app/getLoteById/'+idLote,{
            headers: {
                'Content-Type': 'application/json'
              }
        })
        .then(function(response) {
            if(response.ok) {
                const promesa = response.json();
                promesa.then(function(lotes) {
                  setLote(lotes[0]);
                  asignarTalla(lotes[0].serie)
                  console.log('lotes: ', lotes)
                });      
            } else {
              console.log('Respuesta de red OK pero respuesta HTTP no OK');
            }
          })
          .catch(function(error) {
            alert('Hubo un problema con la petición Fetch:' + error.message);
          });
    }

  useEffect(() => {
    getLoteById();
  }, []);

    const handleSubmit=(e)=>{
        console.log(lote)
        e.preventDefault()
        alert('Estas seguro de enviar la informacion?');
        //For Production
        fetch('https://backendkayoga-production.up.railway.app/updateSpecificInfoLoteById/'+lote.idlote,{
        //fetch('http://localhost:4000/updateSpecificInfoLoteById/'+lote.idlote,{
            headers: {
                'Content-Type': 'application/json'
              },
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify(lote),
        })
        .then(function(response) {
            if(response.ok) {
                console.log(response.json()); navigate('/ListaLotesPorEditar')
            } else {
              console.log('Respuesta de red OK pero respuesta HTTP no OK');
            }
          })
          .catch(function(error) {
            alert('Hubo un problema con la petición Fetch:' + error.message);
          });
    }
    const handleDarBaja=async(e)=>{
        e.preventDefault()
        alert('Estas seguro de Dar de baja?');
        //For Production
        await fetch('https://backendkayoga-production.up.railway.app/darBajaLoteById/'+lote.idlote,{
            headers: {
                'Content-Type': 'application/json'
              },
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify({"estado":'Anulado'}),
        })
        .then(function(response) {
            if(response.ok) {
                navigate('/ListaLotesPorEditar')
            } else {
              console.log('Respuesta de red OK pero respuesta HTTP no OK');
            }
          })
          .catch(function(error) {
            alert('Hubo un problema con la petición Fetch:' + error.message);
          });
   }

   if(lote){
    return (
        
        <Grid container sx={{zIndex:2,position:'absolute',padding:5, borderRadius:5
                ,display:'flex',alignItems:'center',justifyContent:'center'}}>
            {/* Cuadro Plomo Nuevo Lote */}
            <Grid sx={{backgroundColor:'#dfe3e9',p:2,borderRadius:5}}>
                <Grid item container >
                    <Grid item container sx={{alignItems:'center',m:1}} >
                        <Grid>
                            <Avatar src={NewLoteIcon} sx={{width:70,height:70}}/>
                        </Grid>
                        <Grid>
                        <Typography variant='h4' sx={{p:1}}>
                            Editando Lote # {idLote}
                        </Typography>
                        </Grid>           
                    </Grid>
            {/* Cuadro Blanco que encierra todo el form */}
                    <Grid sx ={{mt:1,pt:5,pl:3,pr:3, backgroundColor:'#f8f9fa',borderRadius:5  }} >
                        <Grid container alignItems="flex-start" justifyContent='center' spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant='body1' sx={{padding:1,fontWeight:'bold'}}>
                                    Metraje
                                </Typography>
                                <TextField
                                    name="metraje"
                                    value={lote.metraje}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    type="number"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='body1' sx={{padding:1,fontWeight:'bold'}}>
                                    Color de Lona
                                </Typography>
                                <TextField
                                    name="color"
                                    value={lote.color}
                                    onChange={handleChange}
                                    fullWidth
                                    type="string"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='body1' sx={{padding:1,fontWeight:'bold'}}>
                                    Descripción del Cortador
                                </Typography>
                                <TextField
                                    name="descripcion"
                                    value={lote.descripcion}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    multiline
                                    label=""
                                    type="string"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='body1' sx={{padding:1,fontWeight:'bold'}}>
                                    Detalle de Insumos Entregados 
                                </Typography>
                                <TextField
                                    name="detalle_insumos_aparado"
                                    value={lote.detalle_insumos_aparado}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    multiline
                                    label=""
                                    type="string"
                                />
                            </Grid>
                            {/* Seccion Checkbox  */}
                            <Grid item xs={6} sx={{mt:2}}>
                                <FormControlLabel control={<Checkbox checked={parseInt(lote.garibaldi)} name="garibaldi" onChange={handleChangeCheckBox} />} label="Garibaldi" />
                            </Grid>
                            <Grid item xs={6} sx={{mt:2}}>
                                <FormControlLabel control={<Checkbox checked={parseInt(lote.contrafuerte)} name="contrafuerte" onChange={handleChangeCheckBox} />} label="Contrafuerte" />
                            </Grid>


                            <Divider style={{width:'100%'}} />
                            <Divider style={{width:'100%'}} />
                 
                    {/* Seccion Seriado */}
                           <Grid item container sx={{m:2}}>
                                <Typography variant='h6' sx={{padding:1,fontWeight:'bold'}}>
                                        Aún puedes modificar el seriado de corte
                                </Typography>
                            </Grid> 
                            { lote.talla1>0 &&(
                                <Grid item sx={{flexGrow:1}}>
                                    <Typography variant='body1' sx={{padding:1,fontWeight:'bold'}}>
                                        Talla {talla.talla1}
                                    </Typography>
                                    <TextField  
                                        name="talla1"
                                        value={lote.talla1}
                                        onChange={handleChange}
                                        fullWidth
                                        required    
                                        type="number"
                                    />
                                </Grid>
                            )}  
                            { lote.talla2>0 &&(
                            <Grid item sx={{flexGrow:1}}>
                                <Typography variant='body1' sx={{padding:1,fontWeight:'bold'}}>
                                    Talla {talla.talla2}
                                </Typography>
                                <TextField
                                    name="talla2"
                                    required
                                    value={lote.talla2}
                                    onChange={handleChange}
                                    fullWidth
                                    type="number"
                                />
                            </Grid>
                            )}
                            { lote.talla3>0 &&(
                            <Grid item sx={{flexGrow:1}}>
                                <Typography variant='body1' sx={{padding:1,fontWeight:'bold'}}>
                                    Talla {talla.talla3}
                                </Typography>
                                <TextField
                                    name="talla3"
                                    value={lote.talla3}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    type="number"
                                />
                            </Grid>
                            )}
                            { lote.talla4>0 &&(
                            <Grid item sx={{flexGrow:1}}>
                                <Typography variant='body1' sx={{padding:1,fontWeight:'bold'}}>
                                    Talla {talla.talla4}
                                </Typography>
                                <TextField
                                    name="talla4"
                                    value={lote.talla4}
                                    onChange={handleChange}                        
                                    fullWidth
                                    required
                                    type="number"
                                />  
                            </Grid>
                            )}
                            { lote.talla5>0 &&(
                            <Grid item sx={{flexGrow:1}}>
                                <Typography variant='body1' sx={{padding:1,fontWeight:'bold'}}>
                                    Talla {talla.talla5}
                                </Typography>
                                <TextField
                                    name="talla5"
                                    value={lote.talla5}
                                    onChange={handleChange}                        
                                    fullWidth
                                    required
                                    type="number"
                                />  
                            </Grid>
                            )}
                            <Grid item container style={{marginTop: 16,justifyContent:'center' }}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    type="submit"
                                    sx={{fontWeight: 'bold',m:2}}
                                    onClick={handleSubmit}
                                >
                                    Guardar
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="warning"
                                    sx={{fontWeight: 'bold',m:2}}                                    
                                    onClick={handleDarBaja}
                                >
                                    <IconButton sx ={{    color: "orange" }}>
                                        <WarningIcon/>
                                    </IconButton>
                                    Dar de Baja
                                </Button>
                            </Grid>    
                        </Grid>
                    </Grid>
            </Grid>
        </Grid> 
      </Grid>
    )
    }
  }
  export default InsertNewLotePage;

  //agergo este cmentario para pushear