import React, { useEffect } from 'react';
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
  { id: 'idlote', 
    name:'idlote',
    label: '#Lote', 
    minWidth: 50 ,    
    format: (value) => '# '+value ,

  },
  {
    id: 'metraje',
    name:'metraje',
    label: 'Metraje',
    minWidth: 100,
    align: 'right',
    format: (value) => value + ' metros ',
  },

  { id: 'color', name:'color', label: 'Color', minWidth: 100 },
  {
    id: 'fecha_creacion',
    name:'fecha_creacion',
    label: 'Fecha de Corte',
    minWidth: 100,
    align: 'right',
    format: (date) => date.toLocaleString('America/Lima'),
  },
  {
    id: 'ss',
    label: 'Total de Pares',
    minWidth: 50,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'idlote',
    name:'acciones',
    label: 'acciones',
    minWidth: 50,
    align: 'right',
  }
];

const ListLotesPage=()=>{
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
            console.log('entertaiment')
        fetch('http://localhost:4000/getLotesCortados',{
        //For Develop
        //Llamo a la API mediante un FETCH, me retorna una promesa
        //fetch('http://localhost:4000/getLotesCortados',{
            headers: {
                'Content-Type': 'application/json'
              },
        })
        //Cuando la peticion finalize, hago q devuelva un json, tambien es una promesa
        .then(response => response.json())
        //Finamente tenemos la respuesta en formato objeto
        //Utilizo reverse para mostrar primero los ultimos insertados
        .then((lote)=>setRows(lote.reverse()))
        .catch(()=> console.log('Algo salio mal al requerir lotes cortados'));

    },[]);
    return(
        <div style={{padding:16, margin:'auto', maxWidth:1000, backgroundColor:'#f1f1f1'}}>
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
    );
}
export default ListLotesPage;