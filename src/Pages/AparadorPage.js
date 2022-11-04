import {BottomNavigation, 
        Grid,
        Chip,
        Card, Button,
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

  //En el front se pone on Focused la opcion aparado
  const [selected, setSelected] = useState('Aparado');
  const [lotes,setLotes]  = useState([]); 
  //La pantalla me obliga a traer solamente los Aparado
  const [estadoLote,setEstadoLote] = useState('Aparado');


  function handleChange(e,newValue){
    console.log('name',e.target.name);
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
    console.log(selected)
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
        
        />
        <Chip></Chip>
        <Button
          label="Rol -  Aparador"
          color="primary"
          variant="contained"
        >
          ss
        </Button>
        
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
              <BottomNavigationAction name='Aparado' value='Aparado' label="Lotes por Entregar" icon={<ListAltIcon/>}/>
              <BottomNavigationAction name='Resuelto' value='Resuelto' label="Lotes Entregados" icon={<ListAltIcon/>}/>
              <BottomNavigationAction label="Third"  icon={<ListAltIcon/>}/>
          </BottomNavigation>
      </Grid>         
      
      {/* Contenedor de los Acordiones  */}
      <Grid container sx={{display:'flex',mt:2,justifyContent:'center',p:1}}>
          {
          lotes.map((lote,i)=>(
            //Envio los props necesario 
            <AcordionLotesComponent key={i} idLoteProps={lote.idlote} 
                                    infomodeloProps={lote.infomodelo}
                                    serieLoteProps={lote.serieLote} 
                                    talla1Props={lote.talla1}
                                    totalSeriadoInicialProps={lote.total_pares_seriado_inicial}/>
            ))
          }
      </Grid>
    </Container>
    </>
  );
}

export default AparadorPage;