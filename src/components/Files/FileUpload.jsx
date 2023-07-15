import React, { useState } from 'react';
import axios from 'axios';

const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const dataUrl = e.target.result;
            const base64File = dataUrl.split(',')[1];

            // Send the file URL and user details to your server
            try {
                const response = await axios.post('https://localhost:44380/api/files', {
                    file_num: 11111,
                    date_sent: new Date(),
                    file_type_num: 1,
                    content: base64File
                });

                // Check the response status code
                if (response.status === 200) {
                    console.log('File uploaded successfully');
                    alert('File uploaded successfully');
                } else {
                    console.error('Unexpected response:', response);
                    alert('Unexpected response from the server');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            alert('Please choose a file and enter a file name');
        }
    };

    return (
        <div>
            <input type="text" placeholder="Enter file name" value={userInputFileName} onChange={e => setUserInputFileName(e.target.value)} />
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload File</button>
        </div>
    );
};
