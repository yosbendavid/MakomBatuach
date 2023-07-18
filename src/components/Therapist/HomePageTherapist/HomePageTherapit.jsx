import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';

import {
  FreeTime,
  FreeTime1,
  GreenStripe,
  LastMeetingContainer,
  LastMeetingsWrapper,
  LeftIcon,
  MeetingContainer,
  MeetingDate,
  MeetingDate1,
  MeetingHours,
  MeetingNum,
  MeetingRoom,
  MeetingText,
  MeetingTime,
  Navbar,
  RecentMeetingsContainer,
  RecentMeetingsTitle,
  SummaryButton,
  TherapistDiv,
  TherapistName,
  TitleName,
  TitleWrapper,
  XICon,
} from "./HomePageTherapit.Style";

const apiUrl = "https://localhost:44380/api/Therapist/?email=";
const apiUrll = "https://localhost:44380/api/Therapistpreviou/?email=";

export default function HomePageTherapit() {
  const [Meeting, setPaMeeting] = useState([]);
  const [Lastmeeting, setLastmeeting] = useState([]);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    const email = state;
    setEmail(email);
    GetMeeting(email);
    GetLastMeeting(email);
    console.log(email);
  }, []);

  const location = useLocation();

  const GetMeeting = async (email) => {
    console.log("email=", email);
    const result = await fetch(apiUrl + email);
    const json = await result.json();
    setPaMeeting(json);
  };

  const GetLastMeeting = async (email) => {
    console.log("email=", email);
    const result = await fetch(apiUrll + email);
    const json = await result.json();
    setLastmeeting(json);
  };

  const go2Patients = () => {
    navigate("/Patients", { state: email });
  };

  const Go2FreeTime = () => {
    console.log(email);
    navigate("/Schedule", { state: email });
  };

  const Go2Rom = () => {
    navigate("/Article", { state: email });
  };

  


  const currentDate = new Date().toLocaleDateString(); // get current date in the format of "MM/DD/YYYY"

  return (
    <div style={{ padding: "50px 0" }}>
      <TitleWrapper>
        <TherapistDiv>
          <TherapistName>
            {" "}
            {Meeting &&
              Meeting.length > 0 &&
              `${Meeting[0].FirstName[0]} ${Meeting[0].LastName[0]}`}{" "}
          </TherapistName>
        </TherapistDiv>
        <span></span>
        <TitleName>
          {" "}
          היי, {Meeting && Meeting.length > 0 && `${Meeting[0].FirstName}`} {" "}
        </TitleName>
      </TitleWrapper>
      <MeetingDate> פגישות להיום- {currentDate} </MeetingDate>
      {Meeting != null && Meeting.length > 0 ? (
        Meeting.map((meeting) => (
          <MeetingCard key={meeting.Therapist_Id} meeting={meeting} />
        ))
      ) : (
        <div> אין פגישות להיום </div>
      )}
      <RecentMeetingsContainer>
        <RecentMeetingsTitle> :פגישות אחרונות </RecentMeetingsTitle>
        <LastMeetingsWrapper>
          {Lastmeeting != null && Lastmeeting.length > 0 ? (
            Lastmeeting.map((meet) => (
              <LastMeetingCard meeting={meet} email={email} />
            ))
          ) : (
            <div> לא התקיימו פגישות היום </div>
          )}
        </LastMeetingsWrapper>
      </RecentMeetingsContainer>
      <div className="add-p-btn" style={{ textAlign: "center" }}>
        <FreeTime1 onClick={Go2FreeTime}>
        ימי חופש
        </FreeTime1>
      </div>
      <div className="add-p-btn" style={{ textAlign: "center" }}>
      </div>
      <Navbar>
        <BottomNavigation>
          <BottomNavigationAction icon={<HomeOutlinedIcon />} />
          <BottomNavigationAction
            icon={<PermIdentityOutlinedIcon />}
            onClick={go2Patients}
          />
          <BottomNavigationAction icon={<ArticleOutlinedIcon />} />
        </BottomNavigation>
      </Navbar>
    </div>
  );
}

const MeetingCard = ({ meeting }) => {

  const apiUrl = "https://localhost:44380/api/Update";
  
  const CancelMeeting = () => {
    Swal.fire({
      title: 'ביטול פגישה',
      text: '?האם ברצונך לבטל את הפגישה',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'כן',
      cancelButtonText: 'לא',
    }).then((result) => {
      if (result.isConfirmed) {
        // Send PUT request to update the WasDone field
        fetch(apiUrl, {
          method: 'PUT',
          body: JSON.stringify(meeting.Treatment_Id),
          headers: new Headers({
            'Content-type': 'application/json; charset=UTF-8',
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            // Handle successful update
            console.log('Meeting canceled');
            Swal.fire({
              title: 'הפגישה בוטלה',
              icon: 'success'
            })
            setTimeout(() => {
              window.location.reload(); // Reload the current page after a delay
            }, 1000); // Set the desired delay in milliseconds (e.g., 2000ms = 2 seconds)
          })
          .catch((error) => {
            // Handle error
            console.error('Failed to cancel meeting', error);
          });
      }
    });
  };

  const startTimeOnly = new Date(meeting.StartTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const endTimeOnly = new Date(meeting.EndTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  if ((meeting.WasDone === "n" || meeting.WasDone === "N") && meeting.Room_Num !== 3)
    return (
      <MeetingContainer>
      <XICon onClick={CancelMeeting}/>
        <GreenStripe />
        <MeetingText>
          {" "}
         פגישה עם {meeting.PatientFirstName} {meeting.PatientLastName} {" "}
        </MeetingText>
        <MeetingRoom> חדר {meeting.Room_Num} </MeetingRoom>
        <MeetingHours>
          {" "}
          {startTimeOnly} - {endTimeOnly}{" "}
        </MeetingHours>
      </MeetingContainer>
    );
};


const LastMeetingCard = ({ meeting, email }) => {
  const date = new Date(meeting.Treatment_Date).toLocaleDateString();
  const startTimeOnly = new Date(meeting.StartTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const endTimeOnly = new Date(meeting.EndTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const navigate = useNavigate();

  const Go2MeetingSummary = () => {
    const date = new Date(meeting.Treatment_Date).toLocaleDateString();
    const time = `${startTimeOnly} - ${endTimeOnly}`;

    const DateTime = {
      Date1: date,
      Time: time,
      numOfMeeting: meeting.Treatment_Id,
      Email: email
    };

    navigate("/NewMetting", { state: DateTime });
  };

  if ((meeting.WasDone === "y" || meeting.WasDone === "Y") && meeting.Room_Num !== 3)
    return (
      <LastMeetingContainer>
        <MeetingText>
          {" "}
          {meeting.PatientFirstName} {meeting.PatientLastName}{" "}
        </MeetingText>
        <MeetingNum> פגישה מספר {meeting.Treatment_Id} </MeetingNum>
        <MeetingTime>
          {" "}
          {startTimeOnly} - {endTimeOnly}{" "}
        </MeetingTime>
        <MeetingDate1> {date} </MeetingDate1>
        <SummaryButton onClick={Go2MeetingSummary}>
          {" "}
          סיכום פגישה <LeftIcon />{" "}
        </SummaryButton>
      </LastMeetingContainer>
    );
};
