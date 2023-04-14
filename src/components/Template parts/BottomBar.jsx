import React from "react";
import '../../CSS/BottomBar.css'
import HomeIcon from "../../Photos/Home-Icon.svg";
import CalendarIcon from "../../Photos/Calendar-Icon.svg";
import UserIcon from "../../Photos/User-Icon.svg";

const BottomBar = () => {

    return(
        <div className="bottom-bar-container">
            <div className="bottom-bar-div">
                <div className="home-icon-div">
                    <img className="home-icon" src={HomeIcon} />
                </div>
                <div className="calendar-icon-div">
                    <img className="calendar-icon" src={CalendarIcon} />
                </div>
                <div className="user-icon-div">
                    <img className="user-icon" src={UserIcon} />
                </div>
            </div>
        </div>
    );
}
export default BottomBar