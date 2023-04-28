import React, { useState } from "react";
import PHomePage from "./PatientHomePage/PHomePage";
import "../../CSS/Patient.css";
import PatientNewMeeting from "./Patient New Meeting/PatientNewMeeting"
import BottomBar from "../Template parts/BottomBar"
import TopBar from "../Template parts/TopBar";

const Patient = () => {

    const [name, setName] = useState('YB');
    
    const patientNameHandle = () => {
        setName('');
    };
    const patientUserClick = () => {
        
    };
    const patientHomeClick = () => {
        
    };
    const patientCalendarClick = () => {
        
    };
    const patientSideBarClick = () => {
        
    };
    return(
        <div className="patient-container-div">
            <TopBar patientName={name} onSideBarClick={patientSideBarClick} />
                {/* <PHomePage /> */}
                <PatientNewMeeting />
            <BottomBar onCalendarClick={patientCalendarClick} onUserClick={patientUserClick} onHomeClick={patientHomeClick} />
        </div>
    );
}
export default Patient;