import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  Container, LeftIcon, LogoContainer, LogoText, Navbar, PatientDiv, PatientName, SearchDiv, SearchText, StyledFilterIcon,
  StyledIcon, TherapistDiv, TherapistName,
} from "../Therapist/Patients/Patients.Style";
import "../../CSS/PHomePage.css"

const apiUrl = "https://localhost:44380/api/GetAllTherapits/?email="


export default function AdminHome() {
  const [therapists, setTherapists] = useState([]);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  const { state } = useLocation();
  const [email, setEmail] = useState('')

  useEffect(() => {
    const email = state;
    // console.log(email)
    setEmail(email)
  })

  const getTherapists = async (email) => {
    const result = await fetch(apiUrl + email)
    const json = await result.json()
    setTherapists(json);
  }


  if (email) {
    getTherapists(email);
  }

  const Go2NewRegister = () => {
    navigate('/NewRegister',{state:"admin"})
  };

  
  const Go2Dashboard = () => {
    navigate('/Dashboard')
  };



  const filteredTherapists = query ? therapists.filter(therapist => {
    return therapist.FirstName.toLowerCase().includes(query.toLowerCase()) || therapist.LastName.toLowerCase().includes(query.toLowerCase())
  }) : therapists

  return (
    <div>
      <Container>
        <SearchDiv>
          <SearchText onChange={event => setQuery(event.target.value)} type={"text"} placeholder="חיפוש..." />
          <StyledIcon />
          <StyledFilterIcon />
        </SearchDiv>
        {filteredTherapists.map((therapist) => (
          <PatientCard key={therapist.Therapist_Id} therapist={therapist} />
        ))}

        <button className="setMeetBTN" onClick={Go2NewRegister}> רישום משתמש </button>
        <button className="setMeetBTN" onClick={Go2Dashboard}> אלמנט  </button>


      </Container>
      {/* <Navbar>
      <BottomNavigation>
        <BottomNavigationAction  icon={<HomeOutlinedIcon />} onClick={go2HomePage} />
        <BottomNavigationAction icon={<PermIdentityOutlinedIcon />} />
        <BottomNavigationAction icon={<ArticleOutlinedIcon />} />
      </BottomNavigation>
    </Navbar> */}
    </div>
  )
}




const PatientCard = ({ therapist }) => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const { state } = useLocation();


  useEffect(() => {
    const email = state;
    setEmail(email)
    console.log(email);
  }, []);

  const Go2TherCard = () => {
    // console.log(therapist);
    navigate(`/Thercard/${therapist.Therapist_Id}`);
  }


  return (
    <PatientDiv onClick={Go2TherCard}>
      <LeftIcon />
      <PatientName>
        {" "}
        {therapist.FirstName} {therapist.LastName}
      </PatientName>
      <LogoContainer>
        <LogoText>
          {" "}
          {therapist.FirstName[0]} {therapist.LastName[0]}
        </LogoText>
      </LogoContainer>
    </PatientDiv>
  );
};









