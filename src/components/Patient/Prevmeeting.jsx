import React, { useState, useEffect } from "react";
import PatientHPMeetings from "./PatientHomePage/PatientHPMeetings";
import MeetingItemBox from "../Template parts/MeetingItemBox";
import "../../../src/CSS/PHomePage.css";
import { useNavigate, useLocation } from "react-router-dom";

const dummy_meetings = [
  {
    id: 1,
  },

];

const PrevPatientMeetings = () => {

  const apiUrl = "https://localhost:44380/api/prevpatientstreatment/?email="

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
          console.log("prevpatientmeeting", result);
          setPatientMeetings(result);

        },
        (error) => {
          console.log("err post=", error);
        });
  }, [])

  const [patientMeetings, setPatientMeetings] = useState([])
  const [email, setEmail] = useState('')

  const addMeetingsHandler = newPatientMeeting => {
    setPatientMeetings(prevPatientMeetings => {
      return [newPatientMeeting, ...prevPatientMeetings]
    });
  }; 



  const handleSummaryButtonClick = (key, name, date) => {
    const DateTime = {
      key,
      name,
      date
    };
  
    console.log(DateTime)
    navigate("/NewMetting", { state: DateTime });
  };
  
  
  return (
    <div className="PHomePage-container">
      <div className="setMeetingBtn">
        <p className="upcoming-Meetings-title"> פגישות קודמות</p>
      </div>
      <div className="items-div">
        <PatientHPMeetings papatientMeetings={patientMeetings} onSummaryButtonClick={handleSummaryButtonClick} />
      </div>
    </div>
  );
}
export default PrevPatientMeetings;