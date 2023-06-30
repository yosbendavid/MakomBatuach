import React from "react";
// import PMeetingItem from "./PMeetingItem"
import MeetingItemBox from "../../Template parts/MeetingItemBox"

const PatientHPMeetings = (props) => {
    return (
        <div>
            {
                props.papatientMeetings.map((meeting) => (
                    <MeetingItemBox 
                        key={meeting.Treatment_Id}
                        name={meeting.TherapistName}
                        date={meeting.datetemp}
                        roomNum={meeting.Room_Num}
                        sTime={meeting.startTimetemp}
                        eTime={meeting.endtimetemp}
                        id={meeting.Treatment_Id}
                        isPastAppointment={isPastAppointment(meeting.datetemp)} // Add isPastAppointment prop
                        onSummaryButtonClick={(id, sTime, eTime, date) => props.onSummaryButtonClick(id, sTime, eTime, date)}
                        />
                ))}
        </div>
    );
}
const isPastAppointment = (date) => {
    const appointmentDate = new Date(date);
    const currentDate = new Date();
    return appointmentDate < currentDate;
  };

export default PatientHPMeetings;