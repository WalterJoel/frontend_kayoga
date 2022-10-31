    import { React,useState, useEffect } from "react";

import {
    Typography,
    Select,
    Paper,
    Divider,
    Grid,
    Button,
    TextField,
    CssBaseline,
    RadioGroup,
    FormLabel,
    MenuItem,
    FormGroup,
    FormControl,
    FormControlLabel,
  } from '@mui/material';
  
import {coloresInserto} from '../Elements/Insertos/ColoresInsertosJson'
import {serieGeneralJson} from '../Elements/SerieGeneralJson'
import {tallasNinoJson,tallasDamaJson,tallasVaronJson} from '../Elements/TallasGeneralJson'


const InsertInsertosPage=()=>{
    const [serie,setSerie]=useState('');
    const [talla,setTallas]=useState({});
    const [formInserto, setFormInserto] = useState({
        talla1:'0',
        talla2:'',
        talla3:'',
        talla4:'',
        talla5:'',
        metraje: '',
        color:'',
        descripcion:'...',
        serie:'',
        garibaldi:false,
        contrafuerte:false,
        etiquetas:false,
        estado: 'Cortado',
    });
    function handleSubmit(){

    }
    //Para los cambios de campos normales
    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        console.log(e.target.value);
        setFormInserto((prev)=>{
            return {...prev, [name]:value};
        });

    }
    //Funcion para cambiar el valor del Select
    const handleChangeSelect = (e) => {
        const name = e.target.name;
        const value =e.target.value;
        setSerie(value);
        //Valido que serie se va insertar
        if(value==='nino'){
            setTallas(tallasNinoJson);  
        }
        else if(value==='dama'){
            setTallas(tallasDamaJson);
        }
        else{
            setTallas(tallasVaronJson);  
        }
        /*
        setformInserto((prev)=>{
            return {...prev, [name]:value};
        });*/
    };    
    
    return(
        <div style={{padding:16, margin:'auto', maxWidth:800}}>
        <h1>En mantenimiento, por el momento insertar a mano, respetar las minusculas 
        
        </h1>
        <h1>nino, dama,varon
        </h1>
            {/* <form onSubmit={handleSubmit}>
                <Paper>
                    <Grid container>
                        {/* Seleccionar la serie                */}
                        {/* <Grid item  xs={6} >
                            <Paper>
                                <Typography variant='body1' sx={{padding:1,fontWeight:'bold'}}>
                                    Selecciona la serie
                                </Typography>
                                <Select
                                    name="serie"
                                    required
                                    value={serie}
                                    onChange={handleChangeSelect}
                                    >
                                    <MenuItem key={1} value={serieGeneralJson.serieNino}>NIÑO</MenuItem>
                                    <MenuItem key={2} value={serieGeneralJson.serieDama}>DAMA</MenuItem>
                                    <MenuItem key={3} value={serieGeneralJson.serieVaron}>VARON</MenuItem>                                                        
                                </Select>
                            </Paper>
                        </Grid>
                        <Grid item  xs={6} >
                            <Paper>
                                <Typography variant='body1' sx={{padding:1,fontWeight:'bold'}}>
                                    Selecciona el color
                                </Typography>
                                <Select
                                    name="color_inserto"
                                    required
                                    value={serie}
                                    onChange={handleChangeSelect}
                                    >
                                    {
                                        coloresInserto.map((color,index)=>(
                                        <MenuItem key={index} value={color}>{color}</MenuItem>
                                    ))}
                                </Select>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item sx={{flexGrow:1}}>
                            <TextField
                                name="talla2"
                                required
                                value={formInserto.talla2}
                                onChange={handleChange}
                                fullWidth
                                type="number"
                                label={talla.talla2}
                            />
                        </Grid>
                        <Grid item sx={{flexGrow:1}}>
                            <TextField
                                name="talla3"
                                value={formInserto.talla3}
                                onChange={handleChange}
                                fullWidth
                                required
                                type="number"
                                label={talla.talla3}
                            />
                        </Grid>
                        <Grid item sx={{flexGrow:1}}>
                            <TextField
                                name="talla4"
                                value={formInserto.talla4}
                                onChange={handleChange}                        
                                fullWidth
                                required
                                type="number"
                                label={talla.talla4}
                            />  
                        </Grid>

                        <Grid item sx={{flexGrow:1}}>
                            <TextField
                                name="talla5"
                                value={formInserto.talla5}
                                onChange={handleChange}                        
                                fullWidth
                                required
                                type="number"
                                label={talla.talla5}
                            />  
                        </Grid>
                    </Grid>
                </Paper>

            </form> */} 
        </div>

    )

}
export default InsertInsertosPage;



/***************************************** 
 * 
 * 
 * Algunos consejos
 * Cuando se quiere usar flexgrow, todos los elementos que van a estar en una sola fila deben 
 * ir en un solo container, porque ya no se les asignara xs=7
*/

