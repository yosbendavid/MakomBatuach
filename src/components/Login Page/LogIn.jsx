import React, { useState } from 'react';
import TextBox from "../Template parts/TextBox";
import LoginTopPart from './LoginTopPart';
import {inputBoxArrayLogin} from "./Login-Data/inputBoxArrayLogin";
import ButtonCard from '../Template parts/ButtonCard'
import '../../CSS/login.css';
import { useNavigate } from 'react-router-dom';

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
    const loginInAccount = (event) => {
        event.preventDefault();
        const loginData = {
            enteredEmail: email,
            enteredPassword:password
        };
        console.log(loginData)
        Go2Patienthome();
        seteEmail('');
        setPassword('');
    }

    const navigate = useNavigate(); 

    const Go2Patienthome = () => {
      navigate("/Phome");
    }

    const Go2Register = () => {
        navigate("/Register");
      }


    return(
        <div className="login-container-div">
            {/* החלק העליון שמכיל תמונה וכותרת הוצאתי לקומופוננטה נפרדת */}
            <LoginTopPart/>
            <form onSubmit={loginInAccount}>
                <div className='login-input-div'>
                    {/* מעביר לקומפוננטה את הערכים שהוא צריך כדי להבדיל אותו אני מביא את הערכים מתוך מערך של אובייקטים ששמרתי בלוג אין דאטה */}
                    <TextBox
                        id={inputBoxArrayLogin[0].id}
                        title={inputBoxArrayLogin[0].title}
                        placeHolder={inputBoxArrayLogin[0].placeHolder}
                        type={inputBoxArrayLogin[0].type}
                        autoComplete= {inputBoxArrayLogin[0].autoComplete}
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <TextBox
                        id={inputBoxArrayLogin[1].id}
                        title={inputBoxArrayLogin[1].title}
                        placeHolder={inputBoxArrayLogin[1].placeHolder}
                        type={inputBoxArrayLogin[1].type}
                        autoComplete= {inputBoxArrayLogin[1].autoComplete}
                        value={password}
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
                    <ButtonCard type="submit" className="register-submit-btn">התחבר</ButtonCard>
                    <div className='new-account-div'>
                        <p onClick={Go2Register} className="register-account-p">אין לך משתמש? <span className="register-page">הירשם</span></p>
                    </div>
                </div>
            </form>
         
        </div>
    );
}
export default Login;