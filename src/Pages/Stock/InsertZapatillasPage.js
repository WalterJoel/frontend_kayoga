import React,{useState,useEffect} from "react";
import ListAltIcon from '@mui/icons-material/ListAlt';

import {Table,Grid,Avatar,
    Button,BottomNavigation,BottomNavigationAction,
    TableBody,TableCell,TableHead,TableRow, Typography, TextField, TableContainer} from '@mui/material';

import { useNavigate } from 'react-router-dom';
//Importo mis JSON
import {tallasDamaDivision,tallasNinoDivision,tallasVaronJson} from '../../Elements/TallasGeneralJson';

const columnsForNinos = [
    { id: 'idmodelo', 
      name:'idmodelo',
    },
    //Cuando hagamos 24 habilitamos esta opcion de talla 1
    /*{
      id: 'talla1',
      name:'talla1',
    },*/
    {
        id: 'talla2',
        name:'talla2',
    },
    {
        id: 'talla21',
        name:'talla21',
    },
    {
      id: 'talla3',
      name:'talla3',
    },
    {
        id: 'talla31',
        name:'talla31',
    },
    {
      id: 'talla4',
      name:'talla4',
    },
    {
        id: 'talla41',
        name:'talla41',
    },
    {
      id: 'talla5',
      name:'talla5',
    },
    {
        id: 'talla51',
        name:'talla51',
    },
  ];
  const columnsForModelosSerieCompleta = [
    { id: 'idmodelo', 
      name:'idmodelo',
    },
    {
      id: 'talla1',
      name:'talla1',
    },
    {
        id: 'talla2',
        name:'talla2',
    },
    {
      id: 'talla3',
      name:'talla3',
    },
    {
      id: 'talla4',
      name:'talla4',
    },
    {
      id: 'talla5',
      name:'talla5',
    }
  ];
  const columnsForVansDama = [
    { id: 'idmodelo', 
      name:'idmodelo',
    },
    {
      id: 'talla21',
      name:'talla21',
    },
    {
        id: 'talla2',
        name:'talla2',
    },
    {
      id: 'talla3',
      name:'talla3',
    },
    {
      id: 'talla4',
      name:'talla4',
    },
    {
      id: 'talla5',
      name:'talla5',
    }
  ];

/* Esta funcion se maneja de la forma siguiente:
    1.- state zapatillas: Es el json que obtengo de la BD
    2.- state talla: Es el estado que maneja los JSON de el archivo elements para setear tallas segun serie
    3.- state modelo: Es el modelo que se selecciona desde los bottomNavigation

    */
