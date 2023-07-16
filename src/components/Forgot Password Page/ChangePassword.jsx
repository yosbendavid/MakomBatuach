import React, { useState, useEffect } from 'react';
import ButtonCard from '../Template parts/ButtonCard';
import ForgotMyPasswordTopPart from './ForgotMyPasswordTopPart';
import TextBox from '../Template parts/TextBox';
import '../../CSS/ForgotMyPassword.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';



const ChangePassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    const email = state;
    console.log(email);
    setEmail(email);
  }, []);


  // const handleEmailChange = (value) => {
  //   setEmail(value);
  // };


  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleSubmit = () => {

    try {
      new Promise((resolve, reject) => {
        userexist();
        resolve();
      }).then(() => {
        if (userexist) {
          console.log(email);
          change();
        } else {
          Swal.fire(
            'You dont have a user',
            'Please Contact Your Therapist '
          );
          setIsSubmitted(false);
        }
      }).catch((error) => {
        console.error('Request failed with status code', error.response.status);
      });
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }




  const Go2Login = () => {
    navigate("/Login");
  }

  const userexist = () => {
    const apiUrl = "http://proj.ruppin.ac.il/cgroup100/prod/api/SignInUser/userexist/?email=";
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
          if (res.status === 400) {

            Swal.fire(
              'You dont have a user',
              'Please Contact Your Therapist '
            )

          }
        })

    }
    catch (error) {
      console.error('Request failed with status code', error.response.status);
    }
  }

  const change = () => {
    const emailandpa = {
      Email: email,
      Password: password

    };
    const Url = "http://proj.ruppin.ac.il/cgroup100/prod/api/SignInUser/Changepa";
    try {
      fetch(Url, {
        method: "POST",
        body: JSON.stringify(emailandpa),
        headers: new Headers({
          "Content-type": "application/json; charset=UTF-8",
        }),
      })
        .then((res) => {
          console.log("res=", res);
          if (res.status === 200) 
          {
            Swal.fire(
              'You can log in',
              'success'
            );
            Go2Login();
          }
        })
        .then(
          (result) => {
            console.log("fetch POST= ", result);
          },
          (error) => {
            console.log("err post=", error);
          }
        );
  
    } catch (error) {
      console.error('Request failed with status code', error.response.status);
    }
  };


        return (
          <div className="forgotMyPassword-container">
            <div className="forgotMyPassword-div">
              <ForgotMyPasswordTopPart />
              <form onSubmit={handleSubmit}>
                <p className="FPQ-txt">החלף סיסמה</p>
                <p className="FPQ-txt-two"> הסיסמה החדשה  </p>
                <TextBox
                  id={2}
                  title="סיסמה"
                  placeHolder="הכנס סיסמה כאן"
                  type="password"
                  name='user_password'
                  value={password}
                  onChange={handlePasswordChange}
                />



                <button className="FMPSubmit" type="submit">
                  שלח
                </button>
              </form>
            </div>
          </div>
        );
      };

    export default ChangePassword;