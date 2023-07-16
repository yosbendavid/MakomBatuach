import styled from "styled-components";
import { ReactComponent as Icon } from '../Img/right-arrow.svg';
import { ReactComponent as RecordIcon } from '../Img/record-icon.svg';

export const TitleWrapper = styled.div`
background-color: #F5F5DC;
display: flex;
align-items: center;
justify-content: space-between;
`;

export const MeetingTitle = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: black;
`;

export const StyledIcon = styled(Icon)`
  width: 20px;
  height: 20px;
`;

export const InformationWrapper = styled.div`

`;

export const InformationContainer = styled.div`
text-align: right;
border-bottom: 1px solid #ffe7e7;
margin: 0px 15px 2px;
`;

export const InformationTitle = styled.p`
    margin-bottom: 3px;
`;

export const InformationDesc = styled.p`
    margin: 0px;
`;

export const InformationTextArea = styled.textarea`
  margin: 0;
  width: 90%;
  height: 100%;
  direction: rtl;
`;

export const InformationTextAreaSummery = styled.textarea`
  margin: 0;
  width: 90%;
  height: 90px;
  direction: rtl;
`;

export const ButtonDiv = styled.div`

`;

export const ButtonSummery = styled.button`
  width: 150px;
  height: 40px;
  border-radius: 20px; /* adjust this value to change the roundness of the corners */
  background-color: whith;
  color: black;
  font-size: 16px;
  border: none;
  cursor: pointer;
  margin: 10px 0px 10px -52px;
  
`;

export const SaveButton = styled.button`
  width: 280px;
  height: 40px;
  border-radius: 20px;
  background-color: #4CAF50;
  color: white;
  font-size: 16px;
  border: none;
  cursor: pointer;
  margin: 10px 20px;
`;

export const ButtonAddFiles = styled.button`
 width: 150px;
  height: 40px;
  border-radius: 0;
  background-color: whith;
  color: black;
  font-size: 16px;
  border: none;
  cursor: pointer;
  margin: 10px;
  margin-right: -30px;
`;

export const NameFile = styled.input`
   width: 150px;
  height: 40px;
  border-radius: 0;
  background-color: white;
  color: black;
  font-size: 16px;
  border: none;
  cursor: pointer;
  margin: 10px;
  margin-right: -30px;
  text-align: right;
  direction: rtl;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

export const FileUp = styled.input`
   width: 250px;
  height: 40px;
  border-radius: 0;
  background-color: white;
  color: black;
  font-size: 16px;
  border: none;
  cursor: pointer;
  margin: 10px;
  margin-right: -30px;
  text-align: right;
  direction: rtl;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;



export const IconRecord = styled(RecordIcon)`
  width: 20px;
  height: 20px;
  margin-right: 50px;
`;

export const Navbar = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

export const divCenter = styled.div`
  width: 100%;
  text-align: center;
  items-align: center;
`;