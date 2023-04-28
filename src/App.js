import Login from "./components/Login Page/LogIn";
import Register from "./components/Register Page/Register";
import Patient from "./components/Patient/Patient";
import Therapist from "./components/Therapist/Therapist";


function App() {
  return (
    <div>
      <Register />
      <Login />   
      <Patient />
      {/* <Therapist /> */}
    </div>
  );
}

export default App;
