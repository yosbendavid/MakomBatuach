import React from "react";
import '../../CSS/select-options-card.css'
//מעטפת בשביל נוחות של CSS 
const SelectOptionsCard = (props) => {
    const classes = 'selectOptionsCard ' + props.className;
    return(
        <div className={classes}>{props.children}</div>
    );
}
export default SelectOptionsCard;