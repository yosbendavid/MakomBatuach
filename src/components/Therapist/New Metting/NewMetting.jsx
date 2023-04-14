import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import React, { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { StyledIcon } from '../Meeting/Meeting.style'
import { ButtonAddFiles, ButtonDiv, ButtonSummery, IconRecord, InformationContainer, InformationDesc, InformationTextArea, InformationTextAreaSummery, InformationTitle, InformationWrapper, MeetingTitle, Navbar, RecordButton, SaveButton, TitleWrapper } from './NewMetting.style'

export default function NewMetting(props) {
  
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const location = useLocation();
  const { Date, Time } = location.state;


 

 
  return (
    <div>
    <TitleWrapper>  
    <span></span> 
    <MeetingTitle> סיכום טיפול חדש </MeetingTitle>
    <StyledIcon onClick={goBack} />
    </TitleWrapper>
    <InformationWrapper>
    <InformationContainer> 
    <InformationTitle> תאריך </InformationTitle>
    <InformationDesc> {Date} </InformationDesc>
    </InformationContainer>
    <InformationContainer> 
    <InformationTitle> שעה </InformationTitle>
    <InformationDesc> {Time} </InformationDesc>
    </InformationContainer>
    <InformationContainer> 
    <InformationTitle> חשוב לציין </InformationTitle>
    <InformationTextArea> </InformationTextArea>
    </InformationContainer>
    <InformationContainer> 
    <InformationTitle> סיכום </InformationTitle>
    <InformationTextAreaSummery> </InformationTextAreaSummery>
    </InformationContainer>
    </InformationWrapper>
    <ButtonDiv>
    <IconRecord />
    <ButtonSummery> הוסף סיכום </ButtonSummery>
    </ButtonDiv>
    <ButtonDiv>
    <ButtonAddFiles> + הוסף קובץ למטופל  </ButtonAddFiles>
    </ButtonDiv>
    <ButtonDiv>
    <SaveButton> שמור </SaveButton>
    </ButtonDiv>

    <Navbar>
      <BottomNavigation>
        <BottomNavigationAction icon={<HomeOutlinedIcon />} />
        <BottomNavigationAction icon={<PermIdentityOutlinedIcon />} />
        <BottomNavigationAction icon={<ArticleOutlinedIcon />} />
      </BottomNavigation>
    </Navbar>

    </div>
  )
}
