import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { StyledIcon } from '../Meeting/Meeting.style';
import { ButtonAddFiles, ButtonDiv, ButtonSummery, FileUp, IconRecord, InformationContainer, InformationDesc, InformationTextArea, InformationTextAreaSummery, InformationTitle, InformationWrapper, MeetingTitle, NameFile, Navbar, RecordButton, SaveButton, TitleWrapper, divCenter } from './NewMetting.style';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Swal from 'sweetalert2';
import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

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


const apiUrl = 'https://proj.ruppin.ac.il/cgroup100/prod/api/PostSummary'; 

export default function NewMetting(props) {
  
  const [isListening, setIsListening] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();

  const toggleListen = () => {
    setIsListening(prevState => !prevState);
    if (!isListening) {
      SpeechRecognition.startListening({ language: 'he-IL' });
    } else {
      SpeechRecognition.stopListening();
    }
  };

  const clearTranscript = () => {
    resetTranscript();
  };
  
  const navigate = useNavigate();


  const goBack = () => {
    navigate(-1);
  };

  const go2HomePage = () => {
    
    navigate(`/HomePageTherapit`);
  }

  const go2Patients = () => {
    
    navigate(`/Patients`);
  }


  const location = useLocation();
  const { Date1, Time, numOfMeeting, Email} = location.state;
  console.log("location",location.state);

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');

  

  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setFileContent(event.target.result);
    };
    reader.readAsText(file);
  };
    
  

   const btnPost = () => { 

    const today = new Date();
    const formattedDate = today.getFullYear() + '-' + (today.getMonth() + 1).toString().padStart(2, '0') + '-' + today.getDate().toString().padStart(2, '0');
    console.log(formattedDate);

    

    const postBody = {
      WrittenBy:Email,
      Content: fileContent ? fileContent : transcript, 
      Summary_Date: formattedDate,
      ImportanttoNote: ImportanttoNote,
      Treatment_Id: numOfMeeting,
    };
    if (postBody.WrittenBy && postBody.Content && postBody.Summary_Date && postBody.ImportanttoNote) {
      // All required fields have a value, so send the POST request
      fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(postBody),
        headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8', //very important to add the 'charset=UTF-8'!!!!
        'Accept': 'application/json; charset=UTF-8'
        })
      })
      .then(res => {
        console.log('res=', res);
        return res.json()
      })
      .then(
        (result) => {
          console.log("fetch POST= ", result);
          console.log(result.Name);
          navigate(-1);
          Swal.fire({
            title: 'הסיכום נשמר בהצלחה',
            icon: 'success'}
          )},
          
        (error) => {
          console.log("err post=", error);
        }
      );
    } else {
      // Some required fields are missing a value, so show an alert message
      Swal.fire({
        title: 'חסרים פרטים',
        icon: 'error'}
      )
    }
      
  }

   const [ImportanttoNote, setImportanttoNote] = useState('');


   const [userInputFileName, setUserInputFileName] = useState('');
   const [file, setFile] = useState(null);

   const handleFileChange1 = (event) => {
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
            const response = await axios.post('https://proj.ruppin.ac.il/cgroup100/prod/api/files', {
                filePath: fileUrl,
                fileName: userInputFileName,
                file_type_num: 1,
                Filler_Id: Email,
                TreatmentId: numOfMeeting
                //userId: 121221212
            });

            // Check the response status code
            if (response.status === 200) {
                console.log('File uploaded successfully');
                Swal.fire({
                  title: 'הקובץ עלה בהצלחה',
                  icon: 'success'}
                )
            } else {
                console.error('Unexpected response:', response);
                alert('Unexpected response from the server');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
      Swal.fire({
        title: 'אנא בחר שם וקובץ',
        icon: 'error'}
      )
    }
};
  
  return (
    <div style={{padding: "40px 0"}}>
    <TitleWrapper>  
    <span></span> 
    <MeetingTitle> סיכום טיפול חדש </MeetingTitle>
    <StyledIcon onClick={goBack} />
    </TitleWrapper>
    <InformationWrapper>
    <InformationContainer> 
    <InformationTitle> תאריך </InformationTitle>
    <InformationDesc> {Date1} </InformationDesc>
    </InformationContainer>
    <InformationContainer> 
    <InformationTitle> שעה </InformationTitle>
    <InformationDesc> {Time} </InformationDesc>
    </InformationContainer>
    <InformationContainer> 
    <InformationTitle> מספר פגישה </InformationTitle>
    <InformationDesc> {numOfMeeting} </InformationDesc>
    </InformationContainer>
    <InformationContainer> 
    <InformationTitle> חשוב לציין </InformationTitle>
    <InformationTextArea onChange={(e) => setImportanttoNote(e.target.value)}>  </InformationTextArea>
    </InformationContainer>
    <InformationContainer> 
    <InformationTitle> סיכום </InformationTitle>
    <InformationTextAreaSummery value={fileContent ? fileContent : transcript} onChange={(e) => setFileContent(e.target.value)}></InformationTextAreaSummery>

    </InformationContainer>
    </InformationWrapper>
    <div style={{textAlign:"center"}}>
      <ButtonDiv>
      <DeleteForeverRoundedIcon onClick={clearTranscript}> </DeleteForeverRoundedIcon>
      <IconRecord style={{marginRight: "50px"}} onClick={toggleListen}>{isListening ? 'Stop' : 'Start'} </IconRecord>
      <ButtonSummery onClick={() => fileInputRef.current.click()}> הוסף סיכום </ButtonSummery>
      <input type="file" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChange} />
      </ButtonDiv>
      <ButtonDiv>
       <NameFile 
        type="text"
        placeholder="הקלד את שם הקובץ"
       value={userInputFileName}
        onChange={e => setUserInputFileName(e.target.value)}
      />
    </ButtonDiv>
    <ButtonDiv>
    <FileUp type="file" onChange={handleFileChange1} />
    </ButtonDiv>
    <ButtonAddFiles onClick={handleUpload}> + הוסף קובץ  </ButtonAddFiles>
    <ButtonDiv>
    <SaveButton onClick={btnPost}> שמור </SaveButton>
    
    </ButtonDiv>
    </div>

    {/* <Navbar>
      <BottomNavigation>
        <BottomNavigationAction icon={<HomeOutlinedIcon />} onClick={go2HomePage} />
        <BottomNavigationAction icon={<PermIdentityOutlinedIcon onClick={go2Patients} />} />
        <BottomNavigationAction icon={<ArticleOutlinedIcon />} />
      </BottomNavigation>
    </Navbar> */}

    </div>
  );
};
