import React from "react";
import '../../CSS/BottomBar.css'
import HomeIcon from "../../Photos/Home-Icon.svg";
import CalendarIcon from "../../Photos/Calendar-Icon.svg";
import UserIcon from "../../Photos/files.svg";

const BottomBar = (props) => {
    return (
        <div className="bottom-bar-container">
            <div className="bottom-bar-div">
                <div className="home-icon-div">
                    <img className="home-icon" src={HomeIcon} onClick={props.onHomeClick} />
                </div>
                <div className="calendar-icon-div">
                    <img className="calendar-icon" src={CalendarIcon} onClick={props.onCalendarClick} />
                </div>
                {props.onUserClick ? (
                    <div className="user-icon-div">
                        <img className="user-icon" src={UserIcon} onClick={props.onUserClick} />
                    </div>
                ) : null}
            </div>
        </div>
    );
}
export default BottomBar;