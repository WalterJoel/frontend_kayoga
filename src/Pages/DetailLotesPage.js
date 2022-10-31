import React,{useEffect,useState} from "react";
import {useParams } from 'react-router-dom';
import {tallasDamaJson,tallasNinoJson,tallasVaronJson} from '../Elements/TallasGeneralJson';

import {Autocomplete,Divider,MenuItem,TextField,List,ListItem,ListItemText,Button,Box,Typography,Grid, Paper, Select} from '@mui/material';

const DetailLotesPage =() => {
    //Obtengo el ID que viene de otro Page
    let {idLoteParam,serieParam}  = useParams();
    const [detalleLote,SetDetalleLote] = useState([]);
    const [aparadores,SetAparadores] = useState([]);
    const [talla,setTallas]=useState({});
    //Estados para la busqueda
    const[modelos,setModelos] = useState([]);
    //Estado para formulario
    const[formUpdateLote,setFormUpdateLote] = useState({
        idmodelo:'',
        idaparador:'',
        detalle_insumos_aparado:'...',
        estado:'Aparado'
    })
    //Funcion para la busqueda de modelos
    const peticionModelos=async()=>{
        console.log('serie',serieParam);
        console.log('probando ', detalleLote.serie)
        const url = 'http://localhost:4000/getAllModelosBySerieAndColor/'+ serieParam;
        await fetch(url,{
        //await fetch('https://backendkayoga-production.up.railway.app/getAllModelos',{
            headers: {
                'Content-Type': 'application/json'
              },
        })
        .then(function  (response) {
            if(response.ok){
                console.log('response',response);
                const promesa = response.json();
                promesa.then(function (modelo){
                    console.log('modelo',modelo);
                    setModelos(modelo);
                })
            }
            else{
                console.log('algo esta mal al traer los modelos')
            }
        })
        .catch(()=> console.log('Algo salio mal al requerir modelos'))
    }
    //Funcion para cambiar el valor del Select
    const handleChangeSelect = (event) => {
        const value =event.target.value;
        const name = event.target.name;
        console.log('names',name,value);
        setFormUpdateLote((prev)=>{
            return {...prev, [name]:value};
        });
    };
    //Para los cambios de campos normales
    function handleChangeModelos(e) {
        const value = e.target.value;
        //Debido a que autocomplete no tiene como tal un Name, me obligo a setear a mano
        const name = 'idmodelo';
        setFormUpdateLote((prev)=>{
            return {...prev, [name]:value};
        });
    }
    function handleSubmit(e){
        e.preventDefault()
        alert('Estas seguro de enviar la informacion?');
       /*
        //For Production
        fetch('https://backendkayoga-production.up.railway.app/postSeriados',{
        */
        //For Develop
        //id lote param es el id que se envia cuando viene de lotesListPage
        const url= 'http://localhost:4000/updateLoteById/' + idLoteParam;
        console.log('id param',idLoteParam)
        fetch(url,{
            headers: {
                'Content-Type': 'application/json'
              },
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify(formUpdateLote),
        })
        .then(function(response) {
            if(response.ok) {
                console.log('all good')
            } else {
              console.log('Respuesta de red OK pero respuesta HTTP no OK');
            }
          })
          .catch(function(error) {
            console.log('Hubo un problema con la petición Fetch:' + error.message);
          });     
    }
    useEffect(() =>{
        peticionModelos();
        //Obtengo informacion sobre el lote
        const url='https://backendkayoga-production.up.railway.app/getLoteById/'+idLoteParam;
        //const url='http://localhost:4000/getLoteById/'+idLote;
        fetch(url,{
            headers: {
                'Content-Type': 'application/json'
              },
        })
        .then(function(response){
            if(response.ok){
                const promesa = response.json();
                //Extraigo el resultado de la promesa
                promesa.then(function(loteResult){
                    SetDetalleLote(loteResult[0]);
                    if(loteResult[0].serie==='nino'){
                        setTallas(tallasNinoJson);  
                    }
                    else if(loteResult[0].serie==='dama'){
                        setTallas(tallasDamaJson);
                    }
                    else{
                        setTallas(tallasVaronJson);  
                    }
                })
            }
        })
        .catch(()=> console.log('Algo salio mal al requerir lotes cortados'));

        //Obtengo informacion sobre los aparadores
        fetch('https://backendkayoga-production.up.railway.app/getAllAparadores',{
        //fetch('http://localhost:4000/getAllAparadores',{
            headers: {
                'Content-Type': 'application/json'
              },
        })
        //Si comento esto, nunca llegara la promesa y por ende no puedo obtener el array que retorna la promise
        .then(response => response.json())
        //Aqui daria error si no llega la promesa
        .then((aparador)=>SetAparadores(aparador))
        .catch((error)=> console.log('Algo salio mal al requerir aparadores'+ error.message));
    },[]);
    return(
        <div style={{padding:16, margin:'auto', maxWidth:1000}}>
            <Grid  container flexWrap='wrap' justifyContent="center">
                <Grid item sx={{flexGrow:1}}>
                    <Paper >
                        <Typography variant='body1' sx={{padding:1,fontWeight:'bold'}}>
                            INFORMACIÓN DE LOTE
                        </Typography>

                        <List >
                            <ListItem>
                                <ListItemText primary="Lote" secondary={'# '+detalleLote.idlote} />
                                <ListItemText primary="Metraje" secondary={detalleLote.metraje} />
                                <ListItemText primary="Color" secondary={detalleLote.color} />
                                <ListItemText primary="Serie" secondary={detalleLote.serie} />
                            </ListItem>
                            <Divider/>

                            <ListItem>
                                <ListItemText primary="Descripcion del Cortador" secondary={detalleLote.descripcion} />
                                <ListItemText primary="Fecha de Corte" secondary={detalleLote.fecha_creacion} />
                                <ListItemText primary="Estado" secondary={detalleLote.estado} />
                            </ListItem>
                            <Divider/>
                            <ListItem>
                                <ListItemText primary="Garibaldi" secondary={detalleLote.garibaldi} />
                                <ListItemText primary="Contrafuerte" secondary={detalleLote.contrafuerte} />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
                {/* Lista de Seriado Inicial */}
                <Grid item  sx={{flexGrow:1 ,m:1} }>
                    <Paper>
                        <Typography variant='body1' sx={{padding:1,fontWeight:'bold'}}>
                            SERIADO DE CORTE INICIAL
                        </Typography>
                        <List>
                            <ListItem>
                                {/* Muestro la talla 1 que es o 34 star o 38 adulto solo si tiene datos */}
                                {detalleLote.talla1>0&&(
                                    <ListItemText primary={talla.talla1} secondary={detalleLote.talla1} />
                                )}
                                <ListItemText primary={talla.talla2} secondary={detalleLote.talla2} />
                                <ListItemText primary={talla.talla3} secondary={detalleLote.talla3} />
                                <ListItemText primary={talla.talla4} secondary={detalleLote.talla4} />
                                <ListItemText primary={talla.talla5} secondary={detalleLote.talla5} />                                                                
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
            <form onSubmit={handleSubmit}>
            <Grid  container flexWrap='wrap' justifyContent="center">
                {/* Asignar Aparador */}
                <Grid item  sx={{flexGrow:1 ,m:1}} >
                    <Paper>
                        <Typography variant='body1' sx={{padding:1,fontWeight:'bold'}}>
                            ASIGNA UN APARADOR 
                        </Typography>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            required
                            value = {formUpdateLote.idaparador}
                            name = 'idaparador' 
                            onChange={handleChangeSelect}
                            >
                            {aparadores.map((apa,i) => (
                                <MenuItem
                                key={i}
                                value={apa.idaparador}
                                >
                                {apa.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </Paper>
                </Grid>
                {/* Distribucion de Seriado */}
                <Grid item  sx={{flexGrow:2 ,m:1}} >
                    <Paper>
                        <Typography variant='body1' sx={{padding:1,fontWeight:'bold'}}>
                            ASIGNA UN MODELO  
                        </Typography>
                        <Autocomplete
                            disablePortal
                            // el campo valor_concatenado viene de la consulta sql
                            getOptionLabel={(option) => option.valor_concatenado}
                            options={modelos}
                            sx={{ width: 300 }}
                            onChange={handleChangeModelos}
                            renderOption={(props, option) => (
                                <Box  value={option.idmodelo} component="li" {...props} key={option.idmodelo}>
                                {option.valor_concatenado}
                                </Box>
                            )}
                            renderInput={(params) => <TextField  {...params} required label="Buscar" />}
                        />
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper>
                        <Typography variant='body1' sx={{padding:1,fontWeight:'bold'}}>
                           Agrega Detalles e insumos de Aparado  
                        </Typography>
                        <TextField
                            name="detalle_insumos_aparado"
                            value={formUpdateLote.detalle_insumos_aparado}
                            onChange={handleChangeSelect}
                            fullWidth
                            multiline
                            type="string"
                            label="Descripcion"
                        />
                    </Paper>
                </Grid>

                <Grid item xs={7}  style={{marginTop: 16 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Guardar
                        </Button>
                </Grid>
            </Grid>
            </form>
            <Paper>

            </Paper>
        </div>
        
    )
}
export default DetailLotesPage;