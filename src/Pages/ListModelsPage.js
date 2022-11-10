import React,{useEffect,useState} from "react";
import {useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import {Paper,
        Table,
        Button,
        TableBody,TableCell,TableContainer,TableHead, tableCellClasses ,TablePagination,TableRow, Typography} from '@mui/material';

import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 18,
    },
  }));
const columns = [
    { id: 'idmodelo', 
      name:'modelo',
      label: '#Código Modelo', 
      minWidth: 50 ,    
      format: (value) => '# '+value ,
  
    },
    {
      id: 'nombre_modelo',
      name:'nombre_modelo',
      label: 'Modelo',
      minWidth: 100,
      align: 'right',
      format: (value) => value + ' metros ',
    },
    {
        id: 'serie_modelo',
        name:'serie_modelo',
        label: 'Serie Modelo',
        minWidth: 100,
        align: 'right',
        format: (value) => value + ' metros ',
    },
    {
        id: 'tipo_modelo',
        name:'tipo_modelo',
        label: 'Tipo Modelo',
        minWidth: 100,
        align: 'right',
        format: (value) => value + ' metros ',
    },
    {
        id: 'idcolormodelo',
        name:'idcolormodelo',
        label: 'Color Modelo',
        minWidth: 100,
        align: 'right',
    },
    {
        id: 'color_modelo',
        name:'color_modelo',
        label: 'ID Color Modelo',
        minWidth: 100,
        align: 'right',
        format: (value) => value + ' metros ',
    },
    {
        id: 'color_inserto',
        name:'nombre_modelo',
        label: 'Inserto',
        minWidth: 100,
        align: 'right',
        format: (value) => value + ' metros ',
    },
    {
        id: 'idinserto',
        name:'idinserto',
        label: 'ID Inserto',
        minWidth: 100,
        align: 'right'
    },
    {
        id: 'modelo_inserto',
        name:'modelo_inserto',
        label: 'Modelo Inserto',
        minWidth: 50,
        align: 'right',
    },
    {
        id: 'serie_inserto',
        name:'serie_inserto',
        label: 'Serie Inserto',
        minWidth: 50,
        align: 'right',
    },
    {
      id: 'idmodelo',
      name:'acciones',
      label: 'acciones',
      minWidth: 50,
      align: 'right',
    }
];
    
const DetailLotesPage =() => {
    const [page, setPage] = React.useState(0);
    const [rows,setRows] = React.useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
    setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    };
    
    useEffect(()=>{
        const url='https://backendkayoga-production.up.railway.app/getAllModelos';
        //const url='https://backendkayoga-production.up.railway.app/getLotesByIdAparadorAndEstado/getLoteById/'+idLote;
        fetch(url,{
            headers: {
                'Content-Type': 'application/json'
                },
        })
        .then(function(response){
            if(response.ok){
                const promesa = response.json();
                //Extraigo el resultado de la promesa
                promesa.then(function(modelosResult){
                    setRows(modelosResult.reverse());
                    console.log(modelosResult);
                })
            }
            
        })
        .catch(()=> console.log('Algo salio mal al requerir lotes cortados'));

    },[]);
    return(
                <div style={{padding:16, margin:'auto', maxWidth:1500, backgroundColor:'#f1f1f1'}}>
        <Typography  variant='h5' style={{color:'#143975', margin:'1em' }}>
            Lotes Cortados
        </Typography>
        <Paper >
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table  stickyHeader aria-label="sticky table">
            <TableHead>
            <TableRow >
              <StyledTableCell align="center" colSpan={3}>
                Country
              </StyledTableCell>
              <StyledTableCell align="center" colSpan={3}>
                Details
              </StyledTableCell>
            </TableRow>
              <TableRow>
                {columns.map((column,e) => (
                  <StyledTableCell
                    key={e}
                    align={column.align}
                    style={{ top: 57, minWidth: column.minWidth }}
                  > 
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .map((row,i) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                      {columns.map((column,f) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={f} align={column.align}>
                            {/* Si es un numero */}
                            {column.format && typeof value === 'number'
                              ? column.format(value) 
                            //   Si es una accion
                              :column.label==='acciones' ?
                                //column.format(value)
                                <Button component={Link} to={'/DetailLotesPage/'+value+'/'+row['serie']} variant='contained'>
                                    Ver Detalle
                                </Button>
                                // caso contrario 
                              :value
                            }
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      </div>
    )
}
export default DetailLotesPage;