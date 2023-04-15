import React from "react";
import PMeetingItem from "./PMeetingItem"
const PatientHPMeetings = (props) => {
    return (
        <div>
            {
                props.papatientMeetings.map((meeting) => (
                    <PMeetingItem 
                        name={meeting.name}
                        date={meeting.date}
                        roomNum={meeting.roomNum}
                        sTime={meeting.sTime}
                        eTime={meeting.eTime}
                        key={meeting.id}
                    />
                ))}
        </div>
    );
}

export default PatientHPMeetings;