import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
import { Link} from 'react-router-dom';



export default function HomeCardsComponent(props){
    return(
        <Card sx={{ maxWidth: 160, padding:2,margin:2, height:190 }}>
            <Link to={props.linkTo}>
                <Button>
                    <CardMedia
                        style={{borderRadius:10}}
                        component="img"
                        height="140"
                        image={props.image}
                        alt="green iguana"
                    />
                </Button>
            </Link>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" align="center">
                {props.action}
                </Typography>
            </CardContent>
        </Card>
    )
}

