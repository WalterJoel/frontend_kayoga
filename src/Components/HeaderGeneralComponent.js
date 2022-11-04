import {BottomNavigation, 
    Grid,
    Chip,
    Card, Button,
    Avatar,  
    BottomNavigationAction,Container, Typography, CardContent, CssBaseline } from "@mui/material";
import '../App.css'
import aparadorImage from '../media/aparadorImage.jpg'
import {React,useEffect, useRef} from 'react';


//Uso un ref para usar el scroll del React Dom
import useUser from '../Hooks/useUser';

const HeaderGeneralComponent=()=>{
  const isLoggedIn= useUser();
    return(
        <>
        {/* Encabezado */}
        <CssBaseline />
        <Grid container   sx={{justifyContent:'center',position:'absolute',zIndex:1}}>
          <Grid sx={{width:'80vw',height:'25vh',
                  display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <Grid item sx={{pr:2}}>
            <Avatar src={aparadorImage} sx={{width:90,height:90}}>
            </Avatar>
          </Grid>
          <Grid item  sx={{display:'flex',flexDirection: 'column',p:1,alignItems:'center',pl:2}}>
            <Typography component="h1" variant="h4" sx={{fontWeight:'bold',fontSize:'1em' }}>
                Bienvenido PROPS
            </Typography>
            <Typography component="h1" variant="h6" sx={{fontSize:'1em' }}>
                Detalles de Aparado
            </Typography>
           
          </Grid>
          <Grid item sx={{pl:4}}>
          <Chip
              label="Rol -  Props"
              color="primary"
              sx={{m:1}}        
            />
        {isLoggedIn
            ?<Button
              label="Rol -  Aparador"
              color="primary"
              //onClick={handleCerrarSesion}
              variant="contained"
              sx={{borderRadius:5}}
            >
              Cerrar Sesión
            </Button>
            :
            <Button
              label="Rol -  Props"
              color="primary"
              //onClick={handleCerrarSesion}
              variant="contained"
              sx={{borderRadius:5}}
            >
              Iniciar Sesión
            </Button>
        }
          </Grid>
          </Grid>
        </Grid>
        </>
    )
}
export default HeaderGeneralComponent;