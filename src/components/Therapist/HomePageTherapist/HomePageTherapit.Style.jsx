import styled from "styled-components";
import { ReactComponent as LeftArrowIcon } from "../Img/left-arrow-svgrepo-com.svg";
import { ReactComponent as xIcon } from "../Img/xIcon.svg";

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  padding-top: 10px;
`;

export const TitleName = styled.h1`
  font-size: 1.2em;
  text-align: center;
  margin-bottom: 10px;
  font-weight: normal;
`;

export const MeetingDate = styled.h1`
  font-size: 1.1em;
  text-align: center;
  margin-top: 10px;
  color: black;
`;

export const MeetingContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  width: 80%;
  margin: 15px auto 0 auto;
  margin-left: auto;
  border: 2px solid #f2f2f2;
  height: 40px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
`;

export const MeetingText = styled.p`
  font-size: 16px;
  text-align: center;
  margin: 0;
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const MeetingRoom = styled.p`
  font-size: 14px;
  text-align: center;
  margin-top: 6px;
  color: gray;
  position: absolute;
  top: 30px;
  right: 10px;
`;

export const GreenStripe = styled.div`
  border-radius: 20px;
  position: absolute;
  top: 5px;
  left: 100px;
  height: 50px;
  width: 9px;
  background-color: rgb(135, 209, 142);
`;

export const MeetingHours = styled.p`
  position: absolute;
  top: 32%;
  left: 5px;
  transform: translateY(-50%);
  font-size: 14px;
  font-weight: bold;
  color: gray;
`;

export const TherapistDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1px;
  margin-top: 10px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f2f2f2;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0;
  left: 0;
  margin: 20px;
`;

export const TherapistName = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: black;
  margin: 0;
  line-height: 50px;
`;

export const RecentMeetingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: right;
  justify-content: center;
  margin-top: 20px;
  margin-right: 30px;
`;

export const RecentMeetingsTitle = styled.h1`
  font-size: 1.1em;
  text-align: right;
  margin-bottom: 10px;
  font-weight: bold;
`;

export const LastMeetingsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 50px;
  overflow: auto;
  flex-direction: row; /* add this line */
`;

export const LastMeetingContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  width: 40%;
  margin: 2px 0 0 auto;
  border: 2px solid #f2f2f2;
  height: 100px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
`;

export const MeetingNum = styled.p`
  font-size: 14px;
  text-align: center;
  margin-top: 6px;
  color: gray;
  position: absolute;
  top: 30px;
  right: 10px;
`;

export const MeetingTime = styled.p`
  font-size: 14px;
  text-align: center;
  margin-top: 6px;
  color: gray;
  position: absolute;
  top: 50px;
  right: 10px;
`;

export const MeetingDate1 = styled.p`
  font-size: 14px;
  text-align: center;
  margin-top: 6px;
  color: gray;
  position: absolute;
  top: 70px;
  right: 10px;
`;

export const SummaryButton = styled.button`
  border-radius: 20px;
  border: none;
  background-color: red;
  color: white;
  font-size: 12px;
  padding: 8px;
  width: 90px;
  height: 30px;
  margin-top: 80px;
  margin-right: 65px;
  position: relative;
`;

export const LeftIcon = styled(LeftArrowIcon)`
  position: absolute;
  left: -16px;
  top: 8px;
  height: 14px;
  width: 50px;
`;

export const Navbar = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

export const FreeTime1 = styled.button`
  margin: 40px;
  width: 150px;
  font-size: 16px;
  border: 2px solid black;
  padding: 15px;
  text-align: center;
  color: #FFFFFF;
  background-image: linear-gradient(45deg, #ff0000, #FFA500);
  border: none;
  border-radius: 15px;
`;

export const XICon = styled(xIcon)`
  position: absolute;
  left: -10px;
  top: 8px;
  height: 14px;
  width: 50px;
`;