import React, { useState, useEffect } from "react";
import "../../CSS/Patient.css";
import BottomBar from "../Template parts/BottomBar";
import TopBar from "../Template parts/TopBar";
import { format } from "date-fns";
import { useNavigate, useLocation } from "react-router-dom";

const PatientSummaries = () => {

//   const navigate = useNavigate();
//   const { state } = useLocation();
//   useEffect(() => {
//     const { email } = state;
//     setEmail(state.email);
//     console.log(email);
//   }, []);

  const [patientName, setPatientName] = useState("");
//   const [therapistName, setTherapistName] = useState("");
//   const [meetingDate, setMeetingDate] = useState("");
//   const [meetingTime, setMeetingTime] = useState("");
//   const [email, setEmail] = useState("");


//   const patientNameHandle = () => {
//     setPatientName("");
//   };
  const patientUserClick = () => {};
  const patientHomeClick = () => {};
  const patientCalendarClick = () => {};

//   // הפונקציה שאני מעביר כדי לתפוס את הערך של תאריך, להעביר את הזמנים החדשים ולרנדר
//   const handlePastSummaries = (value) => {
//     const apiUrl = "";
//     fetch(apiUrl + email, {
//       method: "GET",
//       headers: new Headers({
//         "Content-Type": "application/json; charset=UTF-8",
//         Accept: "application/json; charset=UTF-8",
//       }),
//     })
//       .then((res) => {
//         console.log("res=", res);
//         console.log("res.status", res.status);
//         console.log("res.ok", res.ok);
//         return res.json();
//       })
//       .then(
//         (result) => {
//           console.log(result);
//           const indexedHours = result.map((roomNum, index) => {
//             return { id: index, room: roomNum.Room_Num };
//           });
       
//         },
//         (error) => {
//           console.log("err post=", error);
//         }
//       );
//   };


  return (
    <div className="patient-container-div">
      <TopBar patientName={patientName}  />
      <div className='login-title'>
                <p className='login-title-text'>הסיכומים שלי </p>
            </div>


      <BottomBar
        onCalendarClick={patientCalendarClick}
        onUserClick={patientUserClick}
        onHomeClick={patientHomeClick}
      />
    </div>
  );
};
export default PatientSummaries;
