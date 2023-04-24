import React,{useState,useEffect} from "react";
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import {ListItem,TextField, Typography} from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';


//import lef
function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList(props) {

  let navigate = useNavigate();
  const [checked, setChecked] = useState([]);
  let [left, setLeft] = React.useState([]);
  let [pares,setPares] = React.useState(0);
  const [right, setRight] = React.useState([]);
  const mostrarEditTalla = true;
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  function handleChange(idlote,e){
    const name = e.target.name;
    const value = e.target.value;
    const clave = idlote.toString()+name.toString();
    
    setRight((prevState) =>
      prevState.map((row) =>
       (row['clave_unica_generada']===clave? { ...row, ['cantidad']: value } : row)
      )
    );

  }
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    //currentIndex es -1 cuando el elemento buscado no existe en el array
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      //Quito un elemento en la posicion currentIndex  
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const handleCheckedRight = () => {
    //Agrego mis items
    setPares(pares+leftChecked[0].cantidad)
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setPares(pares-rightChecked[0].cantidad)
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };  
  const handleSubmit=(e)=>{
    if(right.length > 0){
      e.preventDefault()
      alert('Estas seguro de enviar la informacion?');
      //Inserto los datos el tabla watch produccion
      //fetch('http://localhost:4000/saveOrdenInyeccion',{        
      fetch('https://backendkayoga-production-fa5a.up.railway.app/saveOrdenInyeccion',{        
          headers: {
              'Content-Type': 'application/json'
            },
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          body: JSON.stringify(right),
      })
      .then(function(response) {
          if(response.ok) {
            alert('Datos guardados correctamente');
            navigate('/OrdenInyeccionGenerada')
          } else {
          }
        })
        .catch(function(error) {
          console.log('Hubo un problema con la petición Fetch:' + error.message);
        });
    }
    else{
      alert('No has seleccionado ningun item')
    }
 
  }
  useEffect(() => {
    setLeft(props.seriadoByTallaProps);
  },[props.seriadoByTallaProps])

  function customList(items,mostrarEditTalla){
    return(
    <Paper sx={{ width: 550, minHeight:200,  overflow: 'auto',mt:3,backgroundColor:'#f2f3f4',borderRadius:5}}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId    = `transfer-list-item-${value}-label`;
          const getTalla   = Object.keys(value);
        /***************** SOLO DEBEMOS ASEGURAR NO CAMBIAR LA QUERY QUE MANDA EN LA POS 0 LA TALLA  */
          // 0 porque la query en la posicion cero retorna el nombre de la talla segun la queryBD
          //console.log('get TALLA: ',getTalla);
          let talla_name = getTalla[0];
          //Agrego un nuevo key/value al objeto, indicando la talla 34 o 35...
          if(!mostrarEditTalla){
            value['talla_name'] = props.nameTallasProps[talla_name.toString()];
            //console.log('talla_name: ',value);
            // Agrego un nuevo key/value, indicando "talla1, talla2"
            value['talla_insert'] = talla_name.toString();
            // Agrego una clave para cada columna, ya que no hay un id especifico se puede repetir el lote y la talla en una misma orden
            value['clave_unica_generada'] = value.idlote.toString()+props.nameTallasProps[talla_name.toString()];
          }
          return (
            <ListItem
              key={value.idseriadorestante}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                
                />
              </ListItemIcon>
              {/* Aqui pongo la info modelo */}
              <ListItemText id={labelId} primary={`${value.infomodelo} `} />
              <ListItemText id={labelId}  sx={{fontWeight:'bold',color:'red',ml:1}} primary={'Talla: '+value['talla_name']+' / '+value.cantidad+' pares'} />
              <ListItemText id={labelId}  sx={{fontWeight:'bold',color:'red',ml:1}} primary={'Lote # '+value['idlote']} />

              <ListItemText id={labelId}  sx={{fontWeight:'bold',color:'red',ml:1}} primary={'Seriado restante : '+value['idseriadorestante']} />
              {mostrarEditTalla &&(
              <TextField  
                name={value['talla_name']}
                value={value['cantidad']}
                onChange={(e) => handleChange(value.idlote ,e)}
                sx={{maxWidth: '5em',ml:2}}
                required    
                type="number"   
                //label={talla.talla1}
              />
              )}
            </ListItem> 
          );
        })}
      </List>
    </Paper>
    )
  }
  
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item container justifyContent="center" alignItems="center" >
        <Typography variant='h4' sx={{p:1}}>
            Cantidad de Pares: { pares} 
        </Typography>
      </Grid>
      <Grid item >{customList(left,!mostrarEditTalla) }</Grid>

    {/* Grid para los botones */}
      <Grid item>

        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          
        </Grid>
      </Grid>
      <Grid item>{customList(right,mostrarEditTalla)}</Grid>
      
      <Grid item container sx={{justifyContent:'center'}}>
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          onClick={handleSubmit}
          sx={{fontWeight: 'bold'}}
        >
          Generar Orden de Inyección
        </Button>
      </Grid>
    </Grid>
  );
}