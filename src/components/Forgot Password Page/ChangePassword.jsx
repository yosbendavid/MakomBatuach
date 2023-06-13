import React, { useState } from 'react';
import ButtonCard from '../Template parts/ButtonCard';
import ForgotMyPasswordTopPart from './ForgotMyPasswordTopPart';
import TextBox from '../Template parts/TextBox';
import '../../CSS/ForgotMyPassword.css';
import { Navigate, useNavigate, useNavigation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';


const ChangePassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [response, setResponse] = useState(false);


  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlepasswordChange=(value)=>
  {
    setPassword(value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    try{
    userexist(); 
    if(response===200)
    {
        }
    else
    {
      Swal.fire(
        'You dont have a user',
        'Please Contact Your Therapist '
      )
      setIsSubmitted(false);
    }

    }
    catch (error) {
      console.error('Request failed with status code', error.response.status);
    }
  };

  const navigate = useNavigate();

  const Go2RegisterPatient = () => {
    navigate("/RegisterPatient");
  }


  const Go2Login = () => {
    navigate("/Login");
  }

  const userexist = () => {
    const apiUrl = "https://localhost:44380/api/SignInUser/userexist/?email=";

    try {

      fetch(apiUrl + email,
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
            setResponse(res.status)
          }
          if (res.status === 400) {
            Swal.fire(
              'You dont have a user',
              'Please Contact Your Therapist '
            )
            setResponse(res.status)
            
          }
        })

    }
    catch (error) {
      console.error('Request failed with status code', error.response.status);
    }
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
              <p className="FPQ-txt">החלפת סיסמא</p>
              <p className="FPQ-txt-two">מלא את הסיסמא החדשה</p>
              <TextBox
                id={1}
                title="אימייל"
                placeHolder="הכנס אימייל כאן"
                type="email"
                name='user_email'
                value={email}
                onChange={handleEmailChange}
              />
               <TextBox
                id={1}
                title="סיסמא"
                placeHolder="הכנס סיסמא כאן"
                type="password"
                name='user_password'
                value={password}
                onChange={handlepasswordChange}
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

export default ChangePassword;