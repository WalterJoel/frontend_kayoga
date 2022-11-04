import React from 'react';
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
import './App.css'

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto Slab',
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
  return (
    <>
      <ThemeProvider theme={theme}>
      <HeaderGeneral/>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" component={<HomePage/>}>
          <Route index element={<HomePage/>} />
          <Route path="InsertNewLotePage" element={<InsertNewLotePage/>} />
          <Route path="ListLotesPage" element={<ListLotesPage />} />
          <Route path="DetailLotesPage/:idLoteParam/:serieParam" element={<DetailLotesPage />} />
          <Route path="InsertInsertosPage" element={<InsertInsertosPage />} />
          <Route path="ListModelsPage" element={<ListModelsPage/>} />
          <Route path="LoginPage" element={<LoginPage/>} />
          <Route path="AparadorPage" element={<AparadorPage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
      </ThemeProvider>

      </>
  );
}

export default App;
