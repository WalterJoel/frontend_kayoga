import React,{useEffect,useState} from "react";
import {useParams,useNavigate } from 'react-router-dom';
import {tallasDamaJson,tallasNinoJson,tallasVaronJson} from '../Elements/TallasGeneralJson';

import {Avatar,Autocomplete,Divider,MenuItem,TextField,List,ListItem,ListItemText,Button,Box,Typography,Grid, Paper, Select} from '@mui/material';

import DataIcon from '../media/DataIcon2.png';

const DetailLotesPage =() => {
    const navigateTo = useNavigate();
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
        detalle_insumos_aparado:'',
        estado:'Aparado'
    })
    //Funcion para la busqueda de modelos
    const peticionModelos=async()=>{
        console.log('serie',serieParam);
        console.log('probando ', detalleLote.serie)
        const url = 'https://backendkayoga-production.up.railway.app/getAllModelosBySerieAndColor/'+ serieParam;
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
        const url= 'https://backendkayoga-production.up.railway.app/updateLoteById/' + idLoteParam;
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
                navigateTo('/');
            } else {
                alert('No se pudo guardar')
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
        //fetch('https://backendkayoga-production.up.railway.app/getLotesByIdAparadorAndEstado/getAllAparadores',{
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
        <Grid container sx={{zIndex:2,position:'absolute',padding:5
                ,display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:''}}>
            <Grid  container sx={{display:'flex',justifyContent:"space-around",backgroundColor:'#dfe3e9',p:2,
                                    borderRadius:5}}>
                <Grid sx={{backgroundColor:'#ffffff',borderRadius:5,p:3,flexGrow:1}}>
                    <Grid item container sx={{alignItems:'center'}} >
                        <Grid>
                            <Avatar src={DataIcon} sx={{width:70,height:70}}/>
                        </Grid>
                        <Grid>
                        <Typography variant='h6' sx={{padding:1,fontWeight:'bold'}}>
                            Información del Lote
                        </Typography>
                        </Grid>           
                    </Grid>
                    <List >
                        <ListItem >
                            <ListItemText primary="Lote" secondary={'# '+detalleLote.idlote} />
                            <ListItemText primary="Metraje" secondary={detalleLote.metraje} />
                            <ListItemText primary="Color" secondary={detalleLote.color} />
                            <ListItemText primary="Serie" secondary={detalleLote.serie} />
                        </ListItem>
                        <Divider/>

                        <ListItem>
                            <ListItemText primary="Fecha de Corte" secondary={detalleLote.fecha_creacion} />
                            <ListItemText primary=" Garibaldi" secondary={detalleLote.garibaldi} />
                            <ListItemText primary=" Contrafuerte" secondary={detalleLote.contrafuerte} />
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <ListItemText primary="Estado" secondary={detalleLote.estado} />
                            <ListItemText primary="Descripcion del Cortador" secondary={detalleLote.descripcion} />
                        </ListItem>
                    </List>
                </Grid>
                {/* Lista de Seriado Inicial */}
                <Grid item  sx={{flexGrow:1 ,m:1} }>
                    <Grid sx={{backgroundColor:'#ffffff',borderRadius:5,p:3}}>
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
                    </Grid>
                </Grid>
                <form onSubmit={handleSubmit}>
            <Grid  item container sx={{justifyContent:'center'}} >
                {/* Asignar Aparador */}
                <Grid item  sx={{flexGrow:1 ,m:1}} >
                    <Grid sx={{backgroundColor:'#ffffff',borderRadius:5,p:3}}>
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
                    </Grid>
                </Grid>
                {/* Distribucion de Seriado */}
                <Grid item  sx={{flexGrow:2 ,m:1,flexGrow:1}} >
                    <Grid sx={{backgroundColor:'#ffffff',borderRadius:5,p:3}}>
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
                    </Grid>
                </Grid>
                <Grid item >
                    <Grid  sx={{backgroundColor:'#ffffff',borderRadius:5,p:3}}>
                        <Typography variant='body1' sx={{padding:1,fontWeight:'bold'}}>
                           Agrega Detalles e insumos de Aparado  
                        </Typography>
                        <TextField
                            name="detalle_insumos_aparado"
                            value={formUpdateLote.detalle_insumos_aparado}
                            onChange={handleChangeSelect}
                            fullWidth
                            required
                            multiline
                            type="string"
                            label="Descripcion"
                        />
                    </Grid>
                </Grid>

                <Grid item container sx={{marginTop:1,justifyContent:'center'}}>
                        <Button
                            variant="outlined"
                            color="primary"
                            sx={{fontWeight:'bold'}}
                            type="submit"
                        >
                            Enviar Lote
                        </Button>
                </Grid>
            </Grid>
            </form>
            </Grid>
        </Grid>
        
    )
}
export default DetailLotesPage;