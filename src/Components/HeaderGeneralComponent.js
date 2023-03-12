import {BottomNavigation, 
    Grid,
    CardMedia, Button,Typography, } from "@mui/material";
import {Link, useNavigate } from 'react-router-dom';

import {React,useEffect} from 'react';
import logoK from '../media/k.png';


const HeaderGeneralComponent=(props)=>{
  
  let navigate = useNavigate();
  const handleCerrarSesion = async(event) => {
    event.preventDefault();
    // Quitamos el token del local storage
    localStorage.removeItem('token');
    window.location.reload(false);
  };

    return(
        <>
        {/* Encabezado */}
        <Grid container   sx={{justifyContent:'center',zIndex:1,mt:2,height:'15vh'}}>
          <Grid item sx={{width:'100vw',
            display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
            {/* Oculto el logo para cierta rutas */}
              <Link to='/'  >
                    <Button>
                        <CardMedia
                            component="img"
                            height="100"
                            image={logoK}
                        />
                    </Button>
              </Link>
            <Grid item  sx={{display:'flex',flexDirection: 'column',p:1,alignItems:'center',pl:1}}>
              <Typography component="h1" variant="h4" sx={{fontWeight:'bold',fontSize:'1em' }}>
                  Bienvenido {props.rolUser}
              </Typography>
              {/* <Typography component="h1" variant="h6" sx={{fontSize:'1em' }}>
                  Detalles de Aparado
              </Typography> */}
            
            </Grid>
            <Grid item sx={{pr:1}}>
               <Button
                color="primary"
                onClick={handleCerrarSesion}
                variant="outlined"
                sx={{borderRadius:3}}
              >
                Cerrar Sesión
              </Button>
            </Grid>
            {/* <Grid item>          
              <Box

                className='logoKayoga'
                sx={{
                  maxHeight: { xs: 160 },
                  maxWidth: { xs: 160 },
                }}
                component="img"
                src={letraK}
              />
            </Grid> */}

          </Grid>
        </Grid>
        </>
    )
}
export default HeaderGeneralComponent;