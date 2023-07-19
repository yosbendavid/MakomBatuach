import React, { useState } from "react";
import '../../CSS/TopBar.css'
import SideBarIcon from "../../Photos/Side-Bar-Icon.svg";
import CloseIcon from "../../Photos/Close-Icon.svg";
import { PatientName } from "../Therapist/Patients/Patients.Style";

const TopBar = (props) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // פונקציה להשגת ראשי התיבות
    const getInitials = () => {
        const nameArray = localStorage.getItem('patientName')?.split(" ");
        const initials = nameArray.map((word) => word.charAt(0).toUpperCase());
        return initials.join(" ");
    }
    // השג את ראשי התיבות של - props.patientName
   const initials = localStorage.getItem('patientName')? getInitials(): "";
   // console.log('כאן', initials);

    return(
        <div className="top-bar-container">
            <div className="top-bar-div">
                <div className="name-icon-div">
                    <p className="name-icon">{initials}</p>
                </div>
                <div className="Side-Bar-div">
                    {/* <img className="Side-Bar-Icon" src={SideBarIcon} onClick={handleSidebarToggle} /> */}
                </div>
            </div>
            {/* {sidebarOpen && (
                <>
                    <div className="sidebar-background" onClick={handleSidebarToggle} />
                    <div className="sidebar open">
                        <div className="sidebar-header">
                            <button className="close-button" onClick={handleSidebarToggle}>
                                <img src={CloseIcon} alt="Close" />
                            </button>
                        </div>
                        <div className="sidebar-content">
                            <ul>
                                <li>Logout</li>
                            </ul>
                        </div>
                    </div>
                </>
            )} */}
        </div>
    );
}

export default TopBar;
