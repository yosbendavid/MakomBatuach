import Login from "./components/Login Page/LogIn";
import Register from "./components/Register Page/Register";
import Patient from "./components/Patient/Patient";
import Therapist from "./components/Therapist/Therapist";
import PatientHomePage from "./components/Patient/PatientHomePage/PatientHPMeetings";
import { Link, Route, Routes } from 'react-router-dom';
import PHomePage from "./components/Patient/PatientHomePage/PHomePage";
import PatientHPMeetings from "./components/Patient/PatientHomePage/PatientHPMeetings";
import PatientNewMeeting from "./components/Patient/Patient New Meeting/PatientNewMeeting";



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
          {/* <Route path="/Pnm" element={<PatientNewMeeting />} /> */}
        </Routes>
      </header>
      </div>
      </div>
  );
}

export default App;
