import Login from "./components/Login Page/LogIn";
import Register from "./components/Register Page/Register";
import Patient from "./components/Patient/Patient";
import Therapist from "./components/Therapist/Therapist";
import { Link, Route, Routes } from 'react-router-dom';



function App() {
  return (
    <div>
        <div className="App">
      <div style={{ margin: 20, fontSize: 25 }}>
        <Link to="/">Login</Link> |
        <Link to="/Register">Register</Link> |
        <Link to="Patient">Patient</Link>
        <Link to="Therapist">Therapist</Link>

      </div>

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
    
      {/* <Register />
      <Login />   
      <Patient />
      <Therapist /> */}
    </div>
  );
}

export default App;
