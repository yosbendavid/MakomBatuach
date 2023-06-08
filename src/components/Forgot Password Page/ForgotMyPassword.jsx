import React, { useState } from 'react';
import ButtonCard from '../Template parts/ButtonCard';
import ForgotMyPasswordTopPart from './ForgotMyPasswordTopPart';
import TextBox from '../Template parts/TextBox';
import '../../CSS/ForgotMyPassword.css';

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
    sendEmail(password);
    setIsSubmitted(true);
  };

  const generatePassword = () => {

    return password;
  };

    function sendEmail(password) {
        //לחשוב איך נשלח את המייל
    };
  
  
    return (
        <div className="forgotMyPassword-container">
          <div className="forgotMyPassword-div">
            <ForgotMyPasswordTopPart />
            {isSubmitted ? (
              <div className="email-send">
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