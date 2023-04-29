import React, { useState } from "react";
import PHomePage from "./PatientHomePage/PHomePage";
import "../../CSS/Patient.css";
import PatientNewMeeting from "./Patient New Meeting/PatientNewMeeting";
import BottomBar from "../Template parts/BottomBar";
import TopBar from "../Template parts/TopBar";
import NewApproved from './Patient New Meeting/MeetingAproved';
import {format} from 'date-fns';

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
    const [meet, setMeet] = useState('');


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
        var t= format(value, 'yyyy/MM/dd');
        var v= format(value, 'yyyy/MM/dd hh:mm');
        setMeetingDate(v);
       const tryget='https://localhost:44380/api/amen/'
       fetch(tryget+t,
       {
           method: 'GET',
           headers: new Headers({
           'Content-Type': 'application/json; charset=UTF-8',
           'Accept': 'application/json; charset=UTF-8',
           })
           })
           .then(res => {
           console.log('res=', res);
           console.log('res.status', res.status);
           console.log('res.ok', res.ok);
           return res.json()
           })
           .then(
               (result) => {
                console.log(result);
                const indexedHours = result.map((hour, index) => {
                    return { id: index, time: hour };
                  });      
                          //לפה להכניס את הזמנים החדשים          
                  setTimeSlots(indexedHours);
               },
           (error) => {
           console.log("err post=", error);
           });    


    }
    // הפונקציה שאני מעביר כדי לתפוס את הערך של שעות
    const handleMeetingTimeChange = (value) => {
        setMeetingTime(value);
    }
    //הפוקנציה שאני מעביר בשביל הכפתור אישור שיקח את המשתנים בזמן הלחיצה
    const setNewMeeting = (event) => 
    {
        event.preventDefault();
        const newMeeting = 
        {      
                TreatmentDate : meetingDate,
                WasDone : "n",
                StartTime : meetingTime,
                Room_Num :1,
                Type_Id: 1
            

        }
        console.log(newMeeting);

        const apiUrl="https://localhost:44380/api/createtre"

        fetch(apiUrl, 
            {
            method: 'POST',
            body: JSON.stringify(newMeeting),
            headers: new Headers({
            'Content-type': 'application/json; charset=UTF-8' //very important to add the 'charset=UTF-8'!!!!
            })
            })
            .then(res => {
            console.log('res=', res);
            return res.json()
            })
            .then(
            (result) => {
            console.log("fetch POST= ", result);
            },
            (error) => {
            console.log("err post=", error);
            });
        


        // setMeetingTime('');
        // setMeetingDate('');
    }

    return(
        <div className="patient-container-div">
            <TopBar 
                patientName={patientName} 
                onSideBarClick={patientSideBarClick} 
            />
                
                {/* מסך הבית של מטופל */}
                {/* <PHomePage /> */}


                {/* מסך תיאום פגישה חדשה */}
                {/* <PatientNewMeeting
                    timeSlots = {timeSlots}
                    therapistName = {therapistName}
                    setNewMeeting = {setNewMeeting}
                    onMeetingDateChange = {handleMeetingDateChange}
                    onMeetingTimeChange = {handleMeetingTimeChange}
                    clickedATime = {meetingTime}
                /> */}

                {/* מסך אישור תיאום פגישה */}
                <NewApproved />
            <BottomBar 
                onCalendarClick={patientCalendarClick} 
                onUserClick={patientUserClick} 
                onHomeClick={patientHomeClick} 
            />
        </div>
    );
}
export default Patient;