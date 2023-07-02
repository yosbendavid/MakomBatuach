import React, { useState, useEffect } from "react";
import PatientHPMeetings from "./PatientHPMeetings";
import "../../../CSS/PHomePage.css";
import { useNavigate, useLocation } from "react-router-dom";
import BottomBar from "../../Template parts/BottomBar";
import TopBar from "../../Template parts/TopBar";
import PrevPatientMeetings from "../Prevmeeting";


const dummy_meetings = [
  {
    id: 1,
  },

];

const PHomePage = () => {

  const apiUrl = "https://localhost:44380/api/patientstreatment/?email="

  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    const email = state;
    console.log(email)
    setEmail(email)
    console.log(email);
    fetch(apiUrl + email,
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
          result.map(tr => console.log(tr.id));
          console.log("patientmeeting", result);
          setPatientMeetings(result);

        },
        (error) => {
          console.log("err post=", error);
        });
  }, [])

  const [patientMeetings, setPatientMeetings] = useState(dummy_meetings)
  const [email, setEmail] = useState('')
  const [Freedays, setFreedays] = useState([]);
  const [patientName, setPatientName] = useState("");

  const patientUserClick = () => { };
  const patientHomeClick = () => {
    navigate("/Phome", { state: email })

  };
  const patientCalendarClick = () => {
    console.log("email pa", email)
    navigate("/PaSummaries", { state: email })

  };

  const addMeetingsHandler = newPatientMeeting => {
    setPatientMeetings(prevPatientMeetings => {
      return [newPatientMeeting, ...prevPatientMeetings]
    });
  };

  const Go2Nemeeting = () => {
    const tryget = "https://localhost:44380/api/getdayoff";
    fetch(tryget + "/?email=" + email, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
    .then((res) => res.json()) 
    .then(
      (result) => {
        console.log("result:", result);
        const dates = result.map((item) => new Date(item.Dayoff).toLocaleDateString()); // שנה את התאריך הנוחכי לסטרינג
        setFreedays(dates);
        console.log("dates:", Freedays);
        navigate('/Patient', { state: { email, Freedays: dates } }); // העבר את התאריכים הנכונים
      },
        (error) => {
          console.log("err post=", error);
        }
      );
  }
  const Go2PrevTreat = () => {
    navigate("/Prev", { state: email });
  }

  const [showPrevMeetings, setShowPrevMeetings] = useState(true); // State for showing previous meetings

  const togglePrevMeetings = () => {
    setShowPrevMeetings(!showPrevMeetings);
  };

  const buttonLabel = showPrevMeetings ? "סגור פגישות קודמות" : "לחץ לפגישות קודמות";


  return (
    <div className="PHomePage-container">
      <div className="patient-container-div">
        <TopBar patientName={patientName} />
        <p className="pName">שלום, {patientName? patientName : ""}</p>
        <div className="setMeetingBtn">
          <p className="upcoming-Meetings-title">פגישות קרובות:</p>
        </div>
        <div className="items-div">
          <PatientHPMeetings papatientMeetings={patientMeetings} />
        </div>
        <button className="setMeetBTN" onClick={Go2Nemeeting}> לזימון פגישה</button>  
        <br></br> 
        <button className="seeAllDocuments" onClick={togglePrevMeetings}>
        {buttonLabel}
        </button>
        {showPrevMeetings && <PrevPatientMeetings />}
        {/* <button className="seeAllDocuments" onClick={Go2PrevTreat}>לחץ לפגישות קודמות</button>    
   <prevPatientMeetings/> */}
      </div>
      <BottomBar
        onCalendarClick={patientCalendarClick}
        onUserClick={patientUserClick}
        onHomeClick={patientHomeClick}

      />
    </div>
  );
}
export default PHomePage;

