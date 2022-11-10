import React,{useState,useEffect} from "react";
import ListAltIcon from '@mui/icons-material/ListAlt';

import {Paper,
    Table,Grid,Avatar,
    Button,BottomNavigation,BottomNavigationAction,
    TableBody,TableCell,TableContainer,TableHead, tableCellClasses ,TablePagination,TableRow, Typography, TextField} from '@mui/material';
import { fontWeight } from "@mui/system";

import {tallasDamaJson,tallasNinoJson,tallasVaronJson} from '../Elements/TallasGeneralJson';

const columns = [
    { id: 'idinserto', 
      name:'idinserto',
      label: '#Lote', 
      minWidth: 50 ,    
      format: (value) => '# '+value ,
    },
    {
      id: 'talla1',
      name:'talla1',
      label: 'talla1',
      minWidth: 100,
      align: 'right',
    },
    {
        id: 'talla2',
        name:'talla2',
        label: 'talla2',
        minWidth: 100,
        align: 'right',
    },
    {
      id: 'talla3',
      name:'talla3',
      label: 'talla 3',
      minWidth: 100,
      align: 'right',
    },
    {
      id: 'talla4',
      name:'talla4',
      label: 'talla 4',
      minWidth: 100,
      align: 'right',
    },
    {
      id: 'talla5',
      name:'talla5',
      label: 'talla 5',
      minWidth: 100,
      align: 'right',
    },
  ];

export default function App() {
  const [insertos, setInsertos] = React.useState([]);
  const [talla,setTallas]=useState({});
  const [selected, setSelected] = useState('');

  async function getInsertosBySerie(){
//    const url = 'https://backendkayoga-production.up.railway.app/getLotesByIdAparadorAndEstado/'+idAparador+'/'+estadoLote;
    const url = 'https://backendkayoga-production.up.railway.app/getLotesByIdAparadorAndEstado/getInsertosBySerie/'+selected;
      await fetch(url,{
        headers: {
            'Content-Type': 'application/json'
          },
    })
  .then(function(response) {
      if(response.ok) {
          const promesa = response.json();
          promesa.then(function(insertos) {
            setInsertos(insertos);
          });
      } else {
        console.log('Respuesta de red OK pero respuesta HTTP no OK');
      }
    })
    .catch(function(error) {
      console.log('Hubo un problema con la petición Fetch:' + error.message);
    });     
  }
  function showData(){
    console.log(insertos)
  }
  function handleChange(e,value){
    if(value==='nino'){
      setTallas(tallasNinoJson);  
    }
    else if(value==='dama'){
        setTallas(tallasDamaJson);
    }
    else{
        setTallas(tallasVaronJson);  
    }

    setSelected(value);
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    alert('Estas seguro de enviar la informacion?');
   
    //For Production
    fetch('https://backendkayoga-production.up.railway.app/getLotesByIdAparadorAndEstado/UpdateAllInsertos',{
        headers: {
            'Content-Type': 'application/json'
          },
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(insertos),
    })
    .then(function(response) {
        if(response.ok) {
            //console.log(response.json());setLoading(false);navigate('/ListLotesPage')
        } else {
          console.log('Respuesta de red OK pero respuesta HTTP no OK');
        }
      })
      .catch(function(error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
      });
}
  useEffect(() => {
    getInsertosBySerie();
    setInsertos([]);
    console.log('render');
    //ref.current.scrollTop = 0;
    //setMessages(refreshMessages());
  }, [selected ]);

  return (
    <Grid container sx={{zIndex:2,position:'absolute',padding:5, borderRadius:5,
    mt:'',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <Grid container sx={{backgroundColor:'#dfe3e9',mt:'7em',p:2,borderRadius:5,display:'flex',justifyContent:'center'}}>

        <Grid item container sx={{ backgroundColor:'',flexDirection:'row',justifyContent:'space-between',alignItems:'center',m:1}} >                
          <Grid item container sx={{p:2}} xs={7}  >
              <Grid >
                  <Avatar  sx={{width:70,height:70}}/>
              </Grid>
              <Grid >
                  <Typography variant='h4' sx={{p:1}}>
                      Stock Insertos
                  </Typography>
              </Grid>   
          </Grid> 
        </Grid>
        <Grid item container>
          <BottomNavigation
              showLabels
              value={selected}
              onChange={handleChange}
              style={{ width: "100%",backgroundColor:'#f2f3f4',padding:'0.5em',borderRadius:'15px' }}
              >
              <BottomNavigationAction name='dama' value='dama' label="Dama" icon={<ListAltIcon/>}/>
              <BottomNavigationAction name='nino' value='nino' label="Niño" icon={<ListAltIcon/>}/>
              <BottomNavigationAction name='varon' value='varon' label="Varón" icon={<ListAltIcon/>}/>
          </BottomNavigation>
        </Grid>
        <Grid item container sx={{backgroundColor:'',borderRadius:5,p:'2em'}}>
          <Table>
          <TableHead>
            <TableRow >
              <TableCell> </TableCell>
              <TableCell  sx={{fontWeight:'bold'}} >{talla.talla1}</TableCell>
              <TableCell  sx={{fontWeight:'bold'}} >{talla.talla2}</TableCell>
              <TableCell sx={{fontWeight:'bold'}} >{talla.talla3}</TableCell>
              <TableCell sx={{fontWeight:'bold'}} >{talla.talla4}</TableCell>
              <TableCell sx={{fontWeight:'bold'}} >{talla.talla5}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
                  {insertos
                    .map((row,i) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                          {columns.map((column,f) => {
                      //   La primera fila seteo con valores establecidos luego ya las tallas
                            if(f>0){
                            return (
                              <TableCell key={f} align={column.align}>
                                <TextField 
                                  name={column.name}
                                  required
                                  //id={row.id}
                                  //value={insertos[i][column.name]}
                                  value={row[column.name]}
                                  onChange={(e) => onChange(row.idinserto, column.name,e)}
                                />
                              </TableCell>
                            );
                          }
                          else{
                              return (
                                  <TableCell name={column.name} sx={{fontWeight:'bold'}}  align={column.align}>
                                    {row.info_inserto}
                                  </TableCell>
                                );
                          }
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
          </Table>
          <Grid item container sx={{justifyContent:'center',mt:4}}>
            <Button variant='outlined' sx={{fontWeight:'bold'}} onClick={handleSubmit} type="submit">Guardar</Button>
          </Grid>
        </Grid>
      </Grid>  
    </Grid>
  );
  /*function onChange(id, val) {
    console.log(id,' ',val)
    setState((prevState) =>
      prevState.map((row) =>
        row.map((col) => (col.id === id ? { ...col, value: val } : col))
      )
    );
  }*/
  function onChange(id, name_campo,e) {
    console.log('aqyi: ',id,' ',name_campo,' ',e.target.value);
    const value = e.target.value;
  /*  setFormSeriado((prev)=>{
        return {...prev, [name]:value};
    });
*/

    //Hay que iterar porqe no sabes q posicion ir y eso lo obtiens en ROW, GIL
    /*setState((prevState) =>
      prevState.map((row) =>
      row.map((col) => (col.id === id ? { ...col, value: val } : col))
    //)
      // (row['idinserto']===7? { ...row, ['talla1']: 123  )

    );*/

    setInsertos((prevState) =>
      prevState.map((row) =>
       (row['idinserto']===id? { ...row, [name_campo]: value } : row)
      )
    );
    
    // setState((prevState) =>
    //   prevState.map((row) =>
    //    (row['idinserto']===7? { ...row, ['talla1']: 123 } : row)
    //   )
    // );

}}

