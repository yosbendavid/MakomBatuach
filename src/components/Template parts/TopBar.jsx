import React, { useState } from "react";
import '../../CSS/TopBar.css'
import SideBarIcon from "../../Photos/Side-Bar-Icon.svg";
import CloseIcon from "../../Photos/Close-Icon.svg";

const TopBar = (props) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // פונקציה להשגת ראשי התיבות
    const getInitials = (name) => {
        const words = name.split(" ");
        const initials = words.map((word) => word[0]).join("");
        return initials;
    };

    // השג את ראשי התיבות של - props.patientName
    const initials = props.patientName ? getInitials(props.patientName) : "";

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
