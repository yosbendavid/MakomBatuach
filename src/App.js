import Login from "./components/Login Page/LogIn";
import Register from "./components/Register Page/Register";
import Patient from "./components/Patient/Patient";
import Therapist from "./components/Therapist/Therapist";
import PatientHomePage from "./components/Patient/PatientHomePage/PatientHPMeetings";
import { Link, Route, Routes } from 'react-router-dom';
import PHomePage from "./components/Patient/PatientHomePage/PHomePage";
import PatientHPMeetings from "./components/Patient/PatientHomePage/PatientHPMeetings";
import PatientNewMeeting from "./components/Patient/Patient New Meeting/PatientNewMeeting";
import MeetingApproved from "./components/Patient/Patient New Meeting/MeetingAproved";



function App() {
  return (
    <div>
        <div className="App">

      <header className="App-header">
        
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Patient" element={<Patient />} />
          <Route path="/Therapist" element={<Therapist />} />


          <Route path="/Phome" element={<PHomePage />} />
          <Route path="/Pmeeting" element={<PatientHPMeetings />} />
          <Route path="/Pnm" element={<PatientNewMeeting />} />
        </Routes>

        <p>Register:</p>
        <Register />
        <p>Login:</p>
        <Login /> 
        <p>Meeting Approved:</p>
        <MeetingApproved/>
        <p>Patient HomePage</p>
        <PHomePage/>
        <p>Therapist</p>
        <Therapist/>
        <p>New Meeting</p>
        <Patient/>
      
  
  
      </header>
      </div>
      </div>
  );
}

export default App;
