import React from "react";
import "../../CSS/MeetingItemBox.css";
import { ReactComponent as CloseButton } from "../Images/close-btn.svg";
import Swal from 'sweetalert2';


const MeetingItemBox = (props) => {
  const styles = {
    backgroundColor: props.roomNum === 1 ? "#CCF4F8" : "#BBD4B7",
  };

  const isPastAppointment = new Date(props.date) < new Date();

  const apiUrl = "https://localhost:44380/api/Update";

  const CancelMeeting = () => {
    Swal.fire({
      title: 'ביטול פגישה',
      text: '?האם ברצונך לבטל את הפגישה',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'כן',
      cancelButtonText: 'לא',
    }).then((result) => {
      if (result.isConfirmed) {
        // Send PUT request to update the WasDone field
        fetch(apiUrl, {
          method: 'PUT',
          body: JSON.stringify(props.id),
          headers: new Headers({
            'Content-type': 'application/json; charset=UTF-8',
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            // Handle successful update
            console.log('Meeting canceled');
            Swal.fire({
              title: 'הפגישה בוטלה',
              icon: 'success'
            })
            setTimeout(() => {
              window.location.reload(); // Reload the current page after a delay
            }, 1000); // Set the desired delay in milliseconds (e.g., 2000ms = 2 seconds)
          })
          .catch((error) => {
            // Handle error
            console.error('Failed to cancel meeting', error);
          });
      }
    });
  };

  return (
    <div className="app-notification">
      <p className="delete-appointment">
        <CloseButton onClick={CancelMeeting} />
      </p>
      <div className="notification-content">
        {isPastAppointment ? (
          <>
            <div className="notification-right">
              <div className="notification-title">{`פגישה עם ${props.name}`}</div>
              <div className="notification-date">{props.date}</div>
            </div>
            <div className="notification-room-divider" style={styles}></div>
            <div className="notification-left">
              <button
                onClick={() =>
                  props.onSummaryButtonClick(
                    props.id,
                    props.sTime,
                    props.eTime,
                    props.date
                  )
                }
                style={styles}
                className="add-summary-button"
              >
                סיכום
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="notification-right">
              <div className="notification-title">{`פגישה עם ${props.name}`}</div>
              <div className="notification-message">{`חדר ${props.roomNum}`}</div>
            </div>
            <div className="notification-room-divider" style={styles}></div>
            <div className="notification-left">
              <div className="notification-date">{props.date}</div>
              <div className="notification-clock">{`${props.eTime}-${props.sTime}`}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MeetingItemBox;
