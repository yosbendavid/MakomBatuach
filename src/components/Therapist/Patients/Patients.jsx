import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ButtonCard from "../../Template parts/ButtonCard";
import {
  AddPatient,
  Container,
  LeftIcon,
  LogoContainer,
  LogoText,
  Navbar,
  PatientDiv,
  PatientName,
  SearchDiv,
  SearchText,
  StyledFilterIcon,
  StyledIcon,
  TherapistDiv,
  TherapistName,
} from "./Patients.Style";

const apiUrl = "http://proj.ruppin.ac.il/cgroup100/prod/api/getpatient/?email=";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [query, setQuery] = useState("");
  // const { therapistId } = useParams(); // השג therapistId מה יו אר אל
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const { state } = useLocation();

  useEffect(() => {
    const email = state;
    setEmail(email);
    console.log(email);
    getPatients(email);
  }, []);

  const getPatients = async (email) => {
    const result = await fetch(apiUrl + email);
    const json = await result.json();
    setPatients(json);
  };

  // useEffect(() => {
  //   getPatients(therapistId) // call getPatients with therapistId
  // }, [therapistId]); // add therapistId as a dependency to useEffect

  const filteredPatients = query
    ? patients.filter((patient) => {
        return (
          patient.FirstName.toLowerCase().includes(query.toLowerCase()) ||
          patient.LastName.toLowerCase().includes(query.toLowerCase())
        );
      })
    : patients;

  const go2HomePage = () => {
    navigate("/HomePageTherapit", { state: email });
  };

  const Go2NewRegister = () => {
    navigate("/NewRegister", { state: email });
  };

  return (
    <div>
      <Container>
        <TherapistDiv>
          <TherapistName>
            {" "}
            {patients.length > 0 &&
              `${patients[0].TherapistFirstName[0]} ${patients[0].TherapistLastName[0]}`}{" "}
          </TherapistName>
        </TherapistDiv>
        <SearchDiv>
          <SearchText
            onChange={(event) => setQuery(event.target.value)}
            type={"text"}
            placeholder="חיפוש..."
          />
          <StyledIcon />
          <StyledFilterIcon />
        </SearchDiv>
        {filteredPatients.map((patient) => (
          <PatientCard key={patient.Patient_Id} patient={patient} />
        ))}
      </Container>
      <div className="add-p-btn" style={{ textAlign: "center" }}>
        <AddPatient onClick={Go2NewRegister}>
          הוסף מטופל
        </AddPatient>
      </div>
      <Navbar>
        <BottomNavigation>
          <BottomNavigationAction
            icon={<HomeOutlinedIcon />}
            onClick={go2HomePage}
          />
          <BottomNavigationAction icon={<PermIdentityOutlinedIcon />} />
          <BottomNavigationAction icon={<ArticleOutlinedIcon />} />
        </BottomNavigation>
      </Navbar>
    </div>
  );
}

const PatientCard = ({ patient }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { state } = useLocation();

  useEffect(() => {
    const email = state;
    setEmail(email);
    console.log(email);
  }, []);

  const Go2PatientCase = () => {
    console.log(patient);
    navigate(`/PatientCase/${patient.patientId}`, { state: email });
  };

  return (
    <PatientDiv onClick={Go2PatientCase}>
      <LeftIcon />
      <PatientName>
        {" "}
        {patient.FirstName} {patient.LastName}
      </PatientName>
      <LogoContainer>
        <LogoText>
          {" "}
          {patient.FirstName[0]} {patient.LastName[0]}
        </LogoText>
      </LogoContainer>
    </PatientDiv>
  );
};
