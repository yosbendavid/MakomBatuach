import React, { useState, useEffect } from 'react';
import TextBox from "../Template parts/TextBox";
import SelectBox from "../Template parts/SelectBox";
import RegisterTitle from "./RegisterTitle";
import {selectBoxArray} from "./NewRegisterData/selectBoxArray";
import {textBoxesArray} from "./NewRegisterData/textBoxesArray";
import backArrow from "../../Photos/backArrow.svg";
import ButtonCard from '../Template parts/ButtonCard';
import '../../CSS/register.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'
import Swal from 'sweetalert2';

const RegisterBoxs = (props) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [id, setId] = useState('');
    const [email, seteEMail] = useState('');
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [password, setPassword] = useState('');

    const { state } = useLocation();
    useEffect(() => {
      const { email, password } = state;
      seteEMail(email);
      setPassword(password);
      console.log(email);
    }, []);

    const handleFirstNameChange = (value) => {
        setFirstName(value);
    }
    const handleLastNameChange = (value) => {
        setLastName(value);
    }
    const handleIdChange = (value) => {
        setId(value);
    }

    const handleEmailChange = (value) => {
        seteEMail(props.email);
        console.log(email)
    }

    const handleGenderChange = (value) => {
        setGender(value);
    }

    const handleBirthDateChange = (value) => {
        setBirthDate(value);
    }

    const handlePasswordChange = (value) => {
        setPassword(value);
    }

    //לוחץ על צור משתמש זה הפונקציה עם הולידציה בנוגע למידע לעדכן לולידציה רלוונטית
    const registerAcount = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://localhost:44380/api/SignInUser/SignUpPatient', {
                FirstName: firstName,
                LastName: lastName,
                BirthDate: birthDate,
                Email: email,
                Gender: gender,
                Patient_Id: id,
                Password: password,
                StartDate: new Date()
            }
            );
            if (response.status === 200) {
                Swal.fire({
                        title: 'ברוך הבא',
                        text: `התחברת למקום בטוח ${firstName} ${lastName}`,
                        confirmButtonText: 'אישור',}
                  )
                  Go2Login();
                  
            }
            else if (response.status === 400){
                Swal.fire({
                    icon: 'תקלה',
                    title: 'אופס...',
                    text: 'האימייל כבר קיים במערכת, נסה שנית עם אימייל אחר'
                })
            }
        } catch (error) {
            console.error('Request failed with status code', error.response.status);
        }


    };

    const navigate = useNavigate(); 

    const Go2Login = () => {
      navigate("/Login");
    }

    const Go2Patient = () => {
        navigate("/Patient");
      }


    return(
        <div className="register-boxs-div">
            <img className="back-from-register" src={backArrow} alt="Back arrow"/>
            <form onSubmit={registerAcount}>
                <div className='register-input-div'>
                    <RegisterTitle />
                    <TextBox
                        id={textBoxesArray[0].id}
                        title={textBoxesArray[0].title}
                        placeHolder={textBoxesArray[0].placeHolder}
                        type={textBoxesArray[0].type}
                        autoComplete={textBoxesArray[0].autoComplete}
                        value={firstName}
                        onChange={handleFirstNameChange}
                    />
                    <TextBox
                        id={textBoxesArray[1].id}
                        title={textBoxesArray[1].title}
                        placeHolder={textBoxesArray[1].placeHolder}
                        type={textBoxesArray[1].type}
                        autoComplete={textBoxesArray[1].autoComplete}
                        value={lastName}
                        onChange={handleLastNameChange}
                    />
                    {/* <TextBox
                        id={textBoxesArray[2].id}
                        title={textBoxesArray[2].title}
                        placeHolder={textBoxesArray[2].placeHolder}
                        type={textBoxesArray[2].type}
                        autoComplete={textBoxesArray[2].autoComplete}
                        value={id}
                        onChange={handleIdChange}
                    /> */}
                     {/* <TextBox
                        id={textBoxesArray[3].id}
                        title={textBoxesArray[3].title}
                        placeHolder={textBoxesArray[3].placeHolder}
                        type={textBoxesArray[3].type}
                        autoComplete={textBoxesArray[3].autoComplete}
                        value={email}
                        onChange={handleEmailChange}
                    /> */}
                     <SelectBox
                        id={selectBoxArray[0].id}
                        title={selectBoxArray[0].title}
                        placeHolder={selectBoxArray[0].placeHolder}
                        values={selectBoxArray[0].values}
                        value={gender}
                        onChange={handleGenderChange}
                    />
                     <TextBox
                        id={textBoxesArray[4].id}
                        title={textBoxesArray[4].title}
                        placeHolder={textBoxesArray[4].placeHolder}
                        type={textBoxesArray[4].type}
                        autoComplete={textBoxesArray[4].autoComplete}
                        value={birthDate}
                        onChange={handleBirthDateChange}
                    />
                     <TextBox
                        id={textBoxesArray[5].id}
                        title={textBoxesArray[5].title}
                        placeHolder={textBoxesArray[5].placeHolder}
                        type={textBoxesArray[5].type}
                        autoComplete={textBoxesArray[5].autoComplete}
                        value={password}
                        onChange={handlePasswordChange}
                    />            
        
                </div>
                <div className='register-btn-div'>
                    <ButtonCard type="submit" className="register-submit-btn">צור משתמש</ButtonCard>
                    <div className='have-account-div'>
                        <p className="have-account-p">יש לך כבר משתמש? <span className="connect-page" onClick={Go2Login}>התחבר</span></p>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default RegisterBoxs;
