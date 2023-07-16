import React, { useState } from 'react';
import axios from 'axios';

const FilesListRender = () => {
  const [userId, setUserId] = useState('');
  const [fileData, setFileData] = useState([]);

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleFileClick = (event, fileNum, fileName, FilePath) => {
    event.preventDefault();
    downloadFile(fileNum, fileName, FilePath);
  };

  const downloadFile = async (fileNum, fileName, FilePath) => {
    try {

      const link = document.createElement('a');
      link.href = FilePath;
      link.download = `${fileName}.pdf`; 
      link.click();

      URL.revokeObjectURL(FilePath);
      link.remove();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getAllFiles = async () => {
    try {
      const response = await axios.post('https://localhost:44380/api/getpdffiles', {
        Id: userId
      });
      const data = response.data;
      console.log(data)
      setFileData(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <input type="text" value={userId} onChange={handleUserIdChange} placeholder="Enter User ID" />
      <button onClick={getAllFiles}>Get Files</button>
      
      {fileData.length > 0 && (
        <div>
          <h2>File List:</h2>
          <ul>
            {fileData.map((file, index) => (
              <li key={index}>
                <a href={file.FilePath} download={`${file.File_name}.pdf`} onClick={(event) => handleFileClick(file.File_Num, file.File_name, file.FilePath)}>
                  File Name: {file.File_name}
                </a>
                <p>File Number: {file.File_Num}</p>
                <p>Date Sent: {file.DateSent}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilesListRender;