export default function InsertZapatillasPage() {
  // Insertos es un array de multiples json [{},{}]
  const [zapatillas, setZapatillas] = React.useState([]);
  const [talla,setTallas]=useState({});
  const [modelo,setModelo] = useState('');
  const [serieSelected,setSerieSelected]=useState('');
  const [column,setColumn]=useState({});
  const [botomSelected,setBotomSelected]=useState(()=>'');
  let navigate = useNavigate();


  async function getZapatillasBySerie(){
    const url = 'https://backendkayoga-production-fa5a.up.railway.app/getZapatillasBySerie/'+serieSelected+'/'+modelo;
    //const url = 'http://localhost:4000/getZapatillasBySerie/'+serieSelected+'/'+modelo;
      await fetch(url,{
        headers: {
            'Content-Type': 'application/json'
          },
    })
  .then(function(response) {
      if(response.ok) {
          const promesa = response.json();
          promesa.then(function(zapatillas) {
            setZapatillas(zapatillas);
            //console.log(zapatillas);
          });
      } else {
        console.log('Respuesta de red OK pero respuesta HTTP no OK');
      }
    })
    .catch(function(error) {
      console.log('Hubo un problema con la petición Fetch:' + error.message);
    });     
  }
  function handleChange(e,value){
    //Separo el value que viene mediante el caracter '_'
    setBotomSelected(value);
    const arraySerieModelo = value.split('_');
    setSerieSelected(arraySerieModelo[0]);
    setModelo(arraySerieModelo[1]);
    
    if(arraySerieModelo[0] ==='nino'){
      setTallas(tallasNinoDivision);  
      setColumn(columnsForNinos);
    }
    
    else if(arraySerieModelo[0] ==='dama'){
        setTallas(tallasDamaDivision);
        if(arraySerieModelo[1]==='vans'){
            setColumn(columnsForVansDama);   
        }
        //Para casos como el Giana, star, etc, hablando de dama
        else{
            setColumn(columnsForModelosSerieCompleta);   
        }
    }
    else{
        setTallas(tallasVaronJson);  
        setColumn(columnsForModelosSerieCompleta);   
    }
  }
  const handleSubmit= async (e)=>{
    e.preventDefault()
    alert('Estas seguro de enviar la informacion?');
   
    //For Production
    //await fetch('http://localhost:4000/UpdateAllZapatillas',{
    await fetch('https://backendkayoga-production-fa5a.up.railway.app/UpdateAllZapatillas',{
        headers: {
            'Content-Type': 'application/json'
          },
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(zapatillas),
    })
    .then(function(response) {
        if(response.ok) {
            //console.log(response.json());setLoading(false);
            alert('Datos Guardados')
            navigate('/')
        } else {
            alert('No se pudo guardar los datos, comunicate con el programador')
        }
      })
      .catch(function(error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
      });
}
  useEffect(() => {
    //primero Refresh pagina para limpiar valores ingresados anteriormente
    setZapatillas([]);
    console.log(serieSelected, ' ',modelo)
    //Luego demora en llenar las zapatillas
    getZapatillasBySerie();
    console.log('render');
  }, [botomSelected ]);

  return (
    <Grid container sx={{zIndex:2,position:'absolute',padding:5, borderRadius:5,
    mt:'',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <Grid container sx={{backgroundColor:'#dfe3e9',p:2,borderRadius:5,display:'flex',justifyContent:'center'}}>

        <Grid item container sx={{ backgroundColor:'',flexDirection:'row',justifyContent:'space-between',alignItems:'center',m:1}} >                
          <Grid item container sx={{p:2}} xs={7}  >
              <Grid >
                  <Typography variant='h4' sx={{p:1}}>
                      Stock Zapatillas
                  </Typography>
              </Grid>  
          </Grid> 
        </Grid>
        <Grid item container>
          <BottomNavigation
              showLabels
              value={botomSelected}
              onChange={handleChange}
              style={{ width: "100%",height:'100%',backgroundColor:'#f2f3f4',padding:'0.5em',borderRadius:'15px',
                      display:'flex',justifyContent:'center',flexWrap:'wrap'  }}
              >
        {/* Ojo aqui se debe respetar la posicion en el value, primero serie luego el caracter _ luego modelo */}
              <BottomNavigationAction  value='dama_giana' label="Giana Dama" icon={<ListAltIcon/>}/>
              <BottomNavigationAction  value='dama_vans' label="Vans Dama" icon={<ListAltIcon/>}/>
              <BottomNavigationAction  value='nino_vans' label="Vans Niño" icon={<ListAltIcon/>}/>
              <BottomNavigationAction  value='varon_vans' label="Vans Varón" icon={<ListAltIcon/>}/>
              <BottomNavigationAction  value='nino_star' label="Star Niño" icon={<ListAltIcon/>}/>
              <BottomNavigationAction  value='dama_star' label="Star Dama" icon={<ListAltIcon/>}/>
              <BottomNavigationAction  value='varon_star' label="Star Varón" icon={<ListAltIcon/>}/>
          </BottomNavigation>
        </Grid>
        <form onSubmit={handleSubmit}>

        <Grid item container sx={{backgroundColor:'#f2f3f4',borderRadius:5,mt:4}}>
          <TableContainer>
        {serieSelected==='nino' ?
            <TableHead>
                <TableRow >
                <TableCell> </TableCell>
                <TableCell  sx={{fontWeight:'bold'}} >{talla.talla2}</TableCell>
                <TableCell  sx={{fontWeight:'bold'}} >{talla.talla21}</TableCell>
                <TableCell sx={{fontWeight:'bold'}} >{talla.talla3}</TableCell>
                <TableCell sx={{fontWeight:'bold'}} >{talla.talla31}</TableCell>
                <TableCell sx={{fontWeight:'bold'}} >{talla.talla4}</TableCell>
                <TableCell sx={{fontWeight:'bold'}} >{talla.talla41}</TableCell>
                <TableCell sx={{fontWeight:'bold'}} >{talla.talla5}</TableCell>
                <TableCell sx={{fontWeight:'bold'}} >{talla.talla51}</TableCell>
                </TableRow>
            </TableHead>
        :serieSelected==='dama'?
            <TableHead>
                    <TableRow>
                        <TableCell> </TableCell>
                        {modelo!=='vans' &&
                            <TableCell  sx={{fontWeight:'bold'}} >{talla.talla1}</TableCell>
                        }
                        {modelo==='vans' &&
                           <TableCell  sx={{fontWeight:'bold'}} >{talla.talla21}</TableCell>
                        }
                        <TableCell  sx={{fontWeight:'bold'}} >{talla.talla2}</TableCell>
                        <TableCell sx={{fontWeight:'bold'}} >{talla.talla3}</TableCell>
                        <TableCell sx={{fontWeight:'bold'}} >{talla.talla4}</TableCell>
                        <TableCell sx={{fontWeight:'bold'}} >{talla.talla5}</TableCell>
                    </TableRow>
            </TableHead>            
        //Else Para las serie Completas
        :  <TableHead>
                <TableRow >
                <TableCell> </TableCell>
                <TableCell sx={{fontWeight:'bold'}} >{talla.talla1}</TableCell>
                <TableCell sx={{fontWeight:'bold'}} >{talla.talla2}</TableCell>
                <TableCell sx={{fontWeight:'bold'}} >{talla.talla3}</TableCell>
                <TableCell sx={{fontWeight:'bold'}} >{talla.talla4}</TableCell>
                <TableCell sx={{fontWeight:'bold'}} >{talla.talla5}</TableCell>
                </TableRow>
            </TableHead>
          }
          <TableBody>
                  {zapatillas
                    .map((row,i) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                          {column.map((column,f) => {
                      //   La primera fila seteo con valores establecidos luego ya las tallas
                            if(f>0){
                            return (
                              <TableCell key={f} align={column.align}>
                                <TextField 
                                  name={column.name}
                                  required
                                  sx={{width: '5rem'}} 

                                  //id={row.id}
                                  //value={insertos[i][column.name]}
                                  type="number"
                                  value={row[column.name]}
                                  onChange={(e) => onChange(row.idmodelo, column.name,e)}
                                />
                              </TableCell>
                            );
                          }
                          else{
                              return (
                                  <TableCell key={f}  sx={{fontWeight:'bold'}}  align={column.align}>
                                    {row.valor_concatenado}
                                  </TableCell>
                                );
                          }
                          })}
                        </TableRow>
                      );
                    })}
                 
              </TableBody>
          </TableContainer>
          <Grid item container sx={{justifyContent:'center',mt:4}}>
            <Button variant='outlined' sx={{fontWeight:'bold'}}  type="submit">Guardar</Button>
          </Grid>
        </Grid>
        </form>

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
  function showData() {
    console.log(zapatillas);
  }
  function onChange(id, name_campo,e) {
    const value = e.target.value;

    setZapatillas((prevState) =>
      prevState.map((row) =>
       (row['idmodelo']===id? { ...row, [name_campo]: value } : row)
      )
    );
  

}}

