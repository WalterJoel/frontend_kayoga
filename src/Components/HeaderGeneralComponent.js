import {BottomNavigation, 
    Grid,
    Chip,Box,
    CardMedia, Button,Typography, } from "@mui/material";
import aparadorImage from '../media/aparadorImage.jpg'
import {React,useEffect} from 'react';
import letraK from '../media/letrak.png';
import logoK from '../media/k.png';
import letterK from '../media/letter-k.png';

import { Link,useLocation} from 'react-router-dom';

const HeaderGeneralComponent=()=>{
  const {pathname} = useLocation();
  //Array donde coloco las rutas en las cuales prohibo el home
  const ocultarDe = ["/AparadorPage"];

    return(
        <>
        {/* Encabezado */}
        <Grid container   sx={{justifyContent:'center',zIndex:1,mt:2,height:'15vh'}}>
          <Grid item sx={{width:'100vw',
            display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
            {/* Oculto el logo para cierta rutas */}
            {!ocultarDe.includes(pathname) &&
              <Link to='/'  >
                    <Button>
                        <CardMedia
                            component="img"
                            height="100"
                            image={logoK}
                        />
                    </Button>
              </Link>
            }
            <Grid item  sx={{display:'flex',flexDirection: 'column',p:1,alignItems:'center',pl:1}}>
              <Typography component="h1" variant="h4" sx={{fontWeight:'bold',fontSize:'1em' }}>
                  Bienvenido PROPS
              </Typography>
              {/* <Typography component="h1" variant="h6" sx={{fontSize:'1em' }}>
                  Detalles de Aparado
              </Typography> */}
            
            </Grid>
            <Grid item sx={{pr:1}}>
            <Chip
                label="Rol -  Props"
                color="primary"
              />
              {/* <Button
                label="Rol -  Aparador"
                color="primary"
                //onClick={handleCerrarSesion}
                variant="contained"
                sx={{borderRadius:5}}
              >
                Cerrar Sesión
              </Button> */}
            </Grid>
            <Grid item>          
              <Box

                className='logoKayoga'
                sx={{
                  maxHeight: { xs: 160 },
                  maxWidth: { xs: 160 },
                }}
                component="img"
                src={letraK}
              />
            </Grid>

          </Grid>
        </Grid>
        </>
    )
}
export default HeaderGeneralComponent;