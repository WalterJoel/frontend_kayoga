import {BottomNavigation, 
        Grid,
        Chip,
        Card, Divider,
        Avatar,  
        BottomNavigationAction,Container, Typography, CardContent, CssBaseline } from "@mui/material";
import ListAltIcon from '@mui/icons-material/ListAlt';
import DoneIcon from '@mui/icons-material/ListAltSharp';
import { useState } from "react";
import '../App.css'
import aparadorImage from '../media/aparadorImage.jpg'
import {React,useEffect, useRef} from 'react';
import AcordionLotesComponent from '../Components/AcordionLotesComponent';
//Uso un ref para usar el scroll del React Dom


function AparadorPage(props) {
  const ref = useRef(null);

  const [selected, setSelected] = useState(0);
  const [lotes,setLotes]  = useState([]); 
  const [estadoLote,setEstadoLote] = useState('aparado');


  function handleChange(e,newValue){
    //console.log('name',e.target.name);
    console.log('nEW VALUE',newValue);
    setEstadoLote(newValue);
    setSelected(newValue);
  }

  async function getLotesByIdAparadorAndEstado(){
    const idAparador = 1;
//    const url = 'https://backendkayoga-production.up.railway.app/getLotesByIdAparadorAndEstado/'+idAparador+'/'+estadoLote;
  const url = 'http://localhost:4000/getLotesByIdAparadorAndEstado/'+idAparador+'/'+estadoLote;
    await fetch(url,{
      headers: {
          'Content-Type': 'application/json'
        },
  })
  .then(function(response) {
      if(response.ok) {
          const promesa = response.json();
          promesa.then(function(lotes) {
            setLotes(lotes);
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
    getLotesByIdAparadorAndEstado();
    //ref.current.scrollTop = 0;
    console.log(' en efect')
    //setMessages(refreshMessages());
  }, [selected]);

  return (
    <>
    {/* Encabezado */}
    <Container sx={{marginTop:2,
                    width:'90vw',display:'flex',flexDirection: 'row',alignItems:'center'}}>
      <Avatar src={aparadorImage} sx={{width:90,height:90}}>

      </Avatar>
      <Grid container  sx={{width:'90vw',display:'flex',flexDirection: 'column',p:1,alignItems:'flex-start',ml:'1%'}}>
        <Typography component="h1" variant="h4" sx={{fontWeight:'bold',fontSize:'1em' }}>
            Bienvenido Alex
        </Typography>
        <Typography component="h1" variant="h6" sx={{fontSize:'1em' }}>
            Detalles de Aparado
        </Typography>
       
      </Grid>
      <Grid container>
      <Chip
          label="Rol -  Aparador"
          color="primary"
          deleteIcon={<DoneIcon />}
        />
      </Grid>
    </Container>
  {/* Contenedor General del body */}
    <Container  
               sx={{marginTop:'0.7%',
                    borderRadius:3,backgroundColor:'#f2f3f4',
                    maxWidth:'80vw',display:'flex',flexDirection: 'column'}}>
    
      <Grid container >
          <BottomNavigation
              showLabels
              value={selected}
              onChange={handleChange}
              style={{ width: "100%",backgroundColor:'#f2f3f4' }}
              >
              <BottomNavigationAction name='aparado' value='aparado' label="Lotes por Entregar" icon={<ListAltIcon/>}/>
              <Divider orientation="vertical" flexItem />
              <BottomNavigationAction name='resuelto' value='resuelto' label="Lotes Entregados" icon={<ListAltIcon/>}/>
              <Divider orientation="vertical" flexItem />
              <BottomNavigationAction label="Third"  icon={<ListAltIcon/>}/>
          </BottomNavigation>
      </Grid>         
      
      {/* Contenedor de los Acordiones  */}
      <Grid container sx={{display:'flex',mt:2,justifyContent:'center',p:1}}>
          {
          lotes.map((lote,i)=>(
            //Envio los props necesario 
            <AcordionLotesComponent key={i} idLote={lote.idlote} infomodelo={lote.infomodelo} serieLote={lote.serieLote} />
            ))

          }
      </Grid>
    </Container>
    </>
  );
}

export default AparadorPage;