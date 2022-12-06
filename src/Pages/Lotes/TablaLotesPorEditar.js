import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {Grid, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const columns = [
  { field: 'idlote', headerName: '# LOTE' },
  { field: 'S', headerName: 'First name' },
  { field: 'metraje', headerName: 'METRAJE'},
  {
    field: 'estado',
    headerName: 'ESTADO',
  }
];


export default function TablaLotesPorEditar(props) {
    let navigate = useNavigate();
    let rows = props.rowsProps;
    //Consigo todo el array de lotes
    rows = rows.map(lote=>lote);
    function onRowClick(event){
      navigate('/EditarLotePage/'+event.id)
      console.log(event)
    }
  return (

    <Grid container sx={{backgroundColor:'#ffffff',borderRadius:5,justifyContent:'center',flexGrow:1, height: 400, width: '50%' }}>
      <DataGrid
        sx={{p:3,flexGrow:1,
          '& .super-app-theme--header': {
          fontSize: '10px'}
        }}
        rows={rows}
        columns={columns}
        //pageSize={5}
        //rowsPerPageOptions={[5]}
        getRowId={(row) => row.idlote}
        onRowClick={onRowClick}
      />
    </Grid>
  );
}
