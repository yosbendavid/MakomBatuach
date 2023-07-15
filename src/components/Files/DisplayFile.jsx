import React, { useState } from 'react';
import axios from 'axios';

const DisplayImage = () => {
  const [userId, setUserId] = useState('');

  const downloadPdf = async () => {
    try {
      const response = await axios.post('https://localhost:44380/api/getpdffiles', {
        Id: userId
      }, {
        // Make sure the response data is received as a Blob
        responseType: 'blob',
      });
  
      const fileData = response.data; // The data is already a Blob
  
      // Create a temporary URL for the Blob object
      const url = window.URL.createObjectURL(fileData);
  
      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = url;
      link.download = `file.jpeg`; // Specify the desired file name
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
  
      // Simulate a click on the link to trigger the file download
      link.click();
  
      // Clean up the URL and remove the temporary link
      URL.revokeObjectURL(url);
      link.remove();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  return (
    <div>
      <input type="text" value={userId} onChange={handleUserIdChange} placeholder="Enter User ID" />
      <button onClick={downloadPdf}>Download PDF</button>
    </div>
  );
};

export default DisplayImage;





