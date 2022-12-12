import React,{useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';

import {
    Table,Grid,Avatar,
    Button, Snackbar,
    TableBody,TableCell,TableHead,TableRow, Typography, TextField} from '@mui/material';

    const columns = [
        {
          name:'infomodelo',
        },
        {
          name:'talla_name',
        },
        {
          name:'vacio'
        }
      ];
    
const OrdenInyeccionGeneradaVistaSimple = () => {
    
    const [ordenInyeccionGenerada,setOrdenInyeccionGenerada] = useState([]);
    const [paresInyectados,setParesInyectados] = useState([]);
    let navigate = useNavigate();

    async function handleSubmit(){
      //Sumo la cantidad de pares que ingreso el maquinista
      let pares_inyectados = 0;
      paresInyectados.forEach(element => pares_inyectados += parseInt(element['cantidad']));

      let answer = window.confirm(" Has inyectado: "+ pares_inyectados +' pares?');
      if (answer) {
        //await fetch('http://localhost:4000/saveOrdenInyeccionMaquinista',{
        await fetch('https://backendkayoga-production-fa5a.up.railway.app/saveOrdenInyeccionMaquinista',{
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(paresInyectados),
              method: 'POST', // *GET, POST, PUT, DELETE, etc.
          })
          .then(function(response) {
              if(response.ok) {
                alert('Datos Guardados Correctamente');
                navigate('/')
              }
              else {
                  console.log('Respuesta de red OK pero respuesta HTTP no OK');
                  }
          })
          .catch(function(error) {
              alert('El servidor ha fallado, intenta de nuevo, sino comunicate con el programador')
          });
      }
      else {
          alert('Revisa las cantidades y guarda de nuevo')
      }

    }
    function onChange(idseriadorestante, talla_name,e) {
        const value = e.target.value;
        const name_campo ='cantidad'
        setParesInyectados((prevState) =>
          prevState.map((row) =>
          (row['idseriadorestante']===idseriadorestante && row['talla_name']===talla_name? 
          { ...row, [name_campo]: value } : row)
          )
        );
    }
    //Obtengo el JSon que se guardo en la tabla watch_produccion_inyeccion
    async function  getOrdenInyeccionJson(){   
        //For Production
        await fetch('https://backendkayoga-production-fa5a.up.railway.app/getOrdenInyeccion',{
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
        })
        .then(function(response) {
            if(response.ok) {
                const promesa = response.json();
                promesa.then(function(ordenInyeccion) {
                   setOrdenInyeccionGenerada(ordenInyeccion);
                   setParesInyectados(ordenInyeccion[0].orden_inyeccion);
                }); 
            }
            else {
                console.log('Respuesta de red OK pero respuesta HTTP no OK');
                }
        })
        .catch(function(error) {
            console.log('Hubo un problema con la petición Fetch:' + error.message);
        });
    }

    useEffect(() => {
        getOrdenInyeccionJson();
        //console.log(ordenInyeccionGenerada);
    }, []);
    if(ordenInyeccionGenerada.length>0) {
    return( 
        <>

        <Grid container sx={{zIndex:2,position:'absolute',padding:5, borderRadius:5,
             mt:'',display:'flex',alignItems:'center',justifyContent:'center'}}>
         <Grid container sx={{backgroundColor:'#dfe3e9',p:2,borderRadius:5,display:'flex',justifyContent:'center'}}>

        <Grid item container sx={{ backgroundColor:'',flexDirection:'row',justifyContent:'space-between',alignItems:'center',m:1}} >                
          <Grid item container sx={{p:2, justifyContent:'space-around'}}  >
              <Grid >
                  <Avatar  sx={{width:70,height:70}}/>
              </Grid>
              <Grid >
                  <Typography variant='h4' sx={{p:1}}>
                      Orden de Inyección # {ordenInyeccionGenerada[0].idwatch_produccion_inyeccion}
                  </Typography>
              </Grid>   
              <Grid item container sx={{fontWeight:'bold',maxWidth:'20em',backgroundColor:'#8dafc6', borderRadius:5,justifyContent:'center',mt:1}}>
                <Grid item >
                  <Typography variant='h6' sx={{p:1}}>
                      Fecha: {ordenInyeccionGenerada[0].fecha_creacion} 
                  </Typography>
                </Grid>      
                <Grid item container sx={{justifyContent:'center'}} >
                    <Typography variant='h6' sx={{p:1}}>
                      Total: {ordenInyeccionGenerada[0].pares_orden} Pares
                    </Typography>
                </Grid>      
              </Grid>   
          </Grid> 
        </Grid>
       
        <Grid item container sx={{backgroundColor:'',borderRadius:5,p:'2em'}}>
          <Table sx={{maxWidth:'100%',maxHeight:'100%'}}>
          <TableHead>
            <TableRow >
              <TableCell sx={{fontWeight:'bold',color:'red'}}> Modelo </TableCell>
              <TableCell  sx={{fontWeight:'bold',color:'red'}} >Talla</TableCell>
              <TableCell  sx={{fontWeight:'bold',color:'blue'}} >Pares Inyectados</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
                  {(paresInyectados)
                    .map((row,i) => {
                      row['idwatch_produccion_inyeccion']= ordenInyeccionGenerada[0].idwatch_produccion_inyeccion;
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={i} >
                          {columns.map((column,f) => {
                            if(f>1){
                            return(
                              <TableCell key={f} align={column.align}>
                                <TextField 
                                  name='cantidad'
                                  required
                                  sx={{maxWidth:'5em'}}
                                  value={row['cantidad']}
                                  onChange={(e) => onChange(row.idseriadorestante, row.talla_name,e)}
                                />
                              </TableCell>
                            )}
                            else{
                              return (
                                  <TableCell name={column.name} sx={{fontWeight:'bold'}}  align={column.align}>
                                    {row[column.name]}
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
    </>
    );
    }
}

export default OrdenInyeccionGeneradaVistaSimple;