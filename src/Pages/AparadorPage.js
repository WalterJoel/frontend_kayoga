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


function App() {
  const ref = useRef(null);

  const [selected, setSelected] = useState(0);
  useEffect(() => {
    //ref.current.scrollTop = 0;
    console.log(' en efect')
    //setMessages(refreshMessages());
  }, [selected]);

  return (
    <>
    {/* Titulo Cabecera */}
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

    <Container  
               sx={{marginTop:'0.7%',
                    borderRadius:3,backgroundColor:'#f2f3f4',
                    width:'80vw',display:'flex',flexDirection: 'column'}}>
    
    <Grid container sx={{ }} elevation={3}>
        <BottomNavigation
            showLabels
            value={selected}
            onChange={(value, newValue) => {
                console.log(newValue);
                setSelected(newValue);
            }}
            style={{ width: "100%",backgroundColor:'#f2f3f4' }}
            >
            <BottomNavigationAction label="Lotes por Entregar" icon={<ListAltIcon/>}/>
            <Divider orientation="vertical" flexItem />
            <BottomNavigationAction label="Lotes Entregados" icon={<ListAltIcon/>}/>
            <Divider orientation="vertical" flexItem />
            <BottomNavigationAction label="Third"  icon={<ListAltIcon/>}/>
        </BottomNavigation>
        <AcordionLotesComponent/>

    </Grid>

    </Container>
    </>
  );
}

export default App;