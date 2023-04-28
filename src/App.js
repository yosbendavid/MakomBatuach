import Login from "./components/Login Page/LogIn";
import Register from "./components/Register Page/Register";
import Patient from "./components/Patient/Patient";
import Therapist from "./components/Therapist/Therapist";
import { Link, Route, Routes } from 'react-router-dom';



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

        </Routes>
      </header>
      </div>
      </div>
  );
}

export default App;
