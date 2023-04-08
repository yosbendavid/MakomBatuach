import React from "react";
import '../../CSS/input-card.css'
// יצרתי מעטפת לאין פוט בשביל נוחות של הנראות וסי אס אס
const InputCard = (props) => {
    const classes = 'inputCard ' + props.className;
    return(
        <div className={classes}>{props.children}</div>
    );
}

export default InputCard;