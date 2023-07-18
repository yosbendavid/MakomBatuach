import React, { useState, useEffect } from "react";
import "../../../CSS/Patient.css";
import BottomBar from "../../Template parts/BottomBar";
import TopBar from "../../Template parts/TopBar";
import { format } from "date-fns";
import { useNavigate, useLocation } from "react-router-dom";
import { ContainerSummaries, LeftIcon, LeftIcon1, Navbar, ReturnIcon1, SummaryDate, SummaryDiv, SummaryNum, TitleSummary } from '../Patient Summary/PatientSummary.Style'
import PatientHPMeetings from "../PatientHomePage/PatientHPMeetings";

const PatientSummaries = () => {

  const navigate = useNavigate();
  const { state } = useLocation();

  const [email, setEmail] = useState("");

  const patientNameHandle = (name) => {
    setPatientName(name);
  };

  useEffect(() => {
    const email  = state;
    setEmail(email);
    console.log("email=",email);
    const apiUrl = "https://localhost:44380/api/GetPatientSummaries/?email=";
    fetch(apiUrl + email, {
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
          setSummaries(result);
          console.log(result.PatientName);
          patientNameHandle(result[0].PatientName);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  }, []);

  const [patientName, setPatientName] = useState("");
  const [summary, setSummaries] = useState([]);




  const patientUserClick = () => { };
  const patientHomeClick = () => { navigate("/Phome", { state: email } )};
  const patientCalendarClick = () => {navigate("/PaSummaries", { state: email } ) };

  const handlePastSummaries = () => {
    const apiUrl = "https://localhost:44380/api/GetPatientSummaries/?email=";
    fetch(apiUrl + email, {
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
          setSummaries(result);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  return (
    <div className="patient-container-div">
      <TopBar patientName={patientName} />
      <div className='login-title'>
        <p className='login-title-text'>הסיכומים שלי </p>
      </div>

      <ContainerSummaries>
        {summary.map((summary, index) => (
          <SummaryCard key={summary.Patient_Id} summary={summary} index={index} num={summary.Summary_Num} />
        ))}
      </ContainerSummaries>

      <BottomBar
        onCalendarClick={patientCalendarClick}
        onUserClick={patientUserClick}
        onHomeClick={patientHomeClick}
      />
    </div>
  );
};
export default PatientSummaries;


const SummaryCard = ({ summary, index, num }) => {

  const navigate = useNavigate();

  const Go2Summary = () => {

    const Data = {
      in: index,
      Num: num
    };

    console.log("Data",Data)

    navigate(`/Metting/${summary.Patient_Id}/${summary.Summary_Date}`, { state: Data });
    // navigate(`/Metting/${num}`);

  }

  return (
    <SummaryDiv onClick={Go2Summary}>
      <SummaryNum>
      סיכום {index+1}
      </SummaryNum>
      <SummaryDate> {summary.Summary_Date} </SummaryDate>
    </SummaryDiv>
  );
};
;

