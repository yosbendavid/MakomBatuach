import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ContainerSummaries, LeftIcon, LeftIcon1, Navbar, ReturnIcon1, SummaryDate, SummaryDiv, SummaryNum, TitleSummary } from './Summaries.Style'

const apiUrl = "https://localhost:44380/api/GetAllSummary/"


export default function Summaries() {

  const location = useLocation();
  const name = location.state.Name;
  const therid = location.state.TherId;
  const [summaries, setSummaries] = useState([]);
  const navigate = useNavigate();

  const { patientId } = useParams(); // get therapistId from URL

 useEffect(() => {
    const getSummary = async () => {
      const result = await fetch(apiUrl + patientId);
      const json = await result.json();
      setSummaries(json);
    };

    getSummary();
  }, [patientId]);

  if (!summaries) {
    return null;
  }

  summaries.sort((a, b) => new Date(b.Summary_Date) - new Date(a.Summary_Date));

  const goBack = () => {
    navigate(-1);
  };

  const go2HomePage = () => {
    
    navigate('/HomePageTherapit');
  }

  const go2Patients = () => {
    
    navigate(`/Patients`);
  }

  return (
    <div>
        <ContainerSummaries>
        <ReturnIcon1 onClick={goBack}/>
            <TitleSummary> {name} הסיכומים של </TitleSummary>
            {summaries.map((summary, index) => (
            <SummaryCard key={summary.Patient_Id} summary={summary} index={summaries.length-1 - index} therid={therid} />
        ))}    
        </ContainerSummaries>

        <Navbar>
      <BottomNavigation>
        <BottomNavigationAction icon={<HomeOutlinedIcon />} onClick={go2HomePage} />
        <BottomNavigationAction icon={<PermIdentityOutlinedIcon />} onClick={go2Patients} />
        <BottomNavigationAction icon={<ArticleOutlinedIcon />} />
      </BottomNavigation>
    </Navbar>
    </div>
  )
};



const SummaryCard = ({ summary, index, therid }) => {

  const navigate = useNavigate(); 

    const Go2Summary = () => {

      const Num = {
        Num: index,
        TherId:therid
      };

      navigate(`/Metting/${summary.Patient_Id}/${summary.Summary_Date}`, { state: Num });
    }

return (
  <SummaryDiv onClick={Go2Summary}>
  <SummaryNum>
   טיפול {index + 1}
  </SummaryNum>
 <SummaryDate> {summary.Summary_Date} </SummaryDate> 
  </SummaryDiv>   
);
};

