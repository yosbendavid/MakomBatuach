import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
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
} from "./HomePageTherapit.Style";

const apiUrl = "https://localhost:44380/api/Therapist/";

export default function HomePageTherapit() {
  const [Meeting, setPaMeeting] = useState([]);
  const { therapistId } = useParams(); // get therapistId from URL
  const navigate = useNavigate();

  const GetMeeting = async (therapistId) => {
    const result = await fetch(apiUrl + 1);
    const json = await result.json();
    setPaMeeting(json);
  };

  useEffect(() => {
    GetMeeting(therapistId);
  }, [therapistId]);

  const go2Patients = () => {
    navigate(`/Patients`);
  }

  const currentDate = new Date().toLocaleDateString(); // get current date in the format of "MM/DD/YYYY"

  return (
    <div>
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
          {Meeting && Meeting.length > 0 && `${Meeting[0].FirstName}`} היי{" "}
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
          {Meeting != null && Meeting.length > 0 ? (
            Meeting.map((meeting) => <LastMeetingCard meeting={meeting} />)
          ) : (
            <div> לא התקיימו פגישות היום </div>
          )}
        </LastMeetingsWrapper>
      </RecentMeetingsContainer>
      <Navbar>
        <BottomNavigation>
          <BottomNavigationAction icon={<HomeOutlinedIcon />} />
          <BottomNavigationAction icon={<PermIdentityOutlinedIcon />} onClick={go2Patients} />
          <BottomNavigationAction icon={<ArticleOutlinedIcon />} />
        </BottomNavigation>
      </Navbar>
    </div>
  );
}

const MeetingCard = ({ meeting }) => {
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
  if (meeting.WasDone === "n" || meeting.WasDone === "N")
    return (
      <MeetingContainer>
        <GreenStripe />
        <MeetingText>
          {" "}
          {meeting.PatientFirstName} {meeting.PatientLastName} פגישה עם{" "}
        </MeetingText>
        <MeetingRoom> חדר {meeting.Room_Num} </MeetingRoom>
        <MeetingHours>
          {" "}
          {startTimeOnly} - {endTimeOnly}{" "}
        </MeetingHours>
      </MeetingContainer>
    );
};

const LastMeetingCard = ({ meeting }) => {
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
      numOfMeeting: meeting.Treatment_Id
    };

    navigate("/NewMetting", { state: DateTime });
  };

  if (meeting.WasDone === "y" || meeting.WasDone === "Y")
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
