import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {Container, LeftIcon,LogoContainer,LogoText,Navbar,PatientDiv,PatientName,SearchDiv,SearchText,StyledFilterIcon,StyledIcon, TherapistDiv, TherapistName,} from "../Therapist/Patients/Patients.Style";

const apiUrl = "https://localhost:44380/api/GetAllTherapits/?email="


export default function AdminHome()
{
  const [therapists, setTherapists] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate(); 

  const email='admin@gmail.com'
  
  const getTherapists = async (email) => {
    const result = await fetch(apiUrl + email)
    const json = await result.json() 
    setTherapists(json);
  }

  // useEffect(() => {
  //   getPatients(therapistId) // call getPatients with therapistId
  // }, [therapistId]); // add therapistId as a dependency to useEffect

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
          <PatientCard key={therapist.Therapist_Id} patient={therapist} />
        ))}
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

//   const navigate = useNavigate(); 
//   const [email, setEmail] = useState('')
//   const { state } = useLocation();


//   useEffect(() => {
//     const email = state;
//     setEmail(email)
//     console.log(email);  
//   }, []);

  // const Go2PatientCase = () => {
  //   console.log(patient);
  //   navigate(`/PatientCase/${patient.patientId}`, {state:email});
  // }

return (
  <PatientDiv onClick={""}>
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









