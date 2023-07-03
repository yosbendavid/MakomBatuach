import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import React, { useEffect,useState } from 'react';
import '../Admin/Dashboardtyle.css';
import BottomBar from '../Template parts/BottomBar';
import { useNavigate, useLocation } from "react-router-dom";



function Dashboard() {

    const navigate = useNavigate();

    const Go2AdminHome=()=>{
        navigate("/admin",{state:"admin"})
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
                            accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMGZmMDM4ODAtNGQ3NS00ZDc2LTg4OWEtMjY3NjAzNzBmY2QzLyIsImlhdCI6MTY4ODM5MDE4NSwibmJmIjoxNjg4MzkwMTg1LCJleHAiOjE2ODgzOTQ0MDcsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUE4ZE0rK2JaK1R0bUpqaVNYRTJCd1J4VldaVW1YVS84aWZoaC9GZkN3ZDZzN1RGVjgycmxUNEpaWkwrS2QvcHlpIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoi15HXqCIsImdpdmVuX25hbWUiOiLXkdeoIiwiaXBhZGRyIjoiMTQ3LjIzNS4yMDMuNDciLCJuYW1lIjoi15HXqCDXkdeoIiwib2lkIjoiMTM1NDZkOWItODY4Mi00MDYxLWIxYmYtODQ2OTFhMjI4ZmMwIiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTE4NTY0ODEzNDItNDE2ODg0MDM5NS0zNzk4NzA5MTk2LTUyODI5IiwicHVpZCI6IjEwMDMyMDAwQkQwNzBGMDMiLCJyaCI6IjAuQVFzQWdEandEM1ZOZGsySW1pWjJBM0Q4MHdrQUFBQUFBQUFBd0FBQUFBQUFBQUNFQU0wLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6IkxscUhkTWE0VmZhUmJXVk1MZzZQT3d0Y3JmS0Vra3BfcGR5aWx3LV9ER0kiLCJ0aWQiOiIwZmYwMzg4MC00ZDc1LTRkNzYtODg5YS0yNjc2MDM3MGZjZDMiLCJ1bmlxdWVfbmFtZSI6InJvdGVtYmF0LmJhckBydXBwaW4zNjUubmV0IiwidXBuIjoicm90ZW1iYXQuYmFyQHJ1cHBpbjM2NS5uZXQiLCJ1dGkiOiJYbVhRTExpeGcwS05pUk1STm5vREFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXX0.E4pUXMIfat4ddOOPKkPbksf-QDDR0FZhOLBPADUp9YT0Gk14eLi4nFa2Uky93kjb_8jmuduh5n-PYfH8YSoqjzFEj93g9HxE3vhQG8tLYKtPSQiUsNJbQyU8tgnBqn4an0VlfW6bE4oV1B6Hf7A1dIe-Kv1QvbSBXOpWiybodTHcfoEKY7FFs27U5MeknBixxZIPTbZSZ9ev5beSJLJByqaW5V4j-HbXVBETT5GY1GiApi6BOVMo9gkENS8KtMKu6IJPoJ0z24y5osaWw9VooBLrFzoRexF6HBKHNsG8St4n3S2AR62QrTXR_SbCZJdH3pHtEMDhrQl2MaTBaND6XA',
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
