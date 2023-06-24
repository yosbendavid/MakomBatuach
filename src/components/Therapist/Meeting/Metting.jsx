import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import React, { useEffect, useState } from 'react'
import {  useLocation, useNavigate, useParams } from 'react-router-dom';
import { ButtonDiv, ButtonFiles, InformationContainer, InformationDesc, InformationTitle, InformationWrapper, MeetingTitle, Navbar, StyledIcon, TherapistDiv1, TherapistName1, TitleWrapper } from './Meeting.style'

const apiUrl = "https://localhost:44380/api/GetSummaryByDate/";


export default function Metting() {

  
  const navigate = useNavigate();

  const location = useLocation();
  const { Num } = location.state;

  const {Patient_Id, Summary_Date} = useParams();
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const getPatient = async () => {
      const result = await fetch(`${apiUrl}${Patient_Id}/${Summary_Date}`);
      const json = await result.json();
      setSummary(json);
      console.log(json);
    };

    getPatient();
  }, [Patient_Id, Summary_Date]);

  if (!summary) {
    return null;
  }
  


const goBack = () => {
  navigate(-1);
};

const go2HomePage = () => {
    
  navigate(`/HomePageTherapit`);
}

const go2Patients = () => {
  
  navigate(`/Patients`);
}

const startTimeOnly = new Date(summary.StartTime).toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});
const endTimeOnly = new Date(summary.EndTime).toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

  return (
    <div>
    <TitleWrapper>  
    <span></span> 
    <MeetingTitle> סיכום טיפול </MeetingTitle>
    <StyledIcon onClick={goBack} />
    </TitleWrapper>
    <InformationWrapper>
    <InformationContainer> 
    <InformationTitle> מטופל </InformationTitle>
    <InformationDesc> {summary.FirstNameP} {summary.LastNameP} </InformationDesc>
    </InformationContainer>
    <InformationContainer> 
    <InformationTitle> מספר פגישה </InformationTitle>
    <InformationDesc> {Num + 1} </InformationDesc>
    </InformationContainer>
    <InformationContainer> 
    <InformationTitle> תאריך </InformationTitle>
    <InformationDesc> {summary.Summary_Date} </InformationDesc>
    </InformationContainer>
    <InformationContainer> 
    <InformationTitle> שעה </InformationTitle>
    <InformationDesc> {startTimeOnly} - {endTimeOnly} </InformationDesc>
    </InformationContainer>
    <InformationContainer> 
    <InformationTitle> חשוב לציין </InformationTitle>
    <InformationDesc> {summary.ImportanttoNote} </InformationDesc>
    </InformationContainer>
    <InformationContainer> 
    <InformationTitle> סיכום </InformationTitle>
    <InformationDesc> {summary.Content} </InformationDesc>
    </InformationContainer>
    </InformationWrapper>
    <ButtonDiv>
      <ButtonFiles> קבצים למטופל </ButtonFiles>
    </ButtonDiv>
    <Navbar>
      <BottomNavigation>
        <BottomNavigationAction icon={<HomeOutlinedIcon />} onClick={go2HomePage}/>
        <BottomNavigationAction icon={<PermIdentityOutlinedIcon />} onClick={go2Patients} />
        <BottomNavigationAction icon={<ArticleOutlinedIcon />} />
      </BottomNavigation>
    </Navbar>
    </div>
  );
};

