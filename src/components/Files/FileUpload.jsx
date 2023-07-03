import React from 'react';
import axios from 'axios';

const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const dataUrl = e.target.result;
            const base64File = dataUrl.split(',')[1];

            try {
                // Sending the base64 string to the backend using Axios
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
        };
        reader.readAsDataURL(file);
    }
};


export default function FileUpload(props) {
    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileChange}>Upload</button>
        </div>
    );
};
