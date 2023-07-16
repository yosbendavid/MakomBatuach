import React, { useState } from 'react';
import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
    type: process.env.REACT_APP_TYPE,
    projectId: process.env.REACT_APP_PROJECT_ID,
    privateKeyId: process.env.REACT_APP_PRIVATE_KEY_ID,
    privateKey: process.env.REACT_APP_PRIVATE_KEY,
    clientEmail: process.env.REACT_APP_CLIENT_EMAIL,
    clientId: process.env.REACT_APP_CLIENT_ID,
    authUri: process.env.REACT_APP_AUTH_URI,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    authToken: process.env.REACT_APP_AUTH_TOKEN,
    authProviderX509CertUrl: process.env.REACT_APP_AUTH_PROVIDER_X509_CERT_URL,
    clientX509CertUrl: process.env.REACT_APP_CLIENT_X509_CERT_URL,
    universeDomain: process.env.REACT_APP_UNIVERSE_DOMAIN
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default function FileUpload(props) {
    const [userInputFileName, setUserInputFileName] = useState('');
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (file && userInputFileName) {
            // Upload the file to Firebase
            const storageRef = ref(storage, `uploads/${userInputFileName}`);
            await uploadBytesResumable(storageRef, file);

            // Get the file URL
            const fileUrl = await getDownloadURL(storageRef);

            // Send the file URL and user details to your server
            try {
                const response = await axios.post('http://proj.ruppin.ac.il/cgroup100/prod/api/files', {
                    filePath: fileUrl,
                    fileName: userInputFileName,
                    file_type_num: 1,
                    //userId: 121221212
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
