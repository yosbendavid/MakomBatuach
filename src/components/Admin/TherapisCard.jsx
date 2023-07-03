import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { InformationWrapper } from '../Therapist/Meeting/Meeting.style'
import {  InformationContainer, InformationDesc, InformationTitle, LogoText, TitleWrapper,
   LastSummary, LastSummaryTitle, LastSummaryDesc, StyledIcon, ReturnIcon, Navbar, AllSummary, AllSummaryTitle } from '../Therapist/Patient Case/PatientCase.Style'

const apiUrl = "https://localhost:44380/api/TherapisCard/";

export default function TherapistCard() {

  const navigate = useNavigate();

  const { therapistId } = useParams();
  const [therapist, setTherapist] = useState(null);

  useEffect(() => {
    const getTherapist = async () => {
      const result = await fetch(apiUrl + therapistId);
      const json = await result.json();
      console.log(json)
      setTherapist(json);
    };

    getTherapist();
  }, [therapistId]);

  if (!therapist) {
    return null;
  }

  const goBack = () => {
    navigate(-1);
  };


  return (
    <div>
    <ReturnIcon onClick={goBack} />
    <TitleWrapper>  
    <span></span> 
    <LogoText> {therapist.FirstName[0]} {therapist.LastName[0]} </LogoText>
    </TitleWrapper>
    <InformationWrapper>
    <InformationContainer> 
    <InformationTitle> שם פרטי </InformationTitle>
    <InformationDesc> {therapist.FirstName} {therapist.LastName} </InformationDesc>
    </InformationContainer>
    <InformationContainer> 
    <InformationTitle> אימייל </InformationTitle>
    <InformationDesc> {therapist.Email} </InformationDesc>
    </InformationContainer>
    <InformationContainer> 
    <InformationTitle> גיל </InformationTitle>
    <InformationDesc> {therapist.Age} </InformationDesc>
    </InformationContainer>
    <InformationContainer> 
    <InformationTitle> מספר מפגשים </InformationTitle>
    <InformationDesc> {therapist.NumTreatments} </InformationDesc>
    </InformationContainer>
    <InformationContainer> 
    <InformationTitle>שנות ניסיון</InformationTitle>
    <InformationDesc> {therapist.YearsOfExperience} </InformationDesc>
    </InformationContainer>
    </InformationWrapper>
    
    {/* <Navbar>
      <BottomNavigation>
        <BottomNavigationAction icon={<HomeOutlinedIcon />} onClick={go2HomePage}/>
        <BottomNavigationAction icon={<PermIdentityOutlinedIcon />} onClick={go2Patients}/>
        <BottomNavigationAction icon={<ArticleOutlinedIcon />} />
      </BottomNavigation>
    </Navbar> */}
    </div>
    
  )
}
