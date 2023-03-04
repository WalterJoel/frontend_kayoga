import React,{useEffect} from 'react';
import './App.css';
import { css, Global } from "@emotion/react";

//import { MuiThemeProvider, createMuiTheme } from '@mui/material/styles';
//import {MuiThemeProvider, createMuiTheme} from "@mui/material/styles";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';


import HomePage from './Pages/HomePage';
import {BrowserRouter , Routes, Route} from 'react-router-dom';
import ListLotesPage from './Pages/ListLotesPage';
import ListModelsPage from './Pages/ListModelsPage';
import DetailLotesPage from './Pages/DetailLotesPage';
import InsertInsertosPage from './Pages/InsertInsertosPage';
import InsertNewLotePage from './Pages/InsertNewLotePage';
import LoginPage from './Pages/LoginPage';
import AparadorPage from './Pages/AparadorPage';
import HeaderGeneral from './Components/HeaderGeneralComponent'
import InfoAparadoresPage from './Pages/InfoAparadoresPage'
import ListAllLotesByState from './Pages/ListAllLotesByState';
import LotesPorContarPage from './Pages/LotePorContarPage';
import SepararLotePage from './Pages/SepararLotePage';
import OrdenInyeccionPage from './Pages/Inyeccion/OrdenInyeccionPage';
import InsertZapatillasPage from './Pages/Stock/InsertZapatillasPage';
import EditarLotePage from './Pages/Lotes/EditarLotePage';
import OrdenInyeccionGenerada from './Pages/Inyeccion/OrdenInyeccionGenerada';
import OrdenInyeccionGeneradaVistaSimple from './Pages/Inyeccion/OrdenInyeccionGeneradaVistaSimple';
import ListaLotesPorEditar from './Pages/Lotes/ListaLotesPorEditar';
import ListLotesCortadosPorEstampar from './Pages/Estampado/ListLotesCortadosPorEstampar';
import jwtDecode from 'jwt-decode';

//Middleware para proteger las rutas
import { ProtectedRoute} from './Middlewares/ProtectedRoutes';
//Importo mi Hook Personalizado
import useToken from './Hooks/useToken'
//Importo el archivo login

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto Slab',
    h4:{
      color:'#143975'
    }
  },
  palette:{
    primary:{
      main:'#2b79b0'
    },
    textfield_kayoga:{
      main:'rgb(254,182,0)'
    },
    celeste_kayoga:{
      main:'#2b79b0'
    },
    // Cambiando el Color del body
    background:{
      default:'#f8f9fa' 
    },
    // Cambiando el color del texto
    text:{
      primary:'#344767'
    }
  },
});

// Defino estilos que usare para toda mi app
function App() {

  //Utilizo mi propio Hook
  const {token, setToken} = useToken() 
  if(!token){
      {return <LoginPage setToken={setToken}/>}
    }
  //Funcion para parsear mi token
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };
  

  //Verificamos si el token ha expirado
  const dataJson     = localStorage.getItem('token')
  const decodedToken = parseJwt(dataJson);
  if(decodedToken.exp*1000 < Date.now() ){
      localStorage.clear()
  }


  const dataUser   = JSON.parse(dataJson)
  const rolUser    = dataUser.onlyDataUser.rol;
  const idAparador = dataUser.onlyDataUser.idusuario;

  return (
    <>
      <ThemeProvider theme={theme}>
      <BrowserRouter>
        <HeaderGeneral rolUser={rolUser} />
        <Routes>
          <Route exact path="/" component={<HomePage rolUser={rolUser}/>}>
          <Route index element={<HomePage rolUser={rolUser}/>} />
          <Route path="InsertNewLotePage" element={<InsertNewLotePage/>} />
          <Route path="EditarLotePage/:idLote" element={ 
              <EditarLotePage/>
            } 
          />
          <Route path="ListLotesPage" element={<ListLotesPage />} />
          <Route path="ListLotesCortadosPorEstampar" element={<ListLotesCortadosPorEstampar/>} />
          <Route path="DetailLotesPage/:idLoteParam/:serieParam" element={<DetailLotesPage />} />
          <Route path="InsertInsertosPage" element={<InsertInsertosPage />} />
          <Route path="ListModelsPage" element={<ListModelsPage/>} />
          <Route path="LoginPage" element={<LoginPage/>} />
          <Route path="AparadorPage" element={<AparadorPage idAparador={idAparador}/>}   />
          <Route path="InfoAparadoresPage" element={<InfoAparadoresPage/>} />
          <Route path="ListAllLotesByState" element={<ListAllLotesByState/>} />          
          <Route path="LotesPorContarPage" element={<LotesPorContarPage/>} />       
          <Route path="SepararLotePage" element={<SepararLotePage/>} />             
          <Route path="OrdenInyeccionPage" element={<OrdenInyeccionPage/>} />       
          <Route path="InsertZapatillasPage" element={<InsertZapatillasPage/>} />       
          <Route path="OrdenInyeccionGenerada" element={<OrdenInyeccionGenerada/>} />    
          <Route path="OrdenInyeccionGeneradaVistaSimple" element={<OrdenInyeccionGeneradaVistaSimple/>} />               
          <Route path="ListaLotesPorEditar" element={<ListaLotesPorEditar/>} />        
      
          </Route>
        </Routes>
      </BrowserRouter>
      </ThemeProvider>

      </>
  );
}

export default App;
