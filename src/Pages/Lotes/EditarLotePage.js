import {useState,useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";
import { useNavigate,useParams } from 'react-router-dom';

import React from "react";
import { positions } from '@mui/system';
import { TextField, Checkbox, Select } from '@mui/material';
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
    const [validarStar,setValidarStar] = useState(false);
    let navigate = useNavigate();
    const [lote,setLote] = useState([]);
    const [talla,setTallas]=useState({});
    const [formSeriado, setFormSeriado] = useState({
    
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

    //Funcion para cambiar el valor del Select
    const handleChangeSelect = (e) => {
        const name = e.target.name;
        const value =e.target.value;
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

        setFormSeriado((prev)=>{
            return {...prev, [name]:value};
        });
    };    
    function handleChangeValidarStar(e){
        const value=  e.target.checked;
        setValidarStar(value)
    }
    //Para los cambios en campos que tienen el valor en el .checked
    function handleChangeCheckBox(e){
        const name = e.target.name;
        const value = e.target.checked;
        setFormSeriado((prev)=>{
            return {...prev, [name]:value};
        });

    }
    //Para los cambios de campos normales
    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        console.log('name: ',name, ' value: '+value             )
        setLote((prev)=>{
            return {...prev, [name]:value};
        });
        //console.log(lote);
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
                  setLote(lotes);
                  console.log(lotes)
                });      
                //setLote(response);
                //console.log(response)
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
        fetch('https://backendkayoga-production.up.railway.app/postSeriados',{
            headers: {
                'Content-Type': 'application/json'
              },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify(formSeriado),
        })
        .then(function(response) {
            if(response.ok) {
                console.log(response.json()); navigate('/ListLotesPage')
            } else {
              console.log('Respuesta de red OK pero respuesta HTTP no OK');
            }
          })
          .catch(function(error) {
            alert('Hubo un problema con la petición Fetch:' + error.message);
          });
   }
   if(lote.length > 0){
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
                    <form onSubmit={handleSubmit}>
            {/* Cuadro Blanco que encierra todo el form */}
                    <Grid sx ={{mt:1,pt:5,pl:3,pr:3, backgroundColor:'#f8f9fa',borderRadius:5  }} >
                        <Grid container alignItems="flex-start" justifyContent='center' spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    name="metraje"
                                    value={lote[0].metraje}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    type="number"
                                    label="Metraje"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    name="color"
                                    value={lote[0].color}
                                    onChange={handleChange}
                                    fullWidth
                                    type="string"
                                    label="Color de Lona"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="descripcion"
                                    value={lote[0].descripcion}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    multiline
                                    type="string"
                                    label="Descripcion Cortador"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="descripcion"
                                    value={lote[0].detalle_insumos_aparado}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    multiline
                                    type="string"
                                    label="Descripcion Aparador"
                                />
                            </Grid>
                            {/* Seccion Checkbox  */}
                            <Grid item xs={6} sx={{mt:2}}>
                                <FormControlLabel control={<Checkbox checked={lote[0].garibaldi} name="garibaldi" onChange={handleChangeCheckBox} />} label="Garibaldi" />
                            </Grid>
                            <Grid item xs={6} sx={{mt:2}}>
                                <FormControlLabel control={<Checkbox checked={lote[0].contrafuerte} name="contrafuerte" onChange={handleChangeCheckBox} />} label="Contrafuerte" />
                            </Grid>

                            <Divider style={{width:'100%'}} />
                            <Divider style={{width:'100%'}} />
                    {/* Seleccionar la serie                */}
                            <Grid item  xs={6} sx={{mt:2}} >
                                <Typography variant='body1' sx={{padding:1,fontWeight:'bold'}}>
                                    Selecciona la serie
                                </Typography>
                                <Select
                                    name="serie"
                                    required
                                    value={formSeriado.serie}
                                    onChange={handleChangeSelect}
                                    >
                                    <MenuItem key={1} value='nino'>NIÑO</MenuItem>
                                    <MenuItem key={2} value='dama'>DAMA</MenuItem>
                                    <MenuItem key={3} value='varon'>VARON</MenuItem>                                                        
                                </Select>
                            </Grid>
                    {/* Seccion Agregar una talla mas */}
                            <Grid item xs={6} sx={{mt:2}}>
                                <Typography variant='body1' sx={{padding:1,fontWeight:'bold'}}>
                                    Puedes agregar mas tallas
                                </Typography>
                                <FormControlLabel control={<Checkbox  checked={validarStar} onChange={handleChangeValidarStar} />} label="Agregar talla?" />
                            </Grid>
                    {/* Seccion Seriado */}
                            <Divider style={{width:'100%',padding:5 }} />
                            <Divider style={{width:'100%' }} />
                            { validarStar&&(
                                <Grid item sx={{flexGrow:1}}>
                                    <TextField  
                                        name="talla1"
                                        value={formSeriado.talla1}
                                        onChange={handleChange}
                                        fullWidth
                                        required    
                                        type="number"
                                        label={talla.talla1}
                                    />
                                </Grid>
                            )}  
                            <Grid item sx={{flexGrow:1}}>
                                <TextField
                                    name="talla2"
                                    required
                                    value={formSeriado.talla2}
                                    onChange={handleChange}
                                    fullWidth
                                    type="number"
                                    label={talla.talla2}
                                />
                            </Grid>
                            <Grid item sx={{flexGrow:1}}>
                                <TextField
                                    name="talla3"
                                    value={formSeriado.talla3}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    type="number"
                                    label={talla.talla3}
                                />
                            </Grid>
                            <Grid item sx={{flexGrow:1}}>
                                <TextField
                                    name="talla4"
                                    value={formSeriado.talla4}
                                    onChange={handleChange}                        
                                    fullWidth
                                    required
                                    type="number"
                                    label={talla.talla4}
                                />  
                            </Grid>

                            <Grid item sx={{flexGrow:1}}>
                                <TextField
                                    name="talla5"
                                    value={formSeriado.talla5}
                                    onChange={handleChange}                        
                                    fullWidth
                                    required
                                    type="number"
                                    label={talla.talla5}
                                />  
                            </Grid>
                            <Grid item container style={{marginTop: 16,justifyContent:'center' }}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    type="submit"
                                    sx={{fontWeight: 'bold'}}
                                >
                                    Guardar
                                </Button>
                            </Grid>    
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid> 
      </Grid>
    )
    }
  }
  export default InsertNewLotePage;

  //agergo este cmentario para pushear