import React, { useState } from 'react';
import ButtonCard from '../Template parts/ButtonCard';
import ForgotMyPasswordTopPart from './ForgotMyPasswordTopPart';
import TextBox from '../Template parts/TextBox';
import '../../CSS/ForgotMyPassword.css';
import { Navigate, useNavigate, useNavigation } from 'react-router-dom';
import Swal from 'sweetalert2';

const ForgotMyPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Generate a new password and send it to the email
    const newPassword = generatePassword();
    setPassword(newPassword)
    userexist(password);
    setIsSubmitted(true);
  };

  const generatePassword = () => {

    return password;
  };

  const navigate = useNavigate();

  const Go2RegisterPatient = () => {
    navigate("/RegisterPatient");
  }

  
  const Go2Login = () => {
    navigate("/Login");
  }

  const userexist=()=>
  {
  const apiUrl = "https://localhost:44380/api/SignInUser/userexist/?email=";

  try {

    fetch(apiUrl+email, 
      {
      method: 'GET',
      headers: new Headers({
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json; charset=UTF-8',
      })
      })
      .then(res => {
        console.log('res=', res);
        if (res.status === 200) {
          sendEmail(password);
        }
        if (res.status === 400) {
          Swal.fire(
                     'You dont have a user',
                     'Please Sign In '
                )
          Go2RegisterPatient();
        }
      })
      .then(
        (result) => {
          console.log("fetch POST= ", result);
        },
        (error) => {
          console.log("err post=", error);
        });

  }
  catch (error) {
    console.error('Request failed with status code', error.response.status);
  }
}


function sendEmail(password) {
  //לחשוב איך נשלח את המייל
};


return (
  <div className="forgotMyPassword-container">
    <div className="forgotMyPassword-div">
      <ForgotMyPasswordTopPart />
      {isSubmitted ?
       (
        <div className="email-send" onClick={Go2Login}>
          <p>סיסמא נשלחה לכתובת - {email}.</p>
          <p>בדוק את המייל שלך.</p>
          <ButtonCard>חזור לעמוד הבית</ButtonCard>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <p className="FPQ-txt">שכחת את הסיסמא?</p>
          <p className="FPQ-txt-two">מלא את המייל שלך ותישלח לך הסיסמא לשם</p>
          <TextBox
            id={1}
            title="אימייל"
            placeHolder="הכנס אימייל כאן"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          <button className="FMPSubmit" type="submit">
            שלח
          </button>
        </form>
      )}
    </div>
  </div>
);
      };

export default ForgotMyPassword;