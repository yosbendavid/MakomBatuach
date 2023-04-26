import React, { useState } from "react";
import '../../CSS/TopBar.css'
import SideBarIcon from "../../Photos/Side-Bar-Icon.svg";
import CloseIcon from "../../Photos/Close-Icon.svg";

const TopBar = (props) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return(
        <div className="top-bar-container">
            <div className="top-bar-div">
                <div className="name-icon-div">
                    <p className="name-icon">{props.patientName}</p>
                </div>
                <div className="Side-Bar-div">
                    <img className="Side-Bar-Icon" src={SideBarIcon} onClick={handleSidebarToggle} />
                </div>
            </div>
            {sidebarOpen && (
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
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default TopBar;