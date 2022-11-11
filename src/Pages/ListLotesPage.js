import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import {Paper,
        Table,Grid,Avatar,
        Button,
        TableBody,TableCell,TableContainer,TableHead, tableCellClasses ,TablePagination,TableRow, Typography} from '@mui/material';

import { styled } from '@mui/material/styles';
import ListLotesIcon from '../media/ListaLotesIcon.png';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#585858',
      borderRadius:8,
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
  },

  { id: 'color', name:'color', label: 'Color de Lona'},
  {
    id: 'serie', name:'serie', label: 'Serie'},
  {
    id: 'fecha_creacion',
    name:'fecha_creacion',
    label: 'Fecha de Corte',
  },
  {
    id: 'ss',
    label: 'Total de Pares'
  },
  {
    id: 'idlote',
    name:'acciones',
    label: 'acciones'
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
        fetch('https://backendkayoga-production.up.railway.app/getLotesCortados',{
        //For Develop
        //Llamo a la API mediante un FETCH, me retorna una promesa
        //fetch('https://backendkayoga-production.up.railway.app/getLotesByIdAparadorAndEstado/getLotesCortados',{
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
        <Grid container sx={{zIndex:2,position:'absolute',padding:5, borderRadius:5,
        mt:'',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <Grid item container sx={{backgroundColor:'#dfe3e9',mt:'7em',p:2,borderRadius:5}}>
            <Grid item container sx={{alignItems:'center',m:1}} >
              <Grid>
                  <Avatar src={ListLotesIcon} sx={{width:70,height:70}}/>
              </Grid>
              <Grid>     
                <Typography  variant='h4' style={{color:'#143975' }}>
                  Lotes Cortados
                </Typography>
              </Grid>           
            </Grid>

          <Grid item container sx={{backgroundColor:'#f8f9fa',borderRadius:5}}>
          <TableContainer sx={{p:3,justifyContent:'center'}}>
            <Table  stickyHeader aria-label="sticky table">
              <TableHead>
              <TableRow >
                <StyledTableCell align="center" colSpan={7}>
                  Detalles
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
                                  <Button component={Link} to={'/DetailLotesPage/'+value+'/'+row['serie']} variant='outlined'>
                                      Enviar Aparado
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
        </Grid>
        </Grid>
      </Grid>
    );
}
export default ListLotesPage;