import React, { useState } from 'react';
import TextBox from "../Template parts/TextBox";
import LoginTopPart from './LoginTopPart';
import { inputBoxArrayLogin } from "./Login-Data/inputBoxArrayLogin";
import ButtonCard from '../Template parts/ButtonCard'
import '../../CSS/login.css';
import { Navigate, useNavigate, useNavigation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [loginErrorTwo, setLoginErrorTwo] = useState(false);
    // הפונקציה שאני מעביר כדי לתפוס את הערך של אימייל
    const handleEmailChange = (value) => {
        setLoginErrorTwo(false);
        setEmail(value);
    };
    // הפונקציה שאני מעביר כדי לתפוס את הערך של סיסמה
    const handlePasswordChange = (value) => {
        setLoginErrorTwo(false);
        setPassword(value);
    }
    // צריך לעדכן לולידציה רלוונטית לוחץ על התחבר זה הפונקציה עם הולידציה להתחברות
    const loginInAccount = async (event) => {
        event.preventDefault();
        if(password !== "" && email !== ""){
            try {
                const response = await axios.post('https://proj.ruppin.ac.il/cgroup100/prod/api/SignInUser/login', {
                    Email: email,
                    Password: password
                });
    
                if (password === "deafult_pass_please_change") {
                    Swal.fire({         
                        title: 'ברוך הבא',
                        text: 'אתה צריך לעדכן את הסיסמא שלך',
                        confirmButtonText: 'אישור',});
                    Go2Change()
                }
                else {
                    if (response.status === 200) {
                        Swal.fire({         
                            title: 'ברוך הבא',
                            text: `התחברת למקום בטוח ${email}`,
                            confirmButtonText: 'אישור',});
                        setLoginError(false);
                        Go2Patienthome(email)
                    } else if (response.status === 201) {
                        Swal.fire({         
                            title: 'ברוך הבא',
                            text: `בבקשה השלם את הפרטים הללו ${email}`,
                            confirmButtonText: 'אישור',});
                        setLoginError(false);
                        Go2RegisterPatient();
                    } else if (response.status === 202) {
                        Swal.fire({         
                            title: 'ברוך הבא',
                            text: `התחברת למקום בטוח ${email}`,
                            confirmButtonText: 'אישור',});
                        setLoginError(false);
                        Go2Therahome(email);
                    }
                    if (response.status === 226) {
                        Swal.fire({
                            title: 'ברוך הבא',
                            text: `התחברת למקום בטוח ${email}`,
                            confirmButtonText: 'אישור',}
                        )
                        Go2AdminHome();
                    }
                    else if (response.status === 400) {
                        setLoginError(true); //יראה את ההודעה לגבי מייל לא נכון 
                    }
                }
            } catch (error) {
                console.error('Request failed with error:', error.response);
                setLoginError(true);
            }
        } else{
            setLoginErrorTwo(true);
        }
    }



const navigate = useNavigate();

const Go2Patienthome = () => {
    navigate('/Phome', { state: email })
};

const Go2RegisterPatient = () => {
    navigate("/RegisterPatient", { state: { email, password } });
}

const Go2Therahome = () => {
    navigate("/HomePageTherapit", { state: email });
}

const Go2Forgot = () => {
    navigate("/Forgot", { state: email });
}

const Go2Change = () => {
    console.log(email)
    navigate("/Change", { state: email });
}
const Go2AdminHome = () => {
    navigate("/Admin" ,{ state: email });
}


return (
    <div className="login-container-div">
        {/* החלק העליון שמכיל תמונה וכותרת הוצאתי לקומופוננטה נפרדת */}
        <LoginTopPart />
        <form onSubmit={loginInAccount}>
            <div className='login-input-div'>
                {/* מעביר לקומפוננטה את הערכים שהוא צריך כדי להבדיל אותו אני מביא את הערכים מתוך מערך של אובייקטים ששמרתי בלוג אין דאטה */}
                <TextBox
                    id={inputBoxArrayLogin[0].id}
                    title={inputBoxArrayLogin[0].title}
                    placeHolder={inputBoxArrayLogin[0].placeHolder}
                    type={inputBoxArrayLogin[0].type}
                    autoComplete={inputBoxArrayLogin[0].autoComplete}
                    value={email}
                    onChange={handleEmailChange}
                />
                <TextBox
                    id={inputBoxArrayLogin[1].id}
                    title={inputBoxArrayLogin[1].title}
                    placeHolder={inputBoxArrayLogin[1].placeHolder}
                    type={inputBoxArrayLogin[1].type}
                    autoComplete={inputBoxArrayLogin[1].autoComplete}
                    value={password}
                    onChange={handlePasswordChange}
                />

                {/* צריך להוסיף פונקציה של און קליק שתעביר אותי לעמוד סיסמא חדשה במידה ואנחנו רוצים דבר כזה */}
                <div className='forgot-password-div'>
                    <p onClick={Go2Forgot} className='forgot-password-p'>שכחת סיסמה?</p>
                </div>

                {/* loginInAccount מופיע רק אם הוא טועה בסיסמא ומייל יש פונקציה למעלה בשם */}
                {loginError && (
                    <div id='wrong-password-or-email'>
                        <p className='wrong-password-or-email-p'>הסיסמה או האימייל שגויים, נסה שוב.</p>
                    </div>
                )}
                {loginErrorTwo && (
                    <div className='wrong-password-or-email'>
                        <p className='wrong-password-or-email-p'>אנא הכנס מייל וסיסמא כדי להתחבר.</p>
                    </div>
                )}
            </div>



            {/* אזור ההתבחברות עם פונקציה צריך להוסיף מעבר לעמוד הרשמה און קליק לספן */}
            <div className='login-btn-div'>
                <ButtonCard type="submit" className="register-submit-btn">התחבר</ButtonCard>
                <div className='new-account-div'>
                </div>
            </div>
        </form>
    </div>
);
}
export default Login;