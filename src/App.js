import Login from "./components/Login Page/LogIn";
import RegisterPatient from "./components/Register Page/RegisterPatient";
import RegisterTherapist from "./components/Register Page/RegisterTherapist";
import Patient from "./components/Patient/Patient";
import Therapist from "./components/Therapist/Therapist";
import PatientHomePage from "./components/Patient/PatientHomePage/PatientHPMeetings";
import { Link, Route, Routes } from "react-router-dom";
import PHomePage from "./components/Patient/PatientHomePage/PHomePage";
import PatientHPMeetings from "./components/Patient/PatientHomePage/PatientHPMeetings";
import PatientNewMeeting from "./components/Patient/Patient New Meeting/PatientNewMeeting";
import MeetingApproved from "./components/Patient/Patient New Meeting/MeetingAproved";
import HomePageTherapit from "./components/Therapist/HomePageTherapist/HomePageTherapit";
import NewMetting from "./components/Therapist/New Metting/NewMetting";
import PatientCase from "./components/Therapist/Patient Case/PatientCase";
import Patients from "./components/Therapist/Patients/Patients";
import Summaries from "./components/Therapist/Summries/Summaries";
import NewRegister from "./components/Register Page/NewRegister";
import ForgotMyPassword from "./components/Forgot Password Page/ForgotMyPassword";
import ChangePassword from "./components/Forgot Password Page/ChangePassword";
import Schedule from "./components/Therapist/New Schedule/Schedule";
import Metting from "./components/Therapist/Meeting/Metting";
import PrevPatientMeetings from "./components/Patient/Prevmeeting";


function App() {
  return (
    <div>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Login" element={<Login />} />
            {/* <Route path="/RegisterTherapist" element={<RegisterTherapist />} /> */}
            <Route path="/RegisterPatient" element={<RegisterPatient />} />
            <Route path="/Patient" element={<Patient />} />
            {/* <Route path="/Therapist" element={<Therapist />} /> */}
            <Route path="/Phome" element={<PHomePage />} />
            <Route path="/Pmeeting" element={<PatientHPMeetings />} />
            <Route path="/Pnm" element={<PatientNewMeeting />} />
            <Route path="/meetingApproved" element={<MeetingApproved />} />
            <Route path="/NewRegister" element={<NewRegister />} />
            <Route path="/Forgot" element={<ForgotMyPassword />} />
            <Route path="/Change" element={<ChangePassword />} />
            <Route path="/Schedule" element={<Schedule />} />
            <Route path="/Prev" element={<PrevPatientMeetings />} />


          </Routes>
          <Routes>
            {/* <Route path='/' element={<HomePageTherapit />} /> */}
            <Route path="/PatientCase/:patientId" element={<PatientCase />} />
            <Route path="/Summaries/:patientId" element={<Summaries />} />
            <Route path='/Metting/:Patient_Id/:Summary_Date' element={<Metting/>} />
            <Route path="/HomePageTherapit" element={<HomePageTherapit />} />
            <Route path="/Patients" element={<Patients />} />
            <Route path="/NewMetting" element={<NewMetting />} />
          </Routes>
        </header>
      </div>
    </div>
  );
}

export default App;
