import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import React, { useEffect, useState } from 'react';
import '../Admin/Dashboardtyle.css';
import BottomBar from '../Template parts/BottomBar';
import { useNavigate } from "react-router-dom";

function Dashboardd() {
    const navigate = useNavigate();
    const [tokenId, setTokenId] = useState("");
    const [accessToken, setaccessTokenn] = useState('load');


    const getNewUserAccessToken = async () => {
        const endpoint = 'https://api.powerbi.com/v1.0/myorg/groups/7c90b420-6a68-429c-8eb8-6f35592e42a0/reports/7ddf046d-220c-4431-b410-f636b375cce9/GenerateToken';
        const requestBody = {
            accessLevel: "View",
        };
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMGZmMDM4ODAtNGQ3NS00ZDc2LTg4OWEtMjY3NjAzNzBmY2QzLyIsImlhdCI6MTY4OTUyNjg1NCwibmJmIjoxNjg5NTI2ODU0LCJleHAiOjE2ODk1MzE0OTUsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUE3OXVkaDBIYjYyOXRBRUR3bU0velZadmFLUDR3Vnk4SnovSzJ2VEdCR0VVbWVTTE5hKzlRMkUwUm1LZ0xFK1BVIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6IjE4ZmJjYTE2LTIyMjQtNDVmNi04NWIwLWY3YmYyYjM5YjNmMyIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoi15HXqCIsImdpdmVuX25hbWUiOiLXkdeoIiwiaXBhZGRyIjoiMmEwNjpjNzAxOjQzMjM6YzMwMDozOWUyOmFhNWM6ZGVhMDpkY2FmIiwibmFtZSI6IteR16gg15HXqCIsIm9pZCI6IjEzNTQ2ZDliLTg2ODItNDA2MS1iMWJmLTg0NjkxYTIyOGZjMCIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0xODU2NDgxMzQyLTQxNjg4NDAzOTUtMzc5ODcwOTE5Ni01MjgyOSIsInB1aWQiOiIxMDAzMjAwMEJEMDcwRjAzIiwicmgiOiIwLkFRc0FnRGp3RDNWTmRrMkltaVoyQTNEODB3a0FBQUFBQUFBQXdBQUFBQUFBQUFDRUFNMC4iLCJzY3AiOiJBcHAuUmVhZC5BbGwgQ2FwYWNpdHkuUmVhZC5BbGwgQ2FwYWNpdHkuUmVhZFdyaXRlLkFsbCBDb250ZW50LkNyZWF0ZSBEYXNoYm9hcmQuUmVhZC5BbGwgRGFzaGJvYXJkLlJlYWRXcml0ZS5BbGwgRGF0YWZsb3cuUmVhZC5BbGwgRGF0YWZsb3cuUmVhZFdyaXRlLkFsbCBEYXRhc2V0LlJlYWQuQWxsIERhdGFzZXQuUmVhZFdyaXRlLkFsbCBHYXRld2F5LlJlYWQuQWxsIEdhdGV3YXkuUmVhZFdyaXRlLkFsbCBQaXBlbGluZS5EZXBsb3kgUGlwZWxpbmUuUmVhZC5BbGwgUGlwZWxpbmUuUmVhZFdyaXRlLkFsbCBSZXBvcnQuUmVhZC5BbGwgUmVwb3J0LlJlYWRXcml0ZS5BbGwgU3RvcmFnZUFjY291bnQuUmVhZC5BbGwgU3RvcmFnZUFjY291bnQuUmVhZFdyaXRlLkFsbCBUZW5hbnQuUmVhZC5BbGwgVGVuYW50LlJlYWRXcml0ZS5BbGwgVXNlclN0YXRlLlJlYWRXcml0ZS5BbGwgV29ya3NwYWNlLlJlYWQuQWxsIFdvcmtzcGFjZS5SZWFkV3JpdGUuQWxsIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiTGxxSGRNYTRWZmFSYldWTUxnNlBPd3RjcmZLRWtrcF9wZHlpbHctX0RHSSIsInRpZCI6IjBmZjAzODgwLTRkNzUtNGQ3Ni04ODlhLTI2NzYwMzcwZmNkMyIsInVuaXF1ZV9uYW1lIjoicm90ZW1iYXQuYmFyQHJ1cHBpbjM2NS5uZXQiLCJ1cG4iOiJyb3RlbWJhdC5iYXJAcnVwcGluMzY1Lm5ldCIsInV0aSI6IlR3bkhIdGRSUlVpaU9IY2Y2TDBKQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdfQ.M2J6X7cXnpyVrkxAxqtkWg2taO9A03KMKnxGzZ36CtUQvstaUpmdwxf3by_iH4tyh18wjq5u36gF1l4fT-86emC45LH38Jcd-koH0xIcdbjmeEMrW7RQC1xEdhBBlQGSnvFv0Ddy8Di6ZD3z088b6gxpdICvCOe3mzc7aLomSlZ0D5KsY4jJl-bygUmLNHtenCI6aOP332eNxDcKwveidpLRlgNj978EIap7rdTlrTuuESj-sI6kiPVgqK-57VbRTEKECrYAVDdGouJxHc8CdEVaSXnTQ-8lQWuB7nX8rZJzhfhmkHDozKjRU41t3crOzupU5_THt4r5yp4K_svLOQ'
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                const data = await response.json();
                console.log("data", data);
                // return {
                //     accessToken: data.token,
                //     tokenId: data.tokenId
                // };
                // window.report.bootstrapConfig.accessToken=data.token
                // window.report.bootstrapConfig.tokenId=data.tokenId
                setaccessTokenn(data.token)
                window.report.setAccessToken(data.tokenId);
                console.log("hey", window.report)
            } else {
                throw new Error('Failed to generate access token');
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const Go2AdminHome = () => {
        navigate("/admin", { state: "admin@gmail.com" });
    };

    async function fetchToken() {
        try {
            const newAccessToken = await getNewUserAccessToken();
            // console.log(newAccessToken)
            // setTokenId(newAccessToken.tokenId);
            // setaccesscToken(newAccessToken.accessToken)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchToken();

    }, []);

    return (
        <div className="Embed-container">
            <div className='items-div'>
                <p>ניתוחים כללים</p>
                {accessToken != "load" && <PowerBIEmbed
                    embedConfig={{
                        type: 'report',
                        id: "7ddf046d-220c-4431-b410-f636b375cce9",
                        embedUrl: "https://app.powerbi.com/reportEmbed?reportId=7ddf046d-220c-4431-b410-f636b375cce9&groupId=7c90b420-6a68-429c-8eb8-6f35592e42a0&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtRVVST1BFLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6dHJ1ZSwidXNhZ2VNZXRyaWNzVk5leHQiOnRydWV9fQ%3d%3d",
                        accessToken: accessToken,
                        //tokenId: "",
                        permissions: models.Permissions.All,
                        tokenType: models.TokenType.Aad,
                        viewMode: models.ViewMode.View,
                        settings: {
                            panes: {
                                filters: {
                                    expanded: false,
                                    visible: false
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
                />}
            </div>
            <BottomBar
                onHomeClick={Go2AdminHome}
            />
        </div>
    );
}

export default Dashboardd;
