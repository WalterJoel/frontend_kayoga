import {BottomNavigation, 
        Grid,Select,MenuItem,
        Avatar,  
        BottomNavigationAction,Typography} from "@mui/material";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useState } from "react";
import '../App.css'
import {React,useEffect, useRef} from 'react';
import AccordionForEntregaAparadorComponent from '../Components/AccordionForEntregaAparadorComponent';
import avatarAparador from '../media/avatarAparador.png';

//Uso un ref para usar el scroll del React Dom

function AparadorPage(props) {

  //En el front se pone on Focused la opcion aparado
  const [selected, setSelected] = useState('');
  const [lotes,setLotes]  = useState([]); 

  //La pantalla me obliga a traer solamente los Aparado
  const [estadoLote,setEstadoLote] = useState('');


  function handleChange(e,newValue){
    console.log('name',e.target.name);
    console.log('nEW VALUE',newValue);
    setEstadoLote(newValue);
    setSelected(newValue);
  }
  

  async function getLotesByIdAparadorAndEstado(){
//    const url = 'https://backendkayoga-production-fa5a.up.railway.app/getLotesByIdAparadorAndEstado/'+idAparador+'/'+estadoLote;
  const url = 'https://backendkayoga-production-fa5a.up.railway.app/getLotesByIdAparadorAndEstado/'+props.idAparador+'/'+estadoLote;
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
    setLotes([]);// ver si funciona
    getLotesByIdAparadorAndEstado();
    //ref.current.scrollTop = 0;

    //setMessages(refreshMessages());
  }, [selected]);

  return (
    <>

  {/* Contenedor General del body */}
  {/* Contenedor General del body */}
  <Grid container sx={{zIndex:2,position:'absolute',padding:5, borderRadius:5,
                mt:'',display:'flex',alignItems:'center',justifyContent:'center'}}>

    <Grid sx={{backgroundColor:'#dfe3e9',mt:'0em',p:2,borderRadius:5}}>
        <Grid item container >
            {/* Info Title */}
            <Grid item container sx={{ backgroundColor:'',flexDirection:'row',alignItems:'center',m:1}} >                
                <Grid item container sx={{p:2,justifyContent:'space-around'}}   >
                    <Grid item >
                        <Avatar src={avatarAparador} sx={{width:70,height:70}}/>
                    </Grid>
                    <Grid item >
                        <Typography variant='h4' sx={{p:1}}>
                           Lotes
                        </Typography>
                    </Grid>   
                </Grid> 
                {/* <Grid  item sx={{}} xs={5} >                   
                        <Grid>
                            <Select
                                sx={{fontWeight:'bold'}}
                                required
                                label='feo'
                                value = {aparadorSelected}
                                name = 'idaparador' 
                                onChange={handleChangeSelect}
                                >
                                <MenuItem key='1' value='1'> Alex</MenuItem>
                                <MenuItem key='2' value='2'>Elesban</MenuItem>
                                <MenuItem key='3' value='3'>  José Inga</MenuItem>

                            </Select>
                        </Grid> 
                </Grid> */}
            </Grid>  
        <Grid container >
            <BottomNavigation
                showLabels
                value={selected}
                onChange={handleChange}
                style={{ width: "100%",backgroundColor:'#f2f3f4' }}
                >
                <BottomNavigationAction name='Aparado' value='Aparado' label="Lotes por Entregar" icon={<ListAltIcon/>}/>
                {/* <BottomNavigationAction name='Resuelto' value='Resuelto' label="Lotes Entregados" icon={<ListAltIcon/>}/> */}
            </BottomNavigation>
        </Grid>          
      
      {/* Contenedor de los Acordiones  */}
      <Grid container sx={{display:'flex',mt:2,justifyContent:'center',p:1}}>
          {
          lotes.map((lote,i)=>(
            //Envio los props necesario 
            <AccordionForEntregaAparadorComponent key={i} idLoteProps={lote.idlote} 
                                    infomodeloProps={lote.infomodelo}
                                    serieLoteProps={lote.serieLote} 
                                    
                                    talla1Props={lote.talla1Seriado}
                                    talla2Props={lote.talla2Seriado}
                                    talla3Props={lote.talla3Seriado}
                                    talla4Props={lote.talla4Seriado}
                                    talla5Props={lote.talla5Seriado}

                                    totalSeriadoInicialProps={lote.total_pares_seriado_inicial}/>
            ))
          }
      </Grid>
      </Grid>
        </Grid>         
        </Grid>         
    </>
  );
}
export default AparadorPage;