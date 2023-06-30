import React, { useState, useEffect } from "react";
import "../../CSS/Patient.css";
import PatientNewMeeting from "./Patient New Meeting/PatientNewMeeting";
import BottomBar from "../Template parts/BottomBar";
import TopBar from "../Template parts/TopBar";
import { format } from "date-fns";
import { useNavigate, useLocation } from "react-router-dom";

const Patient = (props) => {

  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    const { email, Freedays } = state;
    setEmail(state.email);
    setFreedays(state.Freedays);
    console.log(Freedays);
    console.log(email);
  }, []);

  const [patientName, setPatientName] = useState("");
  const [therapistName, setTherapistName] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [roomNum, setRoomNum] = useState("");
  const [email, setEmail] = useState("");
  const [Freedays, setFreedays] = useState([]);


  const patientNameHandle = () => {
    setPatientName("");
  };
  const patientUserClick = () => { };
  const patientHomeClick = () => {
    navigate("/Phome", { state: email })
  };
  const patientCalendarClick = () => {
    navigate("/PaSummaries", { state: email })
  };
  const patientSideBarClick = () => { };

  // הפונקציה שאני מעביר כדי לתפוס את הערך של תאריך, להעביר את הזמנים החדשים ולרנדר
  const handleMeetingDateChange = (value) => {
    var t = format(value, "yyyy/MM/dd");
    console.log(email);
    var v = format(value, "yyyy/MM/dd hh:mm");
    setMeetingDate(v);
    const tryget = "https://localhost:44380/api/amen/";
    fetch(tryget + t + "/?email=" + email, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        console.log("res=", res);
        console.log("res.status", res.status);
        console.log("res.ok", res.ok);
        return res.json();
      })
      .then(
        (result) => {
          console.log(result);
          const indexedHours = result.map((roomNum, index) => {
            return { id: index, room: roomNum.Room_Num };
          });
          //לפה להכניס את הזמנים החדשים
          setTimeSlots(result);
          setRoomNum(indexedHours);
        },
        //////Not Good!!! "result[2].Room_Num" points to a specific place. Maybe Map functiom?
        (error) => {
          console.log("err post=", error);
        }
      );
  };
  // הפונקציה שאני מעביר כדי לתפוס את הערך של שעות
  const handleMeetingTimeChange = (value) => {
    setMeetingTime(value);
  };

  const handleRoomNum = (value) => {
    setRoomNum(roomNum[value].room);
  };
  //הפוקנציה שאני מעביר בשביל הכפתור אישור שיקח את המשתנים בזמן הלחיצה

  const Go2Approve = () => {
    console.log({ state: email })
    navigate("/meetingApproved", { state: email });
  };

  const setNewMeeting = (event) => {
    event.preventDefault();
    const newMeeting = {
      TreatmentDate: meetingDate,
      WasDone: "n",
      StartTime: meetingTime,
      Room_Num: roomNum,
      Type_Id: 1,
      Patient_Email: email,
    };
    console.log(newMeeting);

    const apiUrl = "https://localhost:44380/api/createtre";

    try {
      fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(newMeeting),
        headers: new Headers({
          "Content-type": "application/json; charset=UTF-8",
        }),
      })
        .then((res) => {
          console.log("res=", res);
          if (res.status === 200) Go2Approve();
          {
          }
        })
        .then(
          (result) => {
            console.log("fetch POST= ", result);
          },
          (error) => {
            console.log("err post=", error);
          }
        );
    } catch (error) {
      console.error("Request failed with status code", error.response.status);
    }
  };

  return (
    <div className="patient-container-div">
      <TopBar patientName={patientName} onSideBarClick={patientSideBarClick} />

      {/* מסך תיאום פגישה חדשה */}
      <PatientNewMeeting
        timeSlots={timeSlots}
        therapistName={therapistName}
        setNewMeeting={setNewMeeting}
        onMeetingDateChange={handleMeetingDateChange}
        onMeetingTimeChange={handleMeetingTimeChange}
        RoomPicked={handleRoomNum}
        clickedATime={meetingTime}
        blockedDates={Freedays}
        email={email}
      />

      {/* מסך אישור תיאום פגישה */}
      {/* <NewApproved /> */}
      <BottomBar
        onCalendarClick={patientCalendarClick}
        onUserClick={patientUserClick}
        onHomeClick={patientHomeClick}
      />
    </div>
  );
};
export default Patient;
