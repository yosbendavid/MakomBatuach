import React from "react";
import PMeetingItem from "./PMeetingItem"
import MeetingItemBox from "../../Template parts/MeetingItemBox"

const PatientHPMeetings = (props) => {
    return (
        <div>
            {
                props.papatientMeetings.map((meeting) => (
                    <MeetingItemBox 
                        key={meeting.Treatment_id}
                        name={meeting.TherapistName}
                        date={meeting.datetemp}
                        roomNum={meeting.Room_Num}
                        sTime={meeting.startTimetemp}
                        eTime={meeting.endtimetemp}
                    />
                ))}
        </div>
    );
}

export default PatientHPMeetings;