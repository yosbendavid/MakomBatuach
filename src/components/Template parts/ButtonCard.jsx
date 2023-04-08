import React from "react";
import '../../CSS/button-card.css'

const ButtonCard = (props) => {
    const classes = 'submit-btn ' + props.className;
    return(
        <p className={classes} onClick={props.onClick}>{props.children}</p>
    );
}

export default ButtonCard;