import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../CSS/FilesListRender.css';
import { useLocation, useNavigate } from 'react-router-dom';
import backArrow from "../../Photos/right-arrow.svg";

const FilesListRender = () => {
  const [fileData, setFileData] = useState([]);
  const { state } = useLocation();
  const therapistId = state?.therapistId || '';
  const navigate = useNavigate();


  const handleFileClick = (event, File_Num, File_name, FilePath) => {
    event.preventDefault();
    downloadFile(File_Num, File_name, FilePath);
  };

  const goBack = () => {
    
    navigate(`/HomePageTherapit`);
  }

  const downloadFile = async (File_Num, File_name, FilePath) => {
    try {
      const response = await axios.get(FilePath, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${File_name}.pdf`;
      link.target = '_blank'; // Open in a new tab
      link.rel = 'noopener noreferrer';
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const getAllFiles = async () => {
      try {
        const response = await axios.get(`https://localhost:44380/api/gettherapistpatientsfiles2/${therapistId}`);
        const data = response.data;
        setFileData(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getAllFiles();
  }, [therapistId]);

  return (
    <div className="containerFilesListRender">
  {fileData.length > 0 && (
    <div className="fileListFilesListRender">
      <h2 className="fileListTitleFilesListRender">רשימת קבצים</h2>
      <ul className="fileListItemsFilesListRender">
        {fileData.map((file, index) => (
          <li key={index} className="fileListItemFilesListRender">
            <button
              onClick={(event) =>
                handleFileClick(event, file.File_Num, file.File_name, file.FilePath)
              }
              className="fileListLinkFilesListRender"
            >
              שם הקובץ: {file.File_name}
            </button>
            <p className="fileListTextFilesListRender">מספר קובץ: {file.File_Num}</p>
            <p className="fileListTextFilesListRender">תאריך שליחה: {file.DateSent}</p>
            <p className="fileListTextFilesListRender">
              שם הלקוח: {file.FirstName} {file.LastName}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )}
</div>

  );
};

export default FilesListRender;