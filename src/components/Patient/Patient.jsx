import React, { useState } from "react";
import PHomePage from "./PHomePage";
import "../../CSS/Patient.css";
import BottomBar from "../Template parts/BottomBar"

const Patient = () => {
    return(
        <div className="patient-container-div">

            <BottomBar />
        </div>
    );
}
export default Patient;