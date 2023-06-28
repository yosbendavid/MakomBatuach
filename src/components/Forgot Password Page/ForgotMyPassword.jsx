import React, { useState } from 'react';
import ButtonCard from '../Template parts/ButtonCard';
import ForgotMyPasswordTopPart from './ForgotMyPasswordTopPart';
import TextBox from '../Template parts/TextBox';
import '../../CSS/ForgotMyPassword.css';
import { Navigate, useNavigate, useNavigation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import axios from 'axios';


const ForgotMyPassword = () => {
  const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [response, setResponse] = useState(false);
  const newPassword = 'deafult_pass_please_change';



  const form = useRef()

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await userexist(); // Wait for userexist() to complete before proceeding
      if (userexist) {
        await change(); // Wait for change() to complete before proceeding
  
        setIsSubmitted(true);
        emailjs.sendForm('service_btaoeiz', 'template_kro756u', form.current, 'mIY_fS4vWork1Rt6F')
          .then((result) => {
            console.log(result.text);
          })
          .catch((error) => {
            console.log(error.text);
          });
      } else {
        Swal.fire('You dont have a user', 'Please Contact Your Therapist ');
        setIsSubmitted(false);
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  const navigate = useNavigate();


  const Go2Login = () => {
    navigate("/Login");
  }
  const userexist = async () => {
    const apiUrl = 'https://localhost:44380/api/SignInUser/userexist/?email=';
  
    try {
      const res = await fetch(apiUrl + email, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          Accept: 'application/json; charset=UTF-8',
        }),
      });
      console.log('res=', res);
      if (res.status === 200) {
        setResponse(res.status);
      }
      if (res.status === 400) {
        Swal.fire('You dont have a user', 'Please Contact Your Therapist ');
        setResponse(res.status);
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  const change = async () => {
    try {
      const response = await axios.post('https://localhost:44380/api/SignInUser/Changepa', {
        Email: email,
        Password: newPassword,
      });
      if (response.status === 200) {
        Swal.fire('Please check your email', 'success');
      }
    } catch (error) {
      console.error('Error occurred:', error);
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
            <form ref={form} onSubmit={handleSubmit}>
              <p className="FPQ-txt">שכחת את הסיסמא?</p>
              <p className="FPQ-txt-two">מלא את המייל שלך ותישלח לך הסיסמא לשם</p>
              <TextBox
                id={1}
                title="אימייל"
                placeHolder="הכנס אימייל כאן"
                type="email"
                name='user_email'
                value={email}
                onChange={handleEmailChange}
              />
              <input type="hidden" name="user_email" value={email}/>
              <input type="hidden" name="user_password" value={newPassword}/>



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