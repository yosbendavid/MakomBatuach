import {  BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePageTherapit from './Comp/HomePageTherapist/HomePageTherapit';
import Metting from './Comp/Meeting/Metting';
import NewMetting from './Comp/New Metting/NewMetting';
import PatientCase from './Comp/Patient Case/PatientCase';
import Patients from './Comp/Patients/Patients';
import Summaries from './Comp/Summries/Summaries';
import FileUpload from '../Files/FileUpload';
import FilesListRender from '../Files/FilesListRender';




function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePageTherapit />} />
        <Route path='/PatientCase/:patientId' element={<PatientCase/>} />
        <Route path='/NewMetting' element={<NewMetting/>} />
        <Route path='/Summaries/:patientId' element={<Summaries/>} />
        <Route path='/Metting/:Patient_Id/:Summary_Date' element={<Metting/>} />
        <Route path='/HomePageTherapit' element={<HomePageTherapit/>} />
        <Route path='/Patients' element={<Patients/>} />
        <Route path='/FilesListRender' element={<FilesListRender/>} />
       </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
