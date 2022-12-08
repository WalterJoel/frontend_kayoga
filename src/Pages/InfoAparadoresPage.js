import {BottomNavigation, 
        Grid,Select,
        MenuItem,
        Card, Button,
        Avatar,  
        BottomNavigationAction,Container, Typography, CardContent, CssBaseline } from "@mui/material";
import ListAltIcon from '@mui/icons-material/ListAlt';
import DoneIcon from '@mui/icons-material/ListAltSharp';
import { useState } from "react";
import aparadorImage from '../media/aparadorImage.jpg'
import {React,useEffect, useRef} from 'react';
import AcordionLotesComponent from '../Components/AcordionLotesComponent';
//Uso un ref para usar el scroll del React Dom

function InfoAparadoresPage(props) {

  //En el front se pone on Focused la opcion aparado
  const [selected, setSelected] = useState('');
  const [lotes,setLotes]  = useState([]); 
  const [aparadorSelected,setSelectedAparador]  = useState(''); 
  //La pantalla me obliga a traer solamente los Aparado
  const [estadoLote,setEstadoLote] = useState('Aparado');
  const [aparadores,SetAparadores] = useState([]);

    const handleChangeSelect = (event) => {
        const idAparador =event.target.value;
        setSelectedAparador(idAparador);
        console.log('names',idAparador);
        getLotesByIdAparadorAndEstado(idAparador);
    };
    async function getAllAparadores(){
        await fetch('https://backendkayoga-production.up.railway.app/getAllAparadores',{
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
    }
  
    function handleChange(e,newValue){
        setEstadoLote(newValue);
        setSelected(newValue);
    }

  async function getLotesByIdAparadorAndEstado(idAparador){
//    const url = 'https://backendkayoga-production.up.railway.app/getLotesByIdAparadorAndEstado/'+idAparador+'/'+estadoLote;
    const url = 'https://backendkayoga-production.up.railway.app/getLotesByIdAparadorAndEstado/'+idAparador+'/'+estadoLote;
    await fetch(url,{
      headers: {
          'Content-Type': 'application/json'
        },
  })
  .then(function(response) {
      if(response.ok) {
          const promesa = response.json();
          promesa.then(function(lotes) {
            setLotes(lotes);
          });
          console.log('all good',lotes)
      } else {
        console.log('Respuesta de red OK pero respuesta HTTP no OK');
      }
    })
    .catch(function(error) {
      console.log('Hubo un problema con la petición Fetch:' + error.message);
    });     
  }

  useEffect(() => {
    getAllAparadores();
    getLotesByIdAparadorAndEstado(aparadorSelected);
    console.log('render');
    //ref.current.scrollTop = 0;
    //setMessages(refreshMessages());
  }, [selected ]);

  return (
    <>
  {/* Contenedor General del body */}
    <Grid container sx={{zIndex:2,position:'absolute',padding:5, borderRadius:5,
                mt:'',display:'flex',alignItems:'center',justifyContent:'center'}}>
    
        <Grid sx={{backgroundColor:'#dfe3e9',p:2,borderRadius:5}}>
            <Grid item container >
                {/* Info Title */}
                <Grid item container sx={{ backgroundColor:'',flexDirection:'row',justifyContent:'space-between',alignItems:'center',m:1}} >                
                    <Grid item container sx={{p:2}} xs={7}  >
                        <Grid >
                            <Avatar  sx={{width:70,height:70}}/>
                        </Grid>
                        <Grid >
                            <Typography variant='h4' sx={{p:1}}>
                                Selecciona un Aparador
                            </Typography>
                        </Grid>   
                    </Grid> 
                    <Grid  item sx={{ml:2}} xs={7} >                   
                        <Grid>
                            <Select
                                sx={{fontWeight:'bold'}}
                                required
                                value = {aparadorSelected}
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
                </Grid>
                    <BottomNavigation
                        showLabels
                        value={selected}
                        onChange={handleChange}
                        style={{ width: "100%",backgroundColor:'#f2f3f4',padding:'0.5em',borderRadius:'15px' }}
                        >
                        <BottomNavigationAction name='Aparado' value='Aparado' label="Lotes por Entregar" icon={<ListAltIcon/>}/>
                        <BottomNavigationAction name='Resuelto' value='Resuelto' label="Lotes Entregados" icon={<ListAltIcon/>}/>
                        <BottomNavigationAction label="Third"  icon={<ListAltIcon/>}/>
                    </BottomNavigation>
                
        
        {/* Contenedor de los Acordiones  */}
        <Grid container sx={{display:'flex',mt:2,justifyContent:'center',p:1}}>
            {
            lotes.map((lote,i)=>(
                //Envio los props necesario 
                <AcordionLotesComponent key={i} 
                                        idLoteProps={lote.idlote} 
                                        metrajeProps={lote.metraje}
                                        fechaCorteProps={lote.fechaCorte}
                                        garibaldiProps={lote.garibaldi}
                                        contrafuerteProps={lote.contrafuerte}
                                        estadoLoteProps={lote.estado_lote}

                                        nombreAparadorProps = {lote.nombreAparador}
                                        
                                        talla1Props={lote.talla1Seriado}
                                        talla2Props={lote.talla2Seriado}
                                        talla21Props={lote.talla21Seriado}
                                        talla3Props={lote.talla3Seriado}
                                        talla31Props={lote.talla31Seriado}
                                        talla4Props={lote.talla4Seriado}
                                        talla41Props={lote.talla41Seriado}
                                        talla5Props={lote.talla5Seriado}
                                        talla51Props={lote.talla51Seriado}

                                        talla1ResProps={lote.talla1SeriadoRes}
                                        talla2ResProps={lote.talla2SeriadoRes}
                                        talla21ResProps={lote.talla21SeriadoRes}
                                        talla3ResProps={lote.talla3SeriadoRes}
                                        talla31ResProps={lote.talla31SeriadoRes}
                                        talla4ResProps={lote.talla4SeriadoRes}
                                        talla41ResProps={lote.talla41SeriadoRes}
                                        talla5ResProps={lote.talla5SeriadoRes}
                                        talla51ResProps={lote.talla51SeriadoRes}

                                        descripcionCortadorProps={lote.descripcion_cortador}
                                        descripcionAparadorProps={lote.descripcion_aparador}
                                        descripcionContadorProps={lote.descripcion_contador}
                                        
                                        serieLoteProps={lote.serieLote} 
                                        colorLonaProps={lote.color_lona}
                                        infomodeloProps={lote.infomodelo}
                                        fechaCreacionLoteProps={lote.lotefechacreacion}
                                        totalSeriadoInicialProps={lote.total_pares_seriado_inicial}
                                        fechaConteoProps={lote.fecha_conteo}
                                        fechaEntregaAparadoProps={lote.fechaEntregaAparado}
                                        totalParesSegunAparadorProps={lote.total_pares_segun_aparador}
                                        totalParesSegunContadorProps={lote.total_pares_segun_contador}

                                        detalleInsumosAparadoProps = {lote.detalle_insumos_aparado}
                                        />
                ))
            }
            
        </Grid>
        </Grid>
        </Grid>         
    </Grid>
    </>
  );
}

export default InfoAparadoresPage;