import React, { useState } from 'react';
import axios from 'axios';
import '../../CSS/FilesListRender.css';

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
    <div className="containerFilesListRender">
      <div className="inputWrapperFilesListRender">
        <button onClick={getAllFiles} className="buttonFilesListRender">
          השג קבצים
        </button>
        <input
          type="text"
          value={userId}
          onChange={handleUserIdChange}
          placeholder="הכנס מספר ת.ז"
          className="inputFieldFilesListRender"
        />
      </div>

      {fileData.length > 0 && (
        <div className="fileListFilesListRender">
          <h2 className="fileListTitleFilesListRender">רשימת קבצים:</h2>
          <ul className="fileListItemsFilesListRender">
            {fileData.map((file, index) => (
              <li key={index} className="fileListItemFilesListRender">
                <a
                  href={file.FilePath}
                  download={`${file.File_name}.pdf`}
                  onClick={(event) =>
                    handleFileClick(file.File_Num, file.File_name, file.FilePath)
                  }
                  className="fileListLinkFilesListRender"
                >
                  שם הקובץ: {file.File_name}
                </a>
                <p className="fileListTextFilesListRender">מספר קובץ: {file.File_Num}</p>
                <p className="fileListTextFilesListRender">תאריך שליחה: {file.DateSent}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilesListRender;
