import React, { useState } from 'react';
import axios from 'axios';

const DisplayImage = () => {
  const [userId, setUserId] = useState('');

  const downloadImage = async () => {
    try {
      const response = await axios.post('https://localhost:44380/api/getpdffiles', {
        Id: userId
      });
      const fileData = response.data[0]; // Assuming you receive a single file in the response

      // Decode the Base64 content
      const decodedContent = atob(fileData.Content);

      // Convert the decoded content to a Uint8Array
      const bytes = new Uint8Array(decodedContent.length);
      for (let i = 0; i < decodedContent.length; i++) {
        bytes[i] = decodedContent.charCodeAt(i);
      }

      // Create a Blob object from the Uint8Array
      const blob = new Blob([bytes], { type: 'image/png' });

      // Create a URL for the Blob object
      const url = URL.createObjectURL(blob);

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.download = `image_${fileData.File_Num}.png`; // Specify the desired file name
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
      <button onClick={downloadImage}>Download Image</button>
    </div>
  );
};

export default DisplayImage;
