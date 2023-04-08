import React from "react";
import '../../CSS/input-card.css'

const InputCard = (props) => {
    const classes = 'inputCard ' + props.className;
    return(
        <div className={classes}>{props.children}</div>
    );
}

export default InputCard;