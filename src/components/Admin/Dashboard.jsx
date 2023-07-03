import React from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';


function Dashboard() {
    return (
        <div>
            <PowerBIEmbed
                embedConfig={{
                    type: 'report',   // Supported types: report, dashboard, tile, visual, qna, paginated report and create
                    id: 'c2cd4edd-198c-4a69-bda4-7b14031b341c',
                    embedUrl: "https://app.powerbi.com/reportEmbed?reportId=c2cd4edd-198c-4a69-bda4-7b14031b341c&groupId=7c90b420-6a68-429c-8eb8-6f35592e42a0&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtRVVST1BFLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6dHJ1ZSwidXNhZ2VNZXRyaWNzVk5leHQiOnRydWV9fQ%3d%3d",
                    accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMGZmMDM4ODAtNGQ3NS00ZDc2LTg4OWEtMjY3NjAzNzBmY2QzLyIsImlhdCI6MTY4ODI5NjAyNCwibmJmIjoxNjg4Mjk2MDI0LCJleHAiOjE2ODgzMDA1MjMsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUFmVmlBWjhLdWpaS2I2R3FkLzBLeU1pSjhrNWNzWEovdnpEVlZ3MTViWVA2ek5RalRiVDRDUkdXUkNTQVZhU3NzIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoi15HXqCIsImdpdmVuX25hbWUiOiLXkdeoIiwiaXBhZGRyIjoiODkuMTM5LjIzMy44MiIsIm5hbWUiOiLXkdeoINeR16giLCJvaWQiOiIxMzU0NmQ5Yi04NjgyLTQwNjEtYjFiZi04NDY5MWEyMjhmYzAiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtMTg1NjQ4MTM0Mi00MTY4ODQwMzk1LTM3OTg3MDkxOTYtNTI4MjkiLCJwdWlkIjoiMTAwMzIwMDBCRDA3MEYwMyIsInJoIjoiMC5BUXNBZ0Rqd0QzVk5kazJJbWlaMkEzRDgwd2tBQUFBQUFBQUF3QUFBQUFBQUFBQ0VBTTAuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiTGxxSGRNYTRWZmFSYldWTUxnNlBPd3RjcmZLRWtrcF9wZHlpbHctX0RHSSIsInRpZCI6IjBmZjAzODgwLTRkNzUtNGQ3Ni04ODlhLTI2NzYwMzcwZmNkMyIsInVuaXF1ZV9uYW1lIjoicm90ZW1iYXQuYmFyQHJ1cHBpbjM2NS5uZXQiLCJ1cG4iOiJyb3RlbWJhdC5iYXJAcnVwcGluMzY1Lm5ldCIsInV0aSI6Ik9WZjRsQXVqVUVHTVBrZ0FMM3hGQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdfQ.k5ir2SHiVEODOR8ATuTMsbtPYdvcZ-46x5z-xGQM2ua2nOv01svwxeEsrxHNXaBW_U02svQxTntTfmnqKJxyC1bBhc4ua1f7aG9lKXkRBjPesLqu-BRPBY3dv2-j_NxOKfzhnKNQtIWoXDo5IeoosdOH9XSZgelssEoCCeMcQDd0gKSj3qZnLsCo_wPEElZneSfDZOwfys_6rPijyZo5Nga-thYzeIeC7Wq9AVzApTyA9wgSjTYqHlucLwzpzPftmeSJWzjP6pfSXVDt8_LU1z7VaGkIXdU3GyRCVjHETsBAi8CToksdslnUvgPQmOVQ_jGmZ_zgMC-24DO7ZSDybw',
                    tokenType: models.TokenType.Aad, // Use models.TokenType.Aad for SaaS embed
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

                cssClassName={"reportClass"}

                getEmbeddedComponent={(embeddedReport) => {
                    window.report = embeddedReport;
                }}
            />           
            </div>

    );
}

export default Dashboard;

