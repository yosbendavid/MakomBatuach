import React from "react";
import '../../CSS/button-card.css'
//יצרתי מעטפת לכפתור בשביל שאוכל להשתמש בו שוב ושוב כשארצה כפתור ירוק פשוט
const ButtonCard = (props) => {
    const classes = 'submit-btn ' + props.className;
    return(
        <button className={classes} onClick={props.onClick}>{props.children}</button>
    );
}

export default ButtonCard;