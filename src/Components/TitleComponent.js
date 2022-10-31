import React from "react";

import {Typography } from "@mui/material";


const TitleComponent = (props) => {
    return(
        <Typography variant={props.variant}>
            {props.title}
        </Typography>
    )

}
export default TitleComponent;