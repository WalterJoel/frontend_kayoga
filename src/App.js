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
/*ADDING COMENTARY y mas*/ 
/*
const THEME = createMuiTheme({
  typography: {
   "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
   "fontSize": 14,
   "fontWeightLight": 300,
   "fontWeightRegular": 400,
   "fontWeightMedium": 500
  }
});*/

const theme = createTheme({
  typography: {
    fontFamily: 'Quattrocento',
  },
  palette:{
    primary:{
      main:'#2b79b0'
    }
  }

});
function App() {
  return (
    <>
          <ThemeProvider theme={theme}>
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
