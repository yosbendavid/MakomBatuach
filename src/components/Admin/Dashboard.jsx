import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import React, { useEffect, useState } from 'react';
import '../Admin/Dashboardtyle.css';
import BottomBar from '../Template parts/BottomBar';
import { useNavigate, useLocation } from "react-router-dom";


function Dashboard() {

    const MINUTES_BEFORE_EXPIRATION = 10 //מחליף טוקן 10 דקות לפני שפג תוקף
    const INTERVAL_TIME = 3000; ///בודק טוקן כל שלושים שניות


    const navigate = useNavigate();
    const [tokenExpiration, setTokenExpiration] = useState(null);

    useEffect(() => {
        // Set an interval to check the access token expiration, and update if needed
        const interval = setInterval(() => checkTokenAndUpdate(), INTERVAL_TIME);

        // Clear the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const checkTokenAndUpdate = async () => {
        if (!tokenExpiration) return;

            // Get the current time    
        const currentTime = Date.now();
        const expiration = Date.parse(tokenExpiration);

            // Time until token expiration in milliseconds
        const timeUntilExpiration = expiration - currentTime;
        const timeToUpdate = MINUTES_BEFORE_EXPIRATION * 60 * 1000;
    
        if (timeUntilExpiration <= timeToUpdate) {
          console.log("Updating report access token");
          await updateToken();
        }
      };

      const updateToken = async () => {
        // Generate a new embed token or refresh the user Azure AD access token
        const newAccessToken = await getNewUserAccessToken();
    
        // Update the new token expiration time
        setTokenExpiration(newAccessToken.expiration);
    
        // Set the new access token
        await window.report.setAccessToken(newAccessToken.token);
    };
    
    const getNewUserAccessToken = async () => {
        const endpoint = 'https://api.powerbi.com/v1.0/myorg/GenerateToken'; // Power BI API endpoint
        const requestBody = {
          datasets: [{ id: 'dc12d781-cb80-4ac2-9f9b-9d8310181bdd' }],
          reports: [{ id: '7ddf046d-220c-4431-b410-f636b375cce9' }]
        };
      
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
          });
      
          if (response.ok) {
            const data = await response.json();
            return {
              token: data.token,
              expiration: data.expiration
            };
          } else {
            throw new Error('Failed to generate access token');
          }
        } catch (error) {
          console.error(error);
          throw error;
        }
      };
      
      

    const Go2AdminHome = () => {
        navigate("/admin", { state: "admin@gmail.com" })
    }


    return (
        <div className="Embed-container">
            <div className='items-div'>
                <p>ניתוחים כללים</p>
                {/* copy token from inspect */}
                {/* id from the url */}
                <PowerBIEmbed
                    embedConfig={{
                        type: 'report',   // Supported types: report, dashboard, tile, visual, qna, paginated report and create
                        id: "7ddf046d-220c-4431-b410-f636b375cce9",
                        embedUrl: "https://app.powerbi.com/reportEmbed?reportId=7ddf046d-220c-4431-b410-f636b375cce9&groupId=7c90b420-6a68-429c-8eb8-6f35592e42a0&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtRVVST1BFLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6dHJ1ZSwidXNhZ2VNZXRyaWNzVk5leHQiOnRydWV9fQ%3d%3d",
                        accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMGZmMDM4ODAtNGQ3NS00ZDc2LTg4OWEtMjY3NjAzNzBmY2QzLyIsImlhdCI6MTY4ODQ2NDk2NSwibmJmIjoxNjg4NDY0OTY1LCJleHAiOjE2ODg0NzAzNzQsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUE4RlNHWnpuQlcwUjhKem9kODY4RHJISCtVME15ZVlhSk1wMFZNNzFvL2VjMExiNkZRRDgvaXBRc0dIVzR3T2xTIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMiIsImZhbWlseV9uYW1lIjoi15HXqCIsImdpdmVuX25hbWUiOiLXkdeoIiwiaXBhZGRyIjoiODkuMTM5LjIzMy44MiIsIm5hbWUiOiLXkdeoINeR16giLCJvaWQiOiIxMzU0NmQ5Yi04NjgyLTQwNjEtYjFiZi04NDY5MWEyMjhmYzAiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtMTg1NjQ4MTM0Mi00MTY4ODQwMzk1LTM3OTg3MDkxOTYtNTI4MjkiLCJwdWlkIjoiMTAwMzIwMDBCRDA3MEYwMyIsInJoIjoiMC5BUXNBZ0Rqd0QzVk5kazJJbWlaMkEzRDgwd2tBQUFBQUFBQUF3QUFBQUFBQUFBQ0VBTTAuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiTGxxSGRNYTRWZmFSYldWTUxnNlBPd3RjcmZLRWtrcF9wZHlpbHctX0RHSSIsInRpZCI6IjBmZjAzODgwLTRkNzUtNGQ3Ni04ODlhLTI2NzYwMzcwZmNkMyIsInVuaXF1ZV9uYW1lIjoicm90ZW1iYXQuYmFyQHJ1cHBpbjM2NS5uZXQiLCJ1cG4iOiJyb3RlbWJhdC5iYXJAcnVwcGluMzY1Lm5ldCIsInV0aSI6InVjM3c0OVRBbjBlVzZQbEY5bzBTQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdfQ.MI1qCm2U9p93N-MKI6QGdN_5Av2x3mbLdekkFWKmh05coboRKSsYziD38HtBGal9FY4VSGmZQLvOTYF7SLbpLaT3PUvy54SXt6MWf1iWCiRMnSzUfze3TCQIljKpAAY_7tvDVO2-qMpRf7M1wUZuN284azPoYTZ3CmZoHYWgCUyxe5a3OCl2HucVByGxz1G47WDINEo35uIAaogYvUEnz11hjK1eHJ0k5vHJM-yKj2GQ8jbNm5IjH4UxuDSW_oD5BvpGZbbhLEShZ2RU2k5X4_SX5SMkL21Ekw-Dj_ap1RafkhdegKY0jVEtBHmGmpc8qR4jHUXmVvpJxj5beYv6_A',
                        tokenType: models.TokenType.Aad, // Use models.TokenType.Aad for SaaS embed
                        settings: {
                            panes: {
                                filters: {
                                    expanded: false,
                                    visible: true
                                }
                            },
                            background: models.BackgroundType.Transparent,
                        }
                    }}

                    eventHandlers={
                        new Map([
                            ['loaded', function () { console.log('Report loaded'); }],
                            ['rendered', function () { console.log('Report rendered'); }],
                            ['error', function (event) { console.log(event.detail); }],
                            ['visualClicked', () => console.log('visual clicked')],
                            ['pageChanged', (event) => console.log(event)],
                        ])
                    }

                    cssClassName={"Embed-container"}

                    getEmbeddedComponent={(embeddedReport) => {
                        window.report = embeddedReport;
                    }}
                />
            </div>
            <BottomBar
                onHomeClick={Go2AdminHome}

            />
        </div>

    );

}


export default Dashboard;
