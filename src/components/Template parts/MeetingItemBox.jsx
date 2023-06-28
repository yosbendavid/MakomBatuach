import React from "react";
import "../../CSS/MeetingItemBox.css";

const MeetingItemBox = (props) => {
  const styles = {
    backgroundColor: props.roomNum === 1 ? "#CCF4F8" : "#BBD4B7",
  };

  const isPastAppointment = new Date(props.date) < new Date();

  return (
    <div className="app-notification">
      <div className="notification-content">
        <div className="notification-right">
          <div className="notification-title">{`פגישה עם ${props.name}`}</div>
          <div className="notification-message">{`חדר ${props.roomNum}`}</div>
        </div>
        <div className="notification-room-divider" style={styles}></div>
        <div className="notification-left">
          <div className="notification-date">{props.date}</div>
          <div className="notification-clock">{`${props.eTime}-${props.sTime}`}</div>
        </div>
      </div>
    </div>
  );
};

export default MeetingItemBox;

