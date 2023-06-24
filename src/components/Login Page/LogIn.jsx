import React, { useState } from 'react';
import TextBox from "../Template parts/TextBox";
import LoginTopPart from './LoginTopPart';
import {inputBoxArrayLogin} from "./Login-Data/inputBoxArrayLogin";
import ButtonCard from '../Template parts/ButtonCard'
import '../../CSS/login.css';
import { Navigate, useNavigate, useNavigation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

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
    const loginInAccount = async (event) => {
        event.preventDefault();
         try {
            const response = await axios.post('https://localhost:44380/api/SignInUser/login', {
                Email: email,
                Password:password
            });

            if(password=="deafult_pass_please_change")
            {
                Swal.fire(
                    'Welcome',
                    `You need to change your Password `                   
                  )
                  Go2Patienthome(email)

            }
            else
            {
            if (response.status === 200) 
            {
                    Swal.fire(
                    'Welcome',
                    `${email} You Have Signed In to Makom Batuach`,
                    'success'
                  )
                  Go2Patienthome(email)
            }
            if (response.status === 201) 
            {
                Swal.fire(
                    'Welcome',
                    `${email} Please complete these details`,
                    'success'
                  )
                  Go2RegisterPatient();
            }
            if (response.status === 202) 
            {
                Swal.fire(
                    'Welcome',
                    `${email} You Have Signed In to Makom Batuach`,
                    'success'
                  )
                  Go2Therahome(email);
                }
            }
        } catch (error) {
            console.error('Request failed with status code', error.response);
        }
       
    }

    const navigate=useNavigate();

    const Go2Patienthome = (email) => {
        navigate('/Phome',{state:email})
      };

    const Go2RegisterPatient = () => {
        navigate("/RegisterPatient");
      }

      const Go2Therahome = (email) => {
        navigate("/HomePageTherapit",{state:email});
      }

      const Go2Forgot = () => {
        navigate("/Forgot");
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
                        <p onClick={Go2Forgot}  className='forgot-password-p'>שכחת סיסמה?</p>
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
                    </div>
                </div>
            </form>
         
        </div>
    );
}
export default Login;