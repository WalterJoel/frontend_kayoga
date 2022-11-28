import React,{useState,useEffect} from "react";

import {Select,
    Grid,Avatar, MenuItem,
  Typography, TextField} from '@mui/material';

import TransferList from "./TransferList";
import {tallasDamaDivision,tallasNinoDivision,tallasVaronJson} from '../../Elements/TallasGeneralJson';


export let seriadoByTallaForTransferList = [];

export default function OrdenInyeccionPage() {
  const [insertos, setInsertos] = React.useState([]);
  
  //const [selected, setSelected] = useState('');
  //TallasJSON
  const [talla,setTallas]=useState({});
  // Creo mis estados de seleccion inicial
  const[moldeSelected,setMoldeSelected] = useState('');
  const[serieSelected,setSerieSelected] = useState('');
  const[tallaSelected,setTallaSelected] = useState('');
  const[listaTallas,setListaTallas] = useState([]);
  const[existeOrden,setExisteOrden] = useState(false);

  function handleChangeMoldeSelect(event){
    setListaTallas([]);
    setMoldeSelected(event.target.value);
  }
  function handleChangeSerieSelect(event){
    setListaTallas([]);
    const value = event.target.value;
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
    getSeriadoRestanteByTalla();
  }

  async function verificarOrdenInyeccionAbierta(){
    //    const url = 'https://backendkayoga-production.up.railway.app/getLotesByIdAparadorAndEstado/'+idAparador+'/'+estadoLote;
        console.log(moldeSelected,serieSelected,tallaSelected )
        const url = 'https://backendkayoga-production.up.railway.app/verificarOrdenInyeccionAbierta';
          await fetch(url,{
            headers: {
                'Content-Type': 'application/json'
              },
        })
      .then(function(response) {
          if(response.ok) {
              const promesa = response.json();
              promesa.then(function(existeOrden) {
                if(existeOrden.length>0){
                  setExisteOrden(true);
                }
              });
          } else {
            console.log('Respuesta de red OK pero respuesta HTTP no OK');
          }
        })
        .catch(function(error) {
          console.log('Hubo un problema con la petición Fetch:' + error.message);
        });     
      }
  
  async function getSeriadoRestanteByTalla(){
//    const url = 'https://backendkayoga-production.up.railway.app/getLotesByIdAparadorAndEstado/'+idAparador+'/'+estadoLote;
    console.log(moldeSelected,serieSelected,tallaSelected )
    const url = 'https://backendkayoga-production.up.railway.app/getSeriadoRestanteByTalla/'+moldeSelected+'/'+serieSelected+'/'+tallaSelected;
      await fetch(url,{
        headers: {
            'Content-Type': 'application/json'
          },
    })
  .then(function(response) {
      if(response.ok) {
          const promesa = response.json();
          promesa.then(function(seriadoByTalla) {
            if(seriadoByTalla!==[]){
              // seriadoByTallaForTransferList = seriadoByTalla;
              setListaTallas(seriadoByTalla);
            }
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
    console.log('render');
    verificarOrdenInyeccionAbierta();
    getSeriadoRestanteByTalla()
  }, [tallaSelected]);

  return (
    <Grid container sx={{zIndex:2,position:'absolute',padding:5, borderRadius:5,
    mt:'',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <Grid container sx={{backgroundColor:'#dfe3e9',p:2,borderRadius:5,display:'flex',justifyContent:'center'}}>

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
        {existeOrden === false ?(
         <>
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
          <TransferList nameTallasProps={talla} seriadoByTallaProps = {listaTallas}></TransferList>
        </>
        ):(
          <Typography variant="h6" sx={{color:'red'}}> Hay una orden creada, no puedes crear otra hasta cerrarla</Typography>
        )}
      </Grid>  
    </Grid>
  );
}

