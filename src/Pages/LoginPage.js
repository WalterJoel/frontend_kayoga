import * as React from 'react';
import {useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
/*De esta forma se cargan imagenes en avatar, etc, porque link directo en src, no funciona*/ 
import logoKayoga from '../media/logoKayogaImage.png';
import './LoginPage.css'


//Hook creado por nosotros
import useUser from '../Hooks/useUser';


export default function LoginPage() {
  //Uso mi hook
  const {login,isLoggedIn}=useUser();
  
  const navigateToHomePage = useNavigate();
  const [datosLogin,setDatosLogin] = useState({
    email:'',
    contrasena:''
  });

  useEffect(() =>{
    if(isLoggedIn){
      navigateToHomePage('/');
    }
  },[isLoggedIn]);

  function handleChange(event){
    const value = event.target.value;
    const name  = event.target.name;
    setDatosLogin((prev)=>{
        return {...prev, [name]:value};
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    login();
  }
  /*const handleSubmit = async(event) => {
    event.preventDefault();
    //For Production
    await fetch('http://localhost:4000/login',{
      headers: {
          'Content-Type': 'application/json'
        },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify(datosLogin),
      })
      .then(function(response) {
          if(response.ok) {
              //console.log(response.json());setLoading(false);navigate('/ListLotesPage')
              navigateToHomePage('/');
          } else {
            alert('La cuenta ingresada no esta registrada, revisa bien');
          }
        })
        .catch(function(error) {
          console.log('Hubo un problema con la petición Fetch:' + error.message);
        });
  };*/
  return (
      <Grid container sx={{mt:'7em',display:'flex',alignItems:'center',
                      justifyContent:'center',position:'absolute'}}>
        <Grid sx={{width:'60vw'}}>
        {/* CSS Baseline es como el normalize.css, setea todo lo que ya estaba predefinido */}
        <CssBaseline />
        {/* Imagen Animada */}
      
        <Box 
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            className='logoKayoga'
            component="img"
            sx={{
              maxHeight: { xs: 180 },
              maxWidth: { xs: 180 },
            }}
            alt="The house from the offer."
            src={logoKayoga}
          />
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              onChange={handleChange}
              fullWidth
              label="Correo"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={handleChange}
              name="contrasena"
              label="Contraseña"
              type="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 4, mb: 2 }}
            >
              Entrar
            </Button>
          </Box>
        </Box>
        </Grid>
      </Grid>
  );
}