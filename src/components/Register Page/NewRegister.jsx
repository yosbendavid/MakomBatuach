import React, { useState, useEffect } from 'react';
import TextBox from "../Template parts/TextBox";
import SelectBox from "../Template parts/SelectBox";
import RegisterTitle from "./RegisterTitle";
import { selectBoxArray } from "./NewRegisterData/selectBoxArray";
import { textBoxesArray } from "./NewRegisterData/textBoxesArray";
import backArrow from "../../Photos/right-arrow.svg";
import ButtonCard from '../Template parts/ButtonCard';
import '../../CSS/register.css';
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';



const RegisterBoxs = () => {

    const [email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [user_type, setUserType] = useState('');

    const [Thermail, setTherEmail] = useState('')
    const { state } = useLocation();


    useEffect(() => {
        const Thermail = state;
        setTherEmail(Thermail)
        console.log(Thermail);
    }, []);


    const handleEmailChange = (value) => {
        setEmail(value);
        setUserType('מטופל');
        console.log(user_type)

    };

    const handlePhoneNumberChange = (value) => {
        setPhoneNumber(value);
        console.log(value);
    }
    const handleUserTypeChange = (value) => {
        setUserType(value);
        console.log(value);
    }


    const navigate = useNavigate();

    const Go2Login = () => {
        navigate("/Login");
    }
    //לוחץ על צור משתמש זה הפונקציה עם הולידציה בנוגע למידע לעדכן לולידציה רלוונטית
    const registerAccount = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://proj.ruppin.ac.il/cgroup100/prod/api/SignInUser/SignUp', {
                Email: email,
                PhoneNumber: phone_number,
                UserType: user_type,
                TherEmail:Thermail }
            );
            if (response.status === 200) {
                Swal.fire(
                    'Welcome',
                    `${email} You Have Signed In to Makom Batuach`,
                    'success'
                )
                Go2Login();
            }
            else if (response.status === 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Email is Already Register, Please Try Other Email'
                })
            }
        } catch (error) {
            console.error('Request failed with status code', error.response.status);
        }



    };

    
    const goBack = () => {
    navigate(-1);
    };

    return (
        <div className="register-boxs-div">
            <img className="back-from-register" src={backArrow} alt="Back arrow" onClick={goBack} />
            <form onSubmit={registerAccount}>
                <div className='register-input-div'>
                    <RegisterTitle />
                    <TextBox
                        id={textBoxesArray[3].id}
                        title={textBoxesArray[3].title}
                        placeHolder={textBoxesArray[3].placeHolder}
                        type={textBoxesArray[3].type}
                        autoComplete={textBoxesArray[3].autoComplete}
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <TextBox
                        id={textBoxesArray[6].id}
                        title={textBoxesArray[6].title}
                        placeHolder={textBoxesArray[6].placeHolder}
                        type={textBoxesArray[6].type}
                        autoComplete={textBoxesArray[6].autoComplete}
                        value={phone_number}
                        onChange={handlePhoneNumberChange}
                    />
                    {Thermail === "admin@gmail.com" && (
                        <SelectBox
                            id={selectBoxArray[1].id}
                            title={selectBoxArray[1].title}
                            placeHolder={selectBoxArray[1].placeHolder}
                            values={selectBoxArray[1].values}
                            value={user_type}
                            onChange={handleUserTypeChange}
                        />)}
                </div>
                <div className='register-btn-div'>
                    <ButtonCard type="submit" className="register-submit-btn">צור משתמש</ButtonCard>
                    {/* <div className='have-account-div'>
                        <p className="have-account-p">יש לך כבר משתמש? <span className="connect-page">התחבר</span></p>
                    </div> */}
                </div>
            </form>
        </div>
    );
}

export default RegisterBoxs;
