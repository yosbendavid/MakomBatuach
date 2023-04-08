import React, { useState } from 'react';
import TextBox from "../Template parts/TextBox";
import LoginTopPart from './LoginTopPart';
import {inputBoxArrayLogin} from "./Login-Data/inputBoxArrayLogin";
import ButtonCard from '../Template parts/ButtonCard'
import '../../CSS/login.css';

const Login = () => {

    const [email, seteEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleEmailChange = (value) => {
        seteEmail(value);
    }
    const handlePasswordChange = (value) => {
        setPassword(value);
    }
    // צריך לעדכן לולידציה רלוונטית לוחץ על התחבר זה הפונקציה עם הולידציה להתחברות
    const loginInAccount = () => {
        if (password == "1" && email == "1") {
            console.log("Great");
            const inputElement = document.getElementById('wrong-password-or-email');
            inputElement.style.display = 'none';
        } else {
            console.log("NO!");
            const inputElement = document.getElementById('wrong-password-or-email');
            inputElement.style.display = 'block';
        }
    }
    return(
        <div className="login-container-div">
            <LoginTopPart/>
            <div className='login-input-div'>
                <TextBox
                    id={inputBoxArrayLogin[0].id}
                    title={inputBoxArrayLogin[0].title}
                    placeHolder={inputBoxArrayLogin[0].placeHolder}
                    type={inputBoxArrayLogin[0].type}
                    onChange={handleEmailChange}
                />
                <TextBox
                    id={inputBoxArrayLogin[1].id}
                    title={inputBoxArrayLogin[1].title}
                    placeHolder={inputBoxArrayLogin[1].placeHolder}
                    type={inputBoxArrayLogin[1].type}
                    onChange={handlePasswordChange}
                />
                <div className='forgot-password-div'>
                    <p className='forgot-password-p'>שכחת סיסמה?</p>
                </div>
                <div id='wrong-password-or-email'>
                    <p className='wrong-password-or-email-p'>הסיסמה או האימייל שגויים, נסה שוב.</p>
                </div>
            </div>

            <div className='login-btn-div'>
                <ButtonCard className="register-submit-btn" onClick={loginInAccount}>התחבר</ButtonCard>
                <div className='new-account-div'>
                    <p className="register-account-p">אין לך משתמש? <span className="register-page">הירשם</span></p>
                </div>
            </div>
        </div>
    );
}
export default Login;