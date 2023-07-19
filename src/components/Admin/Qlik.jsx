import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
    Container, LeftIcon, LogoContainer, LogoText, Navbar, PatientDiv, PatientName, SearchDiv, SearchText, StyledFilterIcon,
    StyledIcon, TherapistDiv, TherapistName,
} from "../Therapist/Patients/Patients.Style";
import "../../CSS/PHomePage.css";
import BottomBar from '../Template parts/BottomBar';
import "../../CSS/Iframe.css"


export default function Qlik() {

    const { state } = useLocation();
    const [email, setEmail] = useState('')
  
    useEffect(() => {
      const email = state;
      // console.log(email)
      setEmail(email)
    })

    useEffect(() => {
        const webIntegrationId = "wKd-HmE6KomrziGi1fTrBbdAhOQcODjy";

        function login() {
            function isLoggedIn() {
                return fetch("https://6tos7pzl6xqjljz.sg.qlikcloud.com/api/v1/users/me", {
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'qlik-web-integration-id': webIntegrationId,
                    },
                }).then(response => {
                    return response.status === 200;
                });
            }

            return isLoggedIn().then(loggedIn => {
                if (!loggedIn) {
                    window.location.href = "https://6tos7pzl6xqjljz.sg.qlikcloud.com/login?qlik-web-integration-id=" + webIntegrationId + "&returnto=" + window.location.href;
                    throw new Error('not logged in');
                }
            });
        }

        login();
    }, []);

    const navigate = useNavigate();


    const Go2Dashboard = () => {
        navigate('/Qlik')
    };

    
    const Go2Home = () => {
        navigate('/Admin' , { state: "admin@gmail.com" })
    };



    return (

        <div>
      <Container>
        <div className="my-iframe-container">
        <div className="graph-container">
          <iframe src="https://6tos7pzl6xqjljz.sg.qlikcloud.com/single/?appid=42f90f3d-d8e4-4759-8256-a75291ba5d2e&obj=Xdbzbz&theme=breeze&opt=ctxmenu" 
          title="Dashboard" style={{ border: "none", width: "100%", height: "40%" }}>
          </iframe>
          </div>
          <div className="graph-container">
          <iframe src="https://6tos7pzl6xqjljz.sg.qlikcloud.com/single/?appid=42f90f3d-d8e4-4759-8256-a75291ba5d2e&obj=BRrMWP&theme=breeze&opt=ctxmenu" 
          title="filter" style={{ border: "none", width: "100%", height: "50%" }}>
          </iframe>
          </div>
          <div className="graph-container">
          <iframe src="https://6tos7pzl6xqjljz.sg.qlikcloud.com/single/?appid=42f90f3d-d8e4-4759-8256-a75291ba5d2e&obj=pVjmSu&theme=breeze&opt=ctxmenu" 
          title="patients" style={{ border: "none", width: "50%", height: "50%" }}>
          </iframe>
          <iframe src="https://6tos7pzl6xqjljz.sg.qlikcloud.com/single/?appid=42f90f3d-d8e4-4759-8256-a75291ba5d2e&obj=npSVpJ&theme=breeze&opt=ctxmenu" 
          title="thrapist" style={{ border: "none", width: "50%", height: "50%" }}>
          </iframe>
          </div>
          <div className="graph-container">
          <iframe src="https://6tos7pzl6xqjljz.sg.qlikcloud.com/single/?appid=42f90f3d-d8e4-4759-8256-a75291ba5d2e&obj=UdQqmCv&theme=horizon&opt=ctxmenu" 
          title="barChart" style={{ border: "none", width: "100%", height: "400px" }}>
          </iframe>
          </div>  
          <div className="graph-container">
          <iframe src="https://6tos7pzl6xqjljz.sg.qlikcloud.com/single/?appid=42f90f3d-d8e4-4759-8256-a75291ba5d2e&obj=gWmspX&theme=breeze&opt=ctxmenu" 
          title="pie" style={{ border: "none", width: "100%", height: "400px" }}>
          </iframe>
          </div>  
          <div className="graph-container">
          <iframe src="https://6tos7pzl6xqjljz.sg.qlikcloud.com/single/?appid=42f90f3d-d8e4-4759-8256-a75291ba5d2e&obj=amcWCb&theme=horizon&opt=ctxmenu"
          title="Scatter" style={{ border: "none", width: "100%", height: "400px" }}>
          </iframe>
          </div>  
        </div>
      </Container>

      <BottomBar onHomeClick={Go2Home} />
    </div>
    );
}
