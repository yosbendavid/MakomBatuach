import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";





const handleFileChange = async (event) => {
    // const navigate = useNavigate();
    // const { state } = useLocation();
    // const [email, setEmail] = useState('')

    // useEffect(() => {
    //     const email = state;
    //     console.log(email)
    //     setEmail(email)
    // })

    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const dataUrl = e.target.result;
            const base64File = dataUrl.split(',')[1];

            try {
                // Sending the base64 string to the backend using Axios
                const response = await axios.post('https://localhost:44380/api/files', {
                    file_num: 55,
                    date_sent: new Date(),
                    file_type_num: 1,
                    content: base64File,
                    ///email: 
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
