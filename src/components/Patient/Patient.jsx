import React, { useState } from "react";
import PHomePage from "./PatientHomePage/PHomePage";
import "../../CSS/Patient.css";
import PatientNewMeeting from "./Patient New Meeting/PatientNewMeeting"
import BottomBar from "../Template parts/BottomBar"
import TopBar from "../Template parts/TopBar";

const Patient = () => {
    const meetings = [
        {
            id:1, 
            time:'11:45-12:30'
        },
        {
            id:2, 
            time:'11:45-12:30'
        },
        {
            id:3, 
            time:'11:45-12:30'
        },
        {
            id:4, 
            time:'11:45-12:30'
        },
        {
            id:5, 
            time:'11:45-12:30'
        },
        {
            id:6, 
            time:'11:45-12:30'
        },
    ];

    const [patientName, setPatientName] = useState('');
    const [therapistName, setTherapistName] = useState('');
    const [meetingDate, setMeetingDate] = useState('');
    const [meetingTime, setMeetingTime] = useState('');
    const [timeSlots, setTimeSlots] = useState('');

    const patientNameHandle = () => {
        setPatientName('');
    };
    const patientUserClick = () => {
        
    };
    const patientHomeClick = () => {
        
    };
    const patientCalendarClick = () => {
        
    };
    const patientSideBarClick = () => {
        
    };
    // הפונקציה שאני מעביר כדי לתפוס את הערך של תאריך, להעביר את הזמנים החדשים ולרנדר
    const handleMeetingDateChange = (value) => {
        setMeetingDate(value);
        //לפה להכניס את הזמנים החדשים
        setTimeSlots(meetings);

    }
    // הפונקציה שאני מעביר כדי לתפוס את הערך של שעות
    const handleMeetingTimeChange = (value) => {
        setMeetingTime(value);
    }
    //הפוקנציה שאני מעביר בשביל הכפתור אישור שיקח את המשתנים בזמן הלחיצה
    const setNewMeeting = (event) => {
        event.preventDefault();
        const newMeeting = {
            date: meetingDate,
            time: meetingTime
        }
        console.log(newMeeting);
        setMeetingTime('');
        setMeetingDate('');
    }



    return(
        <div className="patient-container-div">
            <TopBar 
                patientName={patientName} 
                onSideBarClick={patientSideBarClick} 
            />

                {/* <PHomePage /> */}

                <PatientNewMeeting
                    timeSlots = {timeSlots}
                    therapistName = {therapistName}
                    setNewMeeting = {setNewMeeting}
                    onMeetingDateChange = {handleMeetingDateChange}
                    onMeetingTimeChange = {handleMeetingTimeChange}
                    clickedATime = {meetingTime}
                />
            <BottomBar 
                onCalendarClick={patientCalendarClick} 
                onUserClick={patientUserClick} 
                onHomeClick={patientHomeClick} 
            />
        </div>
    );
}
export default Patient;