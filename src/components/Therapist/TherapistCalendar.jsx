import React, { useState } from "react";
import CalendarF from "../Calendar/CalendarF";
import "../../CSS/therapistCalendar.css"
import backArrow from "../../Photos/backArrow.svg";

const TherapistCalendar = () => {

    return(
        <div className="therapistCalendar-div">
            <CalendarF />
            <div className="openClose-arrow">
                <img src={backArrow} alt="closeOpenDate"/>
            </div>
        </div>
    );
}
export default TherapistCalendar;