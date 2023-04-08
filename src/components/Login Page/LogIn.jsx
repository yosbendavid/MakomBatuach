import React, { useState } from 'react';
import TextBox from "../Template parts/TextBox";
import LoginTopPart from './LoginTopPart';
import {inputBoxArrayLogin} from "./Login-Data/inputBoxArrayLogin";
import ButtonCard from '../Template parts/ButtonCard'
import '../../CSS/login.css';

const Login = () => {

    const [email, seteEmail] = useState("");
    const [password, setPassword] = useState("");

    // הפונקציה שאני מעביר כדי לתפוס את הערך של אימייל
    const handleEmailChange = (value) => {
        seteEmail(value);
    }
    // הפונקציה שאני מעביר כדי לתפוס את הערך של סיסמה
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
            {/* החלק העליון שמכיל תמונה וכותרת הוצאתי לקומופוננטה נפרדת */}
            <LoginTopPart/>
            <div className='login-input-div'>
                {/* מעביר לקומפוננטה את הערכים שהוא צריך כדי להבדיל אותו אני מביא את הערכים מתוך מערך של אובייקטים ששמרתי בלוג אין דאטה */}
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

                {/* צריך להוסיף פונקציה של און קליק שתעביר אותי לעמוד סיסמא חדשה במידה ואנחנו רוצים דבר כזה */}
                <div className='forgot-password-div'>
                    <p className='forgot-password-p'>שכחת סיסמה?</p>
                </div>

                {/* loginInAccount מופיע רק אם הוא טועה בסיסמא ומייל יש פונקציה למעלה בשם */}
                <div id='wrong-password-or-email'>
                    <p className='wrong-password-or-email-p'>הסיסמה או האימייל שגויים, נסה שוב.</p>
                </div>
            </div>

            {/* אזור ההתבחברות עם פונקציה צריך להוסיף מעבר לעמוד הרשמה און קליק לספן */}
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