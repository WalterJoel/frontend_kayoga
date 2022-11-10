import React,{useState,useEffect} from "react";
import ListAltIcon from '@mui/icons-material/ListAlt';

import {Select,
    Table,Grid,Avatar, MenuItem,
  Typography, TextField} from '@mui/material';
import { fontWeight } from "@mui/system";

import TransferList from "./TransferList";
import {tallasDamaDivision,tallasNinoDivision,tallasVaronJson} from '../../Elements/TallasGeneralJson';


export let selected= '';
export default function OrdenInyeccionPage() {
  const [insertos, setInsertos] = React.useState([]);
  
  //const [selected, setSelected] = useState('');
  //TallasJSON
  const [talla,setTallas]=useState({});
  // Creo mis estados de seleccion inicial
  const[moldeSelected,setMoldeSelected] = useState('');
  const[serieSelected,setSerieSelected] = useState('');
  const[tallaSelected,setTallaSelected] = useState('');
  
  function handleChangeMoldeSelect(event){
    setMoldeSelected(event.target.value);
  }
  function handleChangeSerieSelect(event){
    const value = event.target.value;
    selected=value;
    setSerieSelected(value);
    //Cargo las opciones para el select de Tallas
    if(value==='nino'){
        setTallas(tallasNinoDivision);  
    }
    else if(value==='dama'){
        setTallas(tallasDamaDivision);
    }
    else{
        setTallas(tallasVaronJson);  
    }
  }
  function handleChangeTallaSelect(event){
    setTallaSelected(event.target.value);
    console.log('talla seleccionada',event.target.value);
  }

  
  async function getInsertosBySerie(){
//    const url = 'https://backendkayoga-production.up.railway.app/getLotesByIdAparadorAndEstado/'+idAparador+'/'+estadoLote;
    const url = 'https://backendkayoga-production.up.railway.app/getLotesByIdAparadorAndEstado/getInsertosBySerie/'+selected;
      await fetch(url,{
        headers: {
            'Content-Type': 'application/json'
          },
    })
  .then(function(response) {
      if(response.ok) {
          const promesa = response.json();
          promesa.then(function(insertos) {
            setInsertos(insertos);
          });
      } else {
        console.log('Respuesta de red OK pero respuesta HTTP no OK');
      }
    })
    .catch(function(error) {
      console.log('Hubo un problema con la petición Fetch:' + error.message);
    });     
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    alert('Estas seguro de enviar la informacion?');
   
    //For Production
    fetch('https://backendkayoga-production.up.railway.app/getLotesByIdAparadorAndEstado/UpdateAllInsertos',{
        headers: {
            'Content-Type': 'application/json'
          },
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(insertos),
    })
    .then(function(response) {
        if(response.ok) {
            //console.log(response.json());setLoading(false);navigate('/ListLotesPage')
        } else {
          console.log('Respuesta de red OK pero respuesta HTTP no OK');
        }
      })
      .catch(function(error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
      });
}
  useEffect(() => {
    getInsertosBySerie();
    setInsertos([]);
    console.log('render');
    //ref.current.scrollTop = 0;
    //setMessages(refreshMessages());
  }, [selected ]);

  return (
    <Grid container sx={{zIndex:2,position:'absolute',padding:5, borderRadius:5,
    mt:'',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <Grid container sx={{backgroundColor:'#dfe3e9',mt:'7em',p:2,borderRadius:5,display:'flex',justifyContent:'center'}}>

        <Grid item container sx={{ backgroundColor:'',flexDirection:'row',justifyContent:'space-between',alignItems:'center',m:1}} >                
          <Grid item container sx={{p:2}} xs={7}  >
              <Grid >
                  <Avatar  sx={{width:70,height:70}}/>
              </Grid>
              <Grid >
                  <Typography variant='h4' sx={{p:1}}>
                      Generar Orden de Inyección
                  </Typography>
              </Grid>   
          </Grid> 
        </Grid>
        {/* Select para molde, serie y talla */}
        <Grid item container sx={{width: "80%",backgroundColor:'#f2f3f4',padding:'0.5em',borderRadius:'15px',justifyContent:'space-around'}}>
          <Grid  item >                   
            <Typography variant='span'>
              Selecciona un molde
            </Typography>
            <Select
                sx={{fontWeight:'bold',ml:1}}
                required
                label='select'
                value = {moldeSelected}
                //name = 'idaparador' 
                onChange={handleChangeMoldeSelect}
                >
                <MenuItem key='vans' value='vans'>  Vans</MenuItem>
                <MenuItem key='star' value='star'>  Star</MenuItem>
                <MenuItem key='giana' value='giana'>Giana</MenuItem>
            </Select>
          </Grid>
          <Grid  item >                   
            <Typography variant='span'>
              Selecciona la serie
            </Typography>
            <Select
                sx={{fontWeight:'bold',ml:1}}
                required
                label='select'
                value = {serieSelected}
                //name = 'idaparador' 
                onChange={handleChangeSerieSelect}
                >
                <MenuItem key='nino' value='nino'>  Niño</MenuItem>
                <MenuItem key='dama' value='dama'> Dama</MenuItem>
                <MenuItem key='varon' value='varon'>Varón</MenuItem>
            </Select>
          </Grid>
          <Grid  item >                   
            <Typography variant='span'>
              Selecciona una talla
            </Typography>
            <Select
                sx={{fontWeight:'bold',ml:1}}
                required
                label='select'
                value    = {tallaSelected}  
                onChange={handleChangeTallaSelect}
                >

                <MenuItem value='talla1' id='talla1'>  {talla.talla1 + ' STAR' }</MenuItem>                 
                <MenuItem value='talla21' id='talla21'>  {talla.talla21+' VANS' } </MenuItem>                
                <MenuItem value='talla2'  name='talla2'>  {talla.talla2 } </MenuItem>
                
                <MenuItem value='talla3'  name='talla3'>  {talla.talla3 } </MenuItem>

                {serieSelected=== 'nino' &&(
                  <MenuItem value='talla31'name='talla31'>{talla.talla31} </MenuItem>
                )}
                <MenuItem value='talla4' name='talla4'>{talla.talla4} </MenuItem>
                
                {serieSelected=== 'nino' &&(
                  <MenuItem value='talla41'  name='talla41' >{talla.talla41} </MenuItem>
                )}
                
                <MenuItem value='talla5'  name='talla5'  >{talla.talla5} </MenuItem>

                {serieSelected=== 'nino' &&(
                  <MenuItem value='talla51'  name='talla51' >{talla.talla51} </MenuItem>
                )}

            </Select>
          </Grid>
        </Grid>
        
        
        <TransferList></TransferList>
      
      
      </Grid>  
    </Grid>
  );
}

