import React,{useState,useEffect} from "react";
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import {ListItem, Typography} from '@mui/material';
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
  const [right, setRight] = React.useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

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
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };  
  const handleSubmit=(e)=>{
    if(right.length > 0){
      e.preventDefault()
      alert('Estas seguro de enviar la informacion?');
      //Inserto los datos el tabla watch produccion
      fetch('https://backendkayoga-production.up.railway.app/saveOrdenInyeccion',{        
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
            console.log(response);
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

  function customList(items){
    return(
    <Paper sx={{ width: 550, minHeight:200,  overflow: 'auto',mt:3,backgroundColor:'#f2f3f4',borderRadius:5}}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId    = `transfer-list-item-${value}-label`;
          const getTalla   = Object.keys(value);
        /***************** SOLO DEBEMOS ASEGURAR NO CAMBIAR LA QUERY QUE MANDA EN LA POS 0 LA TALLA  */
          // 0 porque la query en la posicion cero retorna el nombre de la talla segun la queryBD
          let talla_name = getTalla[0];
          //Agrego un nuevo key/value al objeto, indicando la talla 34 o 35...
          value['talla_name'] = props.nameTallasProps[talla_name.toString()];
          console.log('talla_name: ',value);
          // Agrego un nuevo key/value, indicando "talla1, talla2"
          value['talla_insert'] = talla_name.toString();
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
              <ListItemText id={labelId}  sx={{fontWeight:'bold',color:'red'}} primary={` Talla: ${props.nameTallasProps[talla_name.toString()]+' / '+value.cantidad+' pares'} `} />
            </ListItem> 
          );
        })}
      </List>
    </Paper>
    )
  }
  
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item >{customList(left) }</Grid>

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
      <Grid item>{customList(right)}</Grid>
      
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