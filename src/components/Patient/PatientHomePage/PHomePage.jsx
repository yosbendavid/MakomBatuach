import React, { useState } from "react";
import PatientHPMeetings from "./PatientHPMeetings";
import "../../../CSS/PHomePage.css";
import { useNavigate } from "react-router-dom";

const dummy_meetings = [
    {
        id: 1,
        name: 'אסתי גרין',
        roomNum: 2,
        date: '12.12.23',
        sTime: '11:45',
        eTime: '12:30',
    },
    {
        id: 2,
        name: 'אסתי גרין',
        roomNum: 1,
        date: '18.12.23',
        sTime: '11:45',
        eTime: '12:30',
    },
    {
        id: 3,
        name: 'אסתי גרין',
        roomNum: 2,
        date: '12.12.23',
        sTime: '11:45',
        eTime: '12:30',
    },
    {
        id: 4,
        name: 'אסתי גרין',
        roomNum: 1,
        date: '18.12.23',
        sTime: '11:45',
        eTime: '12:30',
    },
    {
        id: 5,
        name: 'אסתי גרין',
        roomNum: 2,
        date: '12.12.23',
        sTime: '11:45',
        eTime: '12:30',
    },
    {
        id: 6,
        name: 'אסתי גרין',
        roomNum: 1,
        date: '18.12.23',
        sTime: '11:45',
        eTime: '12:30',
    },
];

const PHomePage = () => {
    const [patientMeetings, setPatientMeetings] = useState(dummy_meetings)

    const addMeetingsHandler = newPatientMeeting => {
        setPatientMeetings(prevPatientMeetings => {
            return [newPatientMeeting, ...prevPatientMeetings]
        });
    };

    const navigate = useNavigate(); 

    const Go2Nemeeting = () => {
      navigate("/Patient");
    }

    return (
        <div className="PHomePage-container">
            <div className="setMeetingBtn">
                <button className="setMeetBTN" onClick={Go2Nemeeting}>לחץ לזימון פגישה</button>
                <p className="upcoming-Meetings-title">פגישות קרובות:</p>
            </div>
            <div className="items-div">
                <PatientHPMeetings papatientMeetings={patientMeetings} />
            </div>
            <button className="seeAllDocuments">לחץ למסמכי סיכום פגישות</button>
        </div>
    );
}
export default PHomePage;