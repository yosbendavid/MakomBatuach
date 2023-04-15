import React from "react";
import "../../../CSS/PMeetingItem.css";

const PMeetingItem = (props) => {

    const styles = {
        backgroundColor: props.roomNum == 1 ? "#CCF4F8" : "#BBD4B7"
    };
    return (
        <div className="app-notification">
            <div className="notification-content">
                <div className="notification-right">
                    <div className="notification-title">פגישה עם אסתי גרין</div>
                    <div className="notification-message">חדר 1</div>
                </div>
                <div className="notification-room-divider" style={styles}></div>
                <div className="notification-left">
                    <div className="notification-date">17.2.23</div>
                    <div className="notification-clock">16:00-16:45</div>
                </div>
            </div>
        </div>
    );
}

export default PMeetingItem;