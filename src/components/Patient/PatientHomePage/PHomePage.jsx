import React, { useState,useEffect  } from "react";
import PatientHPMeetings from "./PatientHPMeetings";
import "../../../CSS/PHomePage.css";
import { useNavigate, useLocation } from "react-router-dom";

const dummy_meetings = [
    {
        id: 1,
    },
    
];

const PHomePage = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    // const email = queryParams.get('email');
    // console.log('email=',email)
  

    const [patientMeetings, setPatientMeetings] = useState(dummy_meetings)

    const addMeetingsHandler = newPatientMeeting => {
        setPatientMeetings(prevPatientMeetings => {
            return [newPatientMeeting, ...prevPatientMeetings]
        });
    };
    
    const apiUrl="https://localhost:44380/api/patientstreatment/?email="

    useEffect(()=> {

        const email = queryParams.get('email');

        fetch(apiUrl+email, 
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
            console.log(result);
            setPatientMeetings(result);
    
            },
            (error) => {
            console.log("err post=", error);
            });
        
        } ,[])
        

    const navigate = useNavigate(); 

    const Go2Nemeeting = () => {
      navigate("/Patient");
    }

    const Go2NewSummary = () => {
        navigate("/NewMetting");
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
            <button className="seeAllDocuments">לחץ לפגישות קומות</button>
        </div>
    );
}
export default PHomePage;